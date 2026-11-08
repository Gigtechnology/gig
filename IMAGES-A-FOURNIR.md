# Images — GIG Technology

Les 11 emplacements utilisent pour l'instant des **photos libres de droits Unsplash** (licence Unsplash : usage commercial autorisé, sans attribution obligatoire). Remplacez-les dès que possible par de **vraies photos de chantiers et de l'équipe GIG Technology**, en commençant par les cartes de services.

**Pour remplacer une photo :**
1. Remplacez le fichier dans `public/images/` en gardant **exactement le même nom**.
2. Lancez `npm run images` pour régénérer la version légère `-800.jpg`, utilisée sur mobile et dans les cartes.
3. Faites un commit et un push : Vercel met le site à jour.

Formats conseillés : JPG, qualité 75-80 %, moins de 450 Ko.

| # | Fichier | Dimensions | Section / page | Photo actuelle (Unsplash) |
|---|---|---|---|---|
| 1 | `hero-home.jpg` | 1920 × 1080 | Accueil, Hero | ✅ Photo fournie par le client (technicien GIG devant le camion) |
| 2 | `about-team.jpg` | 900 × 1100 (portrait) | Accueil, About | ✅ Photo fournie par le client (technicien GIG devant la camionnette) |
| 3 | `service-plumbing.jpg` | 1920 × 1200 | Carte Plumbing + Hero de la page Plumbing | Plombier sous un évier — unsplash.com/photos/c314Gh8dXAo |
| 4 | `service-heating.jpg` | 1920 × 1200 | Carte Heating + Hero de la page Heating | Chaufferie — unsplash.com/photos/xYeGSXRhV80 |
| 5 | `service-hvac.jpg` | 1920 × 1200 | Carte HVAC + Hero de la page HVAC | Unités de climatisation — unsplash.com/photos/Rr4rmrcqRYE |
| 6 | `service-fire-protection.jpg` | 1920 × 1200 | Carte Fire Protection + Hero de la page | Réseau de sprinklers — unsplash.com/photos/YkPY2Awkra8 |
| 7 | `plumbing-intro.jpg` | 1000 × 800 | Page Plumbing, intro | Plombier dans une salle de bain — unsplash.com/photos/jaP5ClBdIyU |
| 8 | `heating-intro.jpg` | 1000 × 800 | Page Heating, intro | Radiateur — unsplash.com/photos/l4MSGX319CE |
| 9 | `hvac-intro.jpg` | 1000 × 800 | Page HVAC, intro | Technicien climatisation — unsplash.com/photos/8RbiLgfqoqQ |
| 10 | `fire-protection-intro.jpg` | 1000 × 800 | Page Fire Protection, intro | Installation de sprinklers — unsplash.com/photos/5l991aLrCJ8 |
| 11 | `hero-contact.jpg` | 1920 × 1080 | Page Contact, Hero | Terminal du ferry de Staten Island — unsplash.com/photos/V4_lnyk7Hyg |
| 12 | `og-default.jpg` *(optionnel)* | 1200 × 630 | Image de partage sur les réseaux sociaux (générée à partir du logo) | — |
| 13 | Logo PNG transparent ou SVG *(optionnel)* | ≥ 1000 px | Header / footer / favicon | remplacer `public/logo.jpg`, puis `npm run icons` |
