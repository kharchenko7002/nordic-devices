# Nordic Devices AS — Webapplikasjon

Presentasjons- og bestillingsside for det fiktive selskapet **Nordic Devices
AS**, laget som del av **ITK2004 prøveeksamen**. Siden viser hvem selskapet
er, hva de leverer, hvilke roller som bruker systemet, og demonstrerer en
profesjonell bestillingsflyt med handlekurv og ordrebekreftelse på e-post.

---

## 1. Kort beskrivelse

Nordic Devices AS er et nytt norsk IT-selskap som leverer IT-utstyr, drift,
sikkerhet, virtualisering og digitale tjenester til små og mellomstore
bedrifter. Webapplikasjonen er en moderne one-page side med disse seksjonene:

- **Hjem / Hero** — kort introduksjon
- **Om oss** — hvem selskapet er
- **Ansatte** — søkbart team med filter på avdeling
- **Tjenester** — filtrerbar tjenestekatalog
- **Produkter** — filtrerbar produktkatalog
- **Bestilling** — ordresflyt og fremtidig betalingsarkitektur
- **Brukere** — brukerhistorier, aktører og dataflyt
- **Sikkerhet** — sikkerhetsvurderinger
- **Teknisk** — testmiljø og IP-plan
- **Kontakt** — kontaktinformasjon og enkelt skjema

---

## 2. Formål

- Vise et komplett, sammenhengende eksempel på en profesjonell
  bedriftsnettside bygget med React, Vite og TypeScript.
- Demonstrere en bestillings- og betalingsflyt **uten** å samle inn
  kortdata, slik at prototypen ikke bryter PCI-DSS eller GDPR.
- Vise hvordan løsningen kan kjøres lokalt, i Docker og over HTTPS.
- Dokumentere sikkerhetsprinsipper (SSH med nøkler, brannmur, samtykke,
  HTTPS) som selskapet selv bruker.

---

## 3. Teknologier

| Teknologi          | Bruk                                                     |
|--------------------|----------------------------------------------------------|
| **React 18**       | Komponentbasert UI                                       |
| **Vite 5**         | Rask utviklingsserver og build                           |
| **TypeScript**     | Typesikkerhet og bedre vedlikehold                       |
| **Vanlig CSS**     | Egen designprofil, modulært organisert                   |
| **Docker + Nginx** | Container med statisk webserver                          |

Bevisste valg: enkle og veldokumenterte verktøy uten store avhengigheter,
slik at løsningen er lett å videreutvikle og forklare.

---

## 4. Prosjektstruktur

```
nordic-devices/
├── Dockerfile                # frontend (Vite build → Nginx)
├── docker-compose.yml        # nordic-web + nordic-api
├── docker-compose.https.yml  # HTTPS-overlay (self-signed)
├── nginx.conf                # SPA + /api/ → backend
├── nginx.https.conf          # samme, men over TLS 443
├── .env.example              # SMTP for docker compose (Gmail osv.)
├── backend/                  # Express + Nodemailer API
│   ├── Dockerfile
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── server.js
│       ├── config.js
│       ├── routes/orders.js
│       ├── middleware/{rateLimit,validateOrder}.js
│       └── services/{mailer,orderTemplate}.js
├── README.md
└── src/
    ├── App.tsx                # kort layout-komposisjon
    ├── main.tsx
    ├── types.ts
    ├── components/
    │   ├── layout/            # Header, Footer, MobileMenu, SkipLink, Logo
    │   ├── sections/          # Hero, About, Employees, Services, Products,
    │   │                      # Order, Users, Security, Technical, Contact
    │   ├── cart/              # CartButton, CartDrawer, CartItem,
    │   │                      # CartSummary, CheckoutForm, PaymentPanel,
    │   │                      # OrderConfirmation
    │   ├── cookie/            # CookieBanner, CookieSettings
    │   └── ui/                # Button, Badge, SectionHeader, EmptyState,
    │                          # FilterChips, Card
    ├── data/                  # employees, products, services,
    │                          # userStories, technicalInfo, navigation
    ├── hooks/                 # useCart, useCookieConsent,
    │                          # useOrderForm, useActiveSection
    ├── utils/                 # formatCurrency, validation,
    │                          # generateOrderNumber, emailReceipt
    └── styles/                # global, accessibility, layout,
                               # sections, forms, cart, cookie
```

Ingen komponent er over ~250 linjer, og `App.tsx` er kort og kun ansvarlig
for layout og state-glue.

---

## 5. Nettverksoppsett (testmiljø)

| Rolle             | Adresse / verdi              |
|-------------------|------------------------------|
| Windows Server    | `10.10.10.10`                |
| Ubuntu Server     | `10.10.10.20`                |
| Nettverk          | `10.10.10.0/26`              |
| Subnettmaske      | `255.255.255.192`            |
| Gateway           | `10.10.10.1`                 |
| DHCP-område       | `10.10.10.30 – 10.10.10.60`  |
| Lease time        | `6 timer`                    |

DHCP deler ut adresser i området **10.10.10.30 – 10.10.10.60** til klienter,
mens serverne har **faste adresser** utenfor scopet.

---

## 6. Lokal utvikling

Krav: [Node.js 18+](https://nodejs.org/) og npm.

### Frontend

```bash
git clone <repo-url>
cd nordic-devices/nordic
npm install
npm run dev -- --host 0.0.0.0
```

Standard adresse:

```
http://localhost:5173
```

Vite proxyer `/api/*` til `http://localhost:4000` (kan overstyres med
`VITE_API_PROXY` i en lokal `.env`-fil), slik at bestillinger fra
dev-serveren havner hos backend uten CORS-oppsett.

### Backend (Express + Nodemailer)

I et eget terminalvindu:

```bash
cd nordic-devices/nordic/backend
npm install
cp .env.example .env        # fyll inn SMTP-verdier (eller la stå tomt for Ethereal)
npm run dev                 # node --watch src/server.js
```

Lytter på `http://localhost:4000`. Endepunkter:

| Metode | Sti              | Beskrivelse                              |
|--------|------------------|------------------------------------------|
| GET    | `/api/health`    | Status + om mailer er konfigurert        |
| POST   | `/api/orders`    | Tar imot ordre og sender bekreftelse     |

For produksjonsbygg av frontend:

```bash
npm run build
npm run preview
```

---

## 7. Kjøre med Docker

Multi-stage Dockerfile bygger React-appen med Node og serverer den med
Nginx.

```bash
# Bygg image
docker build -t nordic-devices-web .

# Start container
docker run -d --name nordic-web -p 80:80 --restart unless-stopped nordic-devices-web
```

Eller med Docker Compose (anbefalt):

```bash
docker compose up -d --build
docker compose down
```

Etter deployment på Ubuntu Server er siden tilgjengelig fra Windows Server
på:

```
http://10.10.10.20
```

---

## 8. HTTPS med self-signed sertifikat

`docker-compose.https.yml` legger til 443:443 og mounter `./certs` og
`nginx.https.conf` i containeren.

```bash
# 1. Generer self-signed sertifikat (én gang)
mkdir -p certs

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout certs/nordic-devices.key \
  -out certs/nordic-devices.crt \
  -subj "/C=NO/ST=Innlandet/L=Hamar/O=Nordic Devices AS/CN=10.10.10.20"

# 2. Start container med HTTPS-overlay
docker compose -f docker-compose.yml -f docker-compose.https.yml up -d --build
```

Hva dette betyr:

- **Kryptering**: Self-signed sertifikat gir TLS-kryptering mellom
  klient og server (HTTPS).
- **Browser-warning**: Nettleseren vil advare fordi sertifikatet ikke er
  signert av en betrodd CA. Dette er **forventet** i et testmiljø.
- **Produksjon**: Bruk Let’s Encrypt eller annen betrodd CA, slik at
  varselet forsvinner og kunden får full tillit.
- **HTTP → HTTPS**: `nginx.https.conf` redirecter port 80 til 443, slik
  at all trafikk krypteres.

---

## 9. Bestilling og betaling

Bestillingsflyten i denne prototypen samler **ikke** inn kortdata. Den
demonstrerer en realistisk arkitektur som senere kan kobles til en ekte
betalingsleverandør.

### Slik fungerer det i prototypen

1. Brukeren legger produkter eller tjenester i handlekurven.
2. Handlekurven er alltid tilgjengelig fra header og lagres i
   `localStorage`, slik at den ikke forsvinner ved reload.
3. Brukeren går til bestilling og fyller ut bedrifts- og kontaktinfo.
4. Skjemaet valideres med tydelige feilmeldinger på norsk (med
   `aria-live` for skjermlesere).
5. Etter «Send bestilling» genereres et ordrenummer (`ND-2026-XXXX`) og
   en ordrebekreftelse vises i grensesnittet.
6. Brukeren kan deretter sende ordrebekreftelsen på e-post.

### Hva produksjon vil se ut som

- Frontend sender ordren til et backend-API over HTTPS.
- Backend validerer ordren og beregner totalsummen på nytt (aldri stol
  på frontend-priser).
- Backend oppretter en sikker betalingssesjon hos en godkjent
  betalingsleverandør (Stripe, Vipps, Nets, Adyen, BankAxept).
- Brukeren betaler hos den eksterne leverandøren — ingen kortdata
  berører Nordic Devices, slik at PCI-DSS-omfanget holdes minimalt.
- En webhook fra leverandøren bekrefter at betaling er gjennomført.
- Backend lagrer ordren i database og sender kvittering via en
  godkjent e-postjeneste.

---

## 10. E-postbekreftelse (backend + Gmail SMTP)

Backend i `backend/` er en liten Express-tjeneste som mottar bestillingen
og sender en HTML- + tekst-bekreftelse via [Nodemailer](https://nodemailer.com/).
Frontend kaller `POST /api/orders` automatisk så snart bestillingen er
registrert, og viser status i ordrebekreftelses-panelet.

### Steg-for-steg: Gmail som SMTP

1. **Slå på 2FA** på Google-kontoen din:
   <https://myaccount.google.com/security>
2. **Generer et App Password** (ikke ditt vanlige passord):
   <https://myaccount.google.com/apppasswords>. Velg «Mail» som app,
   navngi det fritt. Du får et 16-tegns passord — kopier det.
3. Lag `.env`-fil for compose i prosjektroten (`nordic/.env`):

   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=din.adresse@gmail.com
   SMTP_PASS=app-passordet-uten-mellomrom
   SMTP_FROM="Nordic Devices AS <din.adresse@gmail.com>"
   # Valgfritt: BCC til en intern adresse for kvitteringer:
   CONFIRMATION_BCC=
   ```

   Compose leser denne `.env`-filen automatisk og fyller verdiene inn i
   `nordic-api`-containeren. **Filen er gitignorert** — den committes ikke.

4. Bygg på nytt: `docker compose up -d --build`.
5. Legg en vare i kurven, send en bestilling, og sjekk e-posten din —
   både innboks og «søppelpost» første gang (Gmail kan markere meldinger
   fra ny avsender).

### Hva skjer hvis du ikke konfigurerer SMTP?

Backend faller automatisk tilbake til **Ethereal** — en gratis test-inbox
som ikke leverer til ekte adresser. Etter «Send bestilling» får du en
preview-URL i ordrebekreftelses-panelet og i container-loggen, slik at du
kan se hvordan e-posten faktisk ser ut uten å sende noe ekte.

### Hvis backend ikke svarer

Frontend viser feilstatus og tilbyr to knapper:

- **Prøv igjen** — sender bestillingen til backend på nytt.
- **Send via e-postprogram** — åpner en `mailto:`-lenke med ferdig
  formatert kvittering som brukeren selv kan sende.

### Sikkerhet på backend-veien

- Nodemailer snakker med SMTP over TLS (`SMTP_SECURE=true`).
- Backend kjører i sin egen Docker-container under non-root `node`-bruker.
- Innebygd validering avviser ugyldige skjemafelt med 400.
- Enkel rate-limit (`RATE_LIMIT_MAX` per IP per minutt) hindrer flom.
- `nordic-api` eksponeres **ikke** direkte — kun Nginx på `nordic-web`
  ser den, via Compose-nettverket. Klienten ser bare `/api/...`.

### Hvorfor backend er riktig vei i produksjon

E-postnøkler hører ikke hjemme i frontend-bundle. Med backend er det:

- Mulig å validere ordren på nytt og beregne summer
  (aldri stol på frontend-priser).
- Logging av hva som er sendt, til hvem og når.
- Kontroll på rate-limit og misbruk uten å eksponere SMTP-creds.
- Plass for senere integrasjon mot ekte betalingsleverandør, database og
  separat e-postjeneste (Postmark / SES / Mailgun) når trafikken vokser.

---

## 11. Cookies, samtykke og GDPR

Cookie-banneret vises ved første besøk og har tre valg:

| Knapp              | Effekt                                                      |
|--------------------|-------------------------------------------------------------|
| **Godta alle**     | Tillater statistikk og markedsføring i tillegg til nødvendige |
| **Kun nødvendige** | Lagrer bare det som trengs for at siden skal fungere        |
| **Innstillinger**  | Åpner et panel med to brytere (statistikk + markedsføring)  |

Brukerens valg lagres i `localStorage` og kan endres når som helst via
**«Endre cookievalg»** i footeren.

Prinsipper løsningen følger:

- **Samtykke (samtykke):** Ingen valgfrie cookies eller tredjepartsporing
  før brukeren aktivt har godkjent.
- **Dataminimering:** Vi spør kun om bedriftsinfo som er strengt
  nødvendig for kontakt og oppfølging.
- **Transparens:** Tydelig informasjon om hva som lagres, og hvorfor.
- **Retten til å trekke samtykke tilbake:** Banneret kan kalles tilbake
  fra footeren når som helst.
- **Sikkerhet i transport:** Kombinert med HTTPS (se kapittel 8).

---

## 12. Universell utforming og WCAG-vurderinger

Konkrete tiltak i koden:

- **Skip link** øverst — gir tastaturbrukere rask vei til hovedinnhold.
- **Én `<h1>`** i hero, deretter strukturert `<h2>` / `<h3>` per seksjon.
- **`focus-visible`-stiler** på alle interaktive elementer.
- **`aria-label`** på cart-knapp, lukkeknapp og burger-meny.
- **`aria-live`** på toasts, ordre-bekreftelse og skjema-feilmeldinger
  slik at skjermlesere får oppdateringer.
- **`aria-current`** på aktiv lenke i navigasjon.
- **`aria-invalid` + `aria-describedby`** på alle felt med valideringsfeil.
- **Tilgangsstyring med tastatur** — drawer kan lukkes med `Esc`.
- **Kontrast** — Navy + cyan + hvit med ratio over 4.5:1 for tekst.
- **Status uten farge** — produktstatus vises som tekst, ikke kun ved farge.
- **`prefers-reduced-motion`** respekteres for animasjoner.
- **Mobile-first responsive layout** — header, cart og innhold tilpasses
  uten å miste funksjonalitet.

---

## 13. SSH med nøkler

På Ubuntu Server (10.10.10.20) bruker vi SSH-nøkler i stedet for passord:

```bash
# På klienten
ssh-keygen -t ed25519 -C "student@nordic-devices"
ssh-copy-id kostiantyn@10.10.10.20
ssh kostiantyn@10.10.10.20
```

Hvorfor:

- Nøkler er praktisk umulige å brute-force, i motsetning til passord.
- Privat nøkkel forlater aldri klienten, mens passord kan logges eller
  avlyttes.
- Når nøkkelinnlogging er testet, kan passordinnlogging deaktiveres for
  enda strammere sikkerhet.

> ⚠️ **Viktig:** Ikke deaktiver passordinnlogging (`PasswordAuthentication
> no`) før du har bekreftet at nøkkelinnlogging fungerer fra en ny session
> — ellers kan du låse deg selv ute av serveren.

---

## 14. Testing

| Test                       | Hvordan                                                            |
|----------------------------|--------------------------------------------------------------------|
| Bygg                       | `npm run build`                                                    |
| Docker-bygg                | `docker build -t nordic-devices-web .`                             |
| Docker-kjøring             | `docker run -d -p 80:80 --name nordic-web nordic-devices-web`      |
| Status                     | `docker ps`                                                        |
| Åpne fra Windows Server    | `http://10.10.10.20`                                               |
| Cookie-banner              | Sjekk at de tre knappene fungerer og at valget huskes etter reload |
| Innstillinger-modal        | Endre statistikk/markedsføring, lagre og verifiser i localStorage  |
| Handlekurv                 | Legg til, øk/reduser antall, fjern, reload — kurven skal bestå     |
| Bestillingsskjema          | La felt være tomme — sjekk feilmeldinger og `aria-live`            |
| Ordrebekreftelse           | Send bestilling, sjekk ordrenummer-format og oppsummering          |
| E-post-bekreftelse (auto)  | Send bestilling — frontend kaller `/api/orders`, e-post leveres    |
| E-post-bekreftelse (manuelt) | Slå av backend (`docker compose stop nordic-api`) — frontend må falle tilbake til «Send via e-postprogram» |
| Backend health             | `curl http://10.10.10.20/api/health` skal returnere `{"ok":true,...}` |
| Tastaturnavigasjon         | Tab gjennom hele siden, `Esc` lukker drawer og modal               |
| Responsive                 | Smal til mobil (~360 px) og bredde over 1280 px                    |

---

## 15. Sikkerhetsvurderinger (oppsummering)

| Område            | Tiltak                                                          |
|-------------------|-----------------------------------------------------------------|
| SSH               | Nøkkelpålogging (ed25519); deaktiver passord når testet         |
| Nettverk          | Brannmur, kun port 22/80/443 åpne                               |
| HTTPS             | Self-signed i test; Let’s Encrypt i produksjon                  |
| Cookies           | Eksplisitt samtykke før valgfrie cookies                        |
| Form-data         | Ingen kortdata samles inn; minste sett av felt                  |
| Containere        | Docker isolerer applikasjonen fra verten                        |
| Server-headers    | `X-Content-Type-Options`, `X-Frame-Options`, HSTS i HTTPS-mode  |
| Logging           | Nginx access/error log; oppdater og roter                       |

---

## 16. Videre arbeid

- Bygge backend API for ordrevalidering og lagring.
- Integrere ekte betalingsleverandør (Stripe / Vipps / Nets).
- Erstatte `mailto:`-fallback med backend-basert e-post (Postmark, SES).
- Sette opp CI/CD med GitHub Actions for automatisert build og deploy.
- Skrive end-to-end-tester med Playwright eller Cypress.
- Bytte til Let’s Encrypt-sertifikat og automatisk fornyelse via
  `certbot` eller `acme.sh`.

---

## Lisens / bruk

Prosjektet er laget som skoleoppgave og er ikke ment for kommersiell bruk.

© 2026 Nordic Devices AS · ITK2004 prøveeksamen
