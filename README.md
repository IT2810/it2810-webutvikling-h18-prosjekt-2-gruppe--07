# IT2810 Prosjekt 2 - Gruppe 7 :sparkles: :sparkles: :sparkles:

## Innhold og funksjonalitet
Siden vår er en kunstutstilling der hver visning består av et bilde, et dikt og en melodi. Til høyre på siden (i fullscreen) kan bruker endre bildene, diktene og melodiene basert på tre kategorier: sommer, høst og vinter. Hvis f.eks. bruker velger Winter under Image, vil bildet byttes ut med et vinterbilde. For hver endring som gjøres i kategoriene vil det finnes 4 forskjellige visninger. Disse vil man kunne navigere mellom i toppmenyen.

Bildene er svg-filer, lydfilene er relativt korte mp3-filer, og diktene er json-filer. Alle filene ligger lokalt (i prosjektet) i egne mapper.

Design/layout er inspirert av layouten vi fikk tildelt, med noen endringer. Siden er laget med fokus på brukervennlighet, og valg av farger og font-type er ment til å gi en god brukeropplevelse. 

## Teknologi

### React
Løsningen er en React Single Page Application (SPA) som bruker ES6. Vi har valgt å bruke den følgende komponentstrukturen:

![screen shot 2018-09-21 at 18 49 32](https://user-images.githubusercontent.com/22095754/45894595-1dc30480-bdcf-11e8-9934-e950905c0e2f.png)

Vi har delt nettsiden inn i fire komponenter. App (rosa) er hovedkomponenten (parent), og Navbar, Category og Content er barnekomponenter (blå).

De hele pilene illustrerer at barnekomponentene sender informasjon til App (hvilke tabs og radiobuttons som er valgt), og de stiplede pilene er representerer hvordan props (funksjoner og states) sendes ned fra App til barnekomponentene. 
Liten oversikt over hva de forskjellige komponentene inneholder:

**1. App.js:** Håndterer all kommunikasjon mellom barnekomponentene. Sender props ned til barna, som bruker disse til å utføre endringer state i App.js. Alle Ajax-kall skjer i App.js. De hentede filene sendes så ned til Content.  

**2. Navbar:** Gjør at brukeren kan navigere mellom forskjellige kombinasjoner av bilde, lyd og tekst. Består av fire knapper. Knappetrykk kaller setTab() i App.js, som endrer state til selectedTab, og henter inn riktig tekst, lyd og bilde fra minne.

**3. Category:** Gjør at bruker kan velge mellom de tre kategoriene sommer, vinter og høst. Består hovedsakelig av tre radioknapper. Registrerer knappeendring og lagrer verdien til det nye valget i en egen state. Bruker så props fra App.js til å endre state i App.js, og å kjøre et nytt Ajax-kall for å hente inn fil fra riktig sesong-mappe. Denne komponenten brukes tre ganger, hvor hver instans kaller forskjellige funksjoner basert på om de representerer tekst, lyd eller bilde.

**4. Content:** Content får filer (tekst og bilde) som props fra App.js og setter dem inn i en html-struktur. Inneholder også logikken for endring av lydfiler. Lydfiler hentes ikke ut fra minne ved hjelp av ajax-kall.

### AJAX
Bildene (i SVG) og tekst-filene (i JSON) lastes dynamisk med AJAX. Vi har valgt å bruke axios som er en promise-basert HTTP klient for nettleseren og node.js. Vi har en fetch metode for tekst og en for bilde hvor vi bruker axios.get(url) for å hente ut filene.  Grunnen til at vi valgte å ha to separate metoder var for å unngå altfor mange parametre og fordi vi syntes det var greit å separere de ut ettersom de henter to forskjellige filtyper. 

De to fetch-metodene kalles først i ComponentDidMount() ettersom dette er den anbefalte plassen å gjøre første ajax kall i. Grunnen til det er fordi er at man er garantert at det finnes et komponent som kan oppdateres. Videre kalles de respektive fetchMethodene hver gang en av kategoriene eller tab nummeret endrer state. 

En fil vil altså først hentes når dens kategori (season i vårt tilfelle) og nummer (selectedTab) blir valgt av brukeren. Når filen først er lest, blir innholdet lagret i klientens SessionStorage. Dette gjøres ved å kalle sessionStorage.setItem(key, data) hvor url til filen brukes som nøkkel og data er innholdet i filen. Før en get request blir gjennomført sjekkes det om filen allerede er lagret hos klienten ved å kalle sessionStorage.getItem(key). Hvis denne returner null vet vi at filen ikke finnes og vi må hente den inn ved et get request. Hvis den derimot finnes kan vi hente ut filen direkte fra klienten. Dette gjør at filene ikke, etter den første gangen, må hentes inn på nytt om brukeren blar frem og tilbake i utstillingen.

SessionStorage lagrer data kun så lenge vinduet, eller tab i noen nettlesere, er åpent. I LocalStorage derimot lagres data lagres helt til man går inn å sletter den. Vi valgte å bruke sessionStorage da vi ikke så behovet for å lagre dataen permanent. 

#### Lyd
For å håndtere lyd bruker vi HTML5 audio-tag og source-tag. Vi bruker refs for å endre barnekomponentene (Content) uten å måtte re-generere hele komponenten (App). Audiofilene refereres til på samme måte som SVG- og json-filene, ved at tilstand (valgt radio-button) og indeks (valgt tab) bestemmer hvilken fil som hentes ut. 

### Responsive web design
Nettsiden er flytende, og elementstrukturen vil tilpasse seg forskjellige skjermstørrelser. Når størrelsen på vinduet endres vil elementene på siden flytte på seg for at siden skal beholde et godt design og fortsette å være oversiktlig. For å få til dette har vi brukt Viewport og CSS Media-queries, og vi har valgt å benytte oss av CSS Grid, som forenkler prosessen med å plassere elementer når skjermstørrelsen endrer seg. Bildene (SVG) er også skalerbare, og blir større eller mindre ut i fra skjermstørrelse. Det er ikke brukt noen eksterne bibliotek for å gjøre siden fleksibel.

For stor PC-skjerm har vi tenkt at navigasjon skal skje ved hjelp av en toppmeny (for å bla gjennom utstillingskombinasjoner), og ved hjelp av en kategorimeny på høyre side (som endrer individuelle elementer (tekst, bilde, lyd) basert på valg. Selve utstillingsvindu skal ta resten av plassen. Når nettsiden skaleres vil vi ha all navigering øverst på siden, og utstillingen under. Vi vil derfor at toppmenyen fortsatt ligger øverst, og at kategorimenyen da legger seg rett under. På denne måten får man en grei fordeling av navigering av innhold. 

Struktureringen av bildet, teksten og lyden vil vi også at skal endre seg for små skjermer. Vi ønsker at bildet skal ligge øverst, deretter tekst, og lyden ligger nederst (ettersom lyden ikke først og fremst er et visuelt element).

## Testing
For å sjekke at nettsiden oppførte seg slik vi ønsket (slik som beskrevet over), har vi for det meste testet ved å endre skjermstørrelsen på nettleseren for å se hvordan elementene oppførte seg. Ofte brukte vi Chromes innebygde development tool (Inspector), for f.eks. å sjekke hvorfor CSSen ikke gjorde som vi ønsket. Under utviklingen er det alltid Chrome vi først har brukt til å sjekke layout. Når vi var fornøyde med hvordan det så ut, og fungerte i Chrome, sjekket vi så om oppførselen var lik i Firefox og i Safari. 

Vi testet også nettsiden med tre forskjellige enheter: mobil, nettbrett og pc. Her testet vi hvordan grid-elementene oppførte seg på ulike skjermstørrelser, og om nettsiden var responsiv. Vi testet også funksjonaliteten ved å endre kategorier ved radio-buttons og endre utstillinger ved å klikke på navigasjonsbaren. Da skulle vi få opp valgt utstilling med tilhørende lyd, tekst og bilde. Nettsiden oppførte seg som forventet ved bruk av de forskjellige enhetene. Ved mobil er man nødt til å scrolle litt ned for å se hele innholdet. En annen løsning kan være å gjøre bildene og teksten mindre slik at alt fikk plass på en side. Da ville også innholdet blitt mindre synlig, som hadde påvirket brukervennligheten på nettsiden. 

### Test kriterier 
For å teste funksjonalitet sjekket vi at de følgende kriteriene ble oppfylt på i de tre ulike nettleserne (Google Chrome, Safari og Firefox) og på ulike enheter:

1. Når brukeren endrer bildekategori skal det korrekte bildet vises (riktig kategori og tab nummer). 
2. Når brukeren endrer tekstkategori skal den korrekte teksten vises (riktig kategori og tab nummer). 
3. Når brukeren endrer lydkategori skal den korrekte lyden kunne spilles av (riktig kategori og tab nummer). 
4. Når brukeren endrer tab (display) skal de korrekte mediaelementene hentes inn. 
5. Bilde og tekst filer skal lagres hos klienten etter de har blitt hentet inn første gang

## Versjonskontroll
Vi har brukt Git til versjonskontroll og utviklingsoppgavene er dokumentert i issues. Hver issue ble tildelt en person som hadde ansvar for å gjennomføre denne oppgaven. Vi prøvde til så stor grad som mulig å refere issue nummeret i commits som var knyttet til issuet. Vi benyttet oss av Github sin Project board som vi delte inn i kolonnene To do, In progress og Done. 

## Nyttige ressurser

### React
* https://codewithmosh.com/p/mastering-react
* https://reactjs.org/docs/getting-started.html

### Ajax
* https://github.com/axios/axios
* https://www.youtube.com/watch?v=ZZS1irWSfxc

### Responsive web design
* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
* https://css-tricks.com/snippets/css/complete-guide-grid/

## Kilder

* SVG: https://lovesvg.com/
* Dikt: https://www.poetryfoundation.org
* Lyd: https://www.zapsplat.com
