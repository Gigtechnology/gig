# Images — GIG Technology

Toutes les photos sont dérivées des 5 visuels fournis par le client le 12 novembre 2026 (originaux conservés dans `gig-visuels/originaux/`). Plus aucune photo Unsplash n'est utilisée.

**Pour remplacer une photo :**
1. Remplacez le fichier dans `public/images/` en gardant **exactement le même nom**.
2. Lancez `npm run images` pour régénérer la version légère `-800.jpg`, utilisée sur mobile et dans les cartes.
3. Faites un commit et un push : Vercel met le site à jour.

Formats conseillés : JPG, qualité 75-80 %, moins de 450 Ko.

| # | Fichier | Dimensions | Section / page | Photo actuelle |
|---|---|---|---|---|
| 1 | `hero-home.jpg` | 1920 × 1080 | Accueil, Hero | ✅ Visuel 1 : technicien devant le camion GIG et la maison |
| 2 | `about-team.jpg` | 900 × 1100 (portrait) | Accueil, About | ✅ Visuel 1 (recadrage portrait : technicien + maison) |
| 3 | `service-plumbing.jpg` | 1920 × 1200 | Carte Plumbing + Hero de la page Plumbing | ✅ Visuel 5 : atelier plomberie, camion outillé, logo GIG |
| 4 | `service-heating.jpg` | 1920 × 1200 | Carte Heating + Hero de la page Heating | ✅ Visuel 4 : chaufferie, chaudière murale |
| 5 | `service-hvac.jpg` | 1920 × 1200 | Carte HVAC + Hero de la page HVAC | ✅ Visuel 2 : chantier, gaines de ventilation, casque GIG |
| 6 | `service-fire-protection.jpg` | 1920 × 1200 | Carte Fire Protection + Hero de la page | ✅ Visuel 3 : local sécurité incendie (extincteurs, centrale, RIA) |
| 7 | `plumbing-intro.jpg` | 1000 × 800 | Page Plumbing, intro | ✅ Visuel 1 (recadrage : camion + technicien) |
| 8 | `heating-intro.jpg` | 1000 × 800 | Page Heating, intro | ✅ Visuel 4 (recadrage : technicien + chaudière) |
| 9 | `hvac-intro.jpg` | 1000 × 800 | Page HVAC, intro | ✅ Visuel 4 (recadrage : gaines + collecteur) |
| 10 | `fire-protection-intro.jpg` | 1000 × 800 | Page Fire Protection, intro | ✅ Visuel 3 (recadrage : centrale incendie + extincteurs) |
| 11 | `hero-contact.jpg` | 1920 × 1080 | Page Contact, Hero | ✅ Visuel 1 (bande 16:10 : camion + technicien) |
| 12 | `og-default.jpg` *(optionnel)* | 1200 × 630 | Image de partage sur les réseaux sociaux (générée à partir du logo) | — |
| 13 | Logo PNG transparent ou SVG *(optionnel)* | ≥ 1000 px | Header / footer / favicon | remplacer `public/logo.jpg`, puis `npm run icons` |
