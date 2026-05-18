# Nordic Devices AS — Webapplikasjon

Presentasjonsside (landing page) for det fiktive selskapet **Nordic Devices AS**,
laget som del av **ITK2004 prøveeksamen**. Siden viser hvem selskapet er, hva de
leverer, hvilke roller som bruker systemet, hvordan sikkerheten er tenkt og
hvilken teknisk infrastruktur løsningen er testet i.

---

## 1. Kort beskrivelse av prosjektet

Nordic Devices AS er et nytt norsk IT-selskap som leverer IT-utstyr, drift,
sikkerhet, virtualisering og digitale tjenester til små og mellomstore bedrifter.

Webapplikasjonen er en moderne one-page side med følgende seksjoner:

- **Hjem / Hero** — kort introduksjon
- **Om oss** — hvem selskapet er
- **Ansatte** — kort presentasjon av teamet
- **Tjenester** — hva selskapet leverer
- **Produkter** — utstyr og ressurser
- **Brukere av systemet** — fire user personas (administrator, utvikler, ansatt, kunde)
- **Sikkerhet** — sikkerhetsvurderinger
- **Teknisk oversikt** — testmiljø og IP-plan
- **Kontakt** — kontaktinformasjon og enkelt skjema

Siden er bygd som en enkel React-applikasjon uten backend, og den er
forberedt for å kjøres lokalt i utvikling og senere i en Docker-container.

---

## 2. Teknologier brukt

| Teknologi      | Bruk                                               |
|----------------|----------------------------------------------------|
| **React 18**   | Komponentbasert UI                                 |
| **Vite 5**     | Rask utviklingsserver og build                     |
| **TypeScript** | Typesikkerhet og bedre vedlikehold                 |
| **Vanlig CSS** | Egen designprofil uten eksterne bibliotek          |
| **Docker**     | Forberedt for kjøring i container (steg 5)         |

Det er bevisst valgt **enkle og veldokumenterte verktøy** uten store
avhengigheter, slik at løsningen er lett å videreutvikle og forklare.

---

## 3. Installere dependencies

Krav:

- [Node.js 18 eller nyere](https://nodejs.org/)
- npm (følger med Node.js)

```bash
git clone <repo-url>
cd nordic-devices
npm install
```

---

## 4. Starte lokalt

For lokal utvikling:

```bash
npm run dev
```

For å eksponere serveren slik at den er tilgjengelig på nettverket
(for eksempel fra en annen maskin eller fra Ubuntu Server):

```bash
npm run dev -- --host 0.0.0.0
```

Standard adresse:

```
http://localhost:5173
```

For produksjonsbygg:

```bash
npm run build
npm run preview
```

---

## 5. Kjøre med Docker (senere)

Et eksempel på en enkel `Dockerfile` som kan legges i prosjektroten:

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Bygge og kjøre containeren:

```bash
docker build -t nordic-devices .
docker run -d -p 8080:80 --name nordic-devices nordic-devices
```

Siden vil da være tilgjengelig på:

```
http://<server-ip>:8080
```

Docker er valgt fordi det gjør løsningen lett å flytte mellom maskiner,
og fordi den startes likt i utvikling, test og produksjon.

---

## 6. Sikkerhetsvurderinger

Følgende prinsipper ligger til grunn for løsningen og driftsmiljøet:

- **SSH med nøkkelpålogging** brukes for sikker administrasjon av serverne.
  Passordpålogging bør deaktiveres i produksjon.
- **Brannmur** er aktivert og kun nødvendige porter (f.eks. 22, 80, 443)
  er åpne ut mot nettet.
- **Sterke passord og MFA** anbefales for alle brukerkontoer som har
  administratorrettigheter.
- **Tilgangsstyring** følger prinsippet om minste privilegium: brukerne
  får kun de rettighetene de trenger for sin rolle.
- **HTTPS/TLS** anbefales i produksjon, slik at trafikken mellom klient
  og server er kryptert.
- **Docker** brukes for å pakke applikasjonen i en kontrollert container,
  som gjør det enkelt å flytte løsningen og starte den likt hver gang.
- **DHCP-scope** skiller klientadresser fra serveradresser, slik at
  faste tjenester ikke kolliderer med dynamisk tildelte IP-er.
- **Backup og dokumentasjon** er en del av leveransen, slik at systemet
  kan gjenopprettes hvis noe går galt.

Webapplikasjonen selv har ingen backend og lagrer ingen brukerdata.
Kontaktskjemaet er kun en visuell demonstrasjon og sender ingen reell
forespørsel.

---

## 7. IP-plan (testmiljø)

| Rolle             | Adresse / verdi              |
|-------------------|------------------------------|
| Windows Server    | `10.10.10.10`                |
| Ubuntu Server     | `10.10.10.20`                |
| Nettverk          | `10.10.10.0/26`              |
| DHCP-område       | `10.10.10.30 – 10.10.10.60`  |
| Lease time        | `6 timer`                    |
| Webapplikasjon    | React + Vite                 |
| Container         | Docker                       |

DHCP deler ut adresser i området **10.10.10.30 – 10.10.10.60** til klienter,
mens serverne har **faste adresser** utenfor scopet. Dette gjør det enkelt
å skille mellom utstyr som skal være stabilt, og enheter som kobler seg på
midlertidig.

---

## Prosjektstruktur

```
nordic-devices/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── README.md
└── src/
    ├── App.css
    ├── App.tsx
    ├── main.tsx
    └── vite-env.d.ts
```

---

## Lisens / bruk

Prosjektet er laget som skoleoppgave og er ikke ment for kommersiell bruk.

© 2026 Nordic Devices AS · ITK2004 prøveeksamen
