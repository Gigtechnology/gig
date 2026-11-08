# Images — GIG Technology

Les photos sont celles fournies par le client, sauf **Fire Protection** (carte et intro), qui viennent encore d'Unsplash (licence gratuite, usage commercial autorisé). Sur certaines photos client, le logo d'une autre entreprise (« METRO ») a été flouté : une version sans ce logo serait préférable.

**Pour remplacer une photo :**
1. Remplacez le fichier dans `public/images/` en gardant **exactement le même nom**.
2. Lancez `npm run images` pour régénérer la version légère `-800.jpg`, utilisée sur mobile et dans les cartes.
3. Faites un commit et un push : Vercel met le site à jour.

Formats conseillés : JPG, qualité 75-80 %, moins de 450 Ko.

| # | Fichier | Dimensions | Section / page | Photo actuelle |
|---|---|---|---|---|
| 1 | `hero-home.jpg` | 1920 × 1080 | Accueil, Hero | ✅ Photo fournie par le client (technicien GIG devant le camion) |
| 2 | `about-team.jpg` | 900 × 1100 (portrait) | Accueil, About | ✅ Photo client (technicien GIG bras croisés, logo GIG) |
| 3 | `service-plumbing.jpg` | 1920 × 1200 | Carte Plumbing + Hero de la page Plumbing | ✅ Photo client (plombier sous évier, logo tiers flouté) |
| 4 | `service-heating.jpg` | 1920 × 1200 | Carte Heating + Hero de la page Heating | ✅ Photo client (technicien GIG devant la chaudière) |
| 5 | `service-hvac.jpg` | 1920 × 1200 | Carte HVAC + Hero de la page HVAC | ✅ Photo client (technicien sur escabeau, logos tiers floutés) |
| 6 | `service-fire-protection.jpg` | 1920 × 1200 | Carte Fire Protection + Hero de la page | Réseau de sprinklers — unsplash.com/photos/YkPY2Awkra8 |
| 7 | `plumbing-intro.jpg` | 1000 × 800 | Page Plumbing, intro | ✅ Photo client (atelier plomberie, logo tiers flouté) |
| 8 | `heating-intro.jpg` | 1000 × 800 | Page Heating, intro | ✅ Photo client (chaufferie) |
| 9 | `hvac-intro.jpg` | 1000 × 800 | Page HVAC, intro | ✅ Photo client (atelier HVAC, logo tiers flouté) |
| 10 | `fire-protection-intro.jpg` | 1000 × 800 | Page Fire Protection, intro | Installation de sprinklers — unsplash.com/photos/5l991aLrCJ8 |
| 11 | `hero-contact.jpg` | 1920 × 1080 | Page Contact, Hero | ✅ Photo client (technicien GIG devant le camion) |
| 12 | `og-default.jpg` *(optionnel)* | 1200 × 630 | Image de partage sur les réseaux sociaux (générée à partir du logo) | — |
| 13 | Logo PNG transparent ou SVG *(optionnel)* | ≥ 1000 px | Header / footer / favicon | remplacer `public/logo.jpg`, puis `npm run icons` |
