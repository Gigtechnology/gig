# Images à fournir — GIG Technology

Tant qu'une photo n'est pas fournie, son emplacement affiche un motif rayé bleu de la palette avec le nom du fichier attendu.

**Pour ajouter une photo :**
1. Déposez le fichier dans `public/images/` sous le nom indiqué ci-dessous.
2. Dans le fichier de données indiqué, remplacez `"image": null` par `"image": "/images/<nom-du-fichier>"`.

Formats : JPG (ou WebP), qualité 80 %, moins de 400 Ko si possible. Utilisez de vraies photos de chantiers ou de l'équipe, pas de banque d'images générique.

| # | Fichier attendu | Dimensions recommandées | Section / page | Champ à renseigner |
|---|---|---|---|---|
| 1 | `hero-home.jpg` | 1920 × 1080 px (16:9), sujet à droite | Accueil, Hero (fond sombre avec voile bleu nuit) | `src/data/home.json` → `hero.image` |
| 2 | `about-team.jpg` | 900 × 1100 px (portrait) | Accueil, About (à côté du texte et des compteurs) | `src/data/home.json` → `about.image` |
| 3 | `service-plumbing.jpg` | 1920 × 1200 px (16:10) | Carte Plumbing (accueil) + fond du Hero de la page Plumbing | `src/data/services.json` → plumbing `image` |
| 4 | `service-heating.jpg` | 1920 × 1200 px (16:10) | Carte Heating + Hero de la page Heating | `src/data/services.json` → heating `image` |
| 5 | `service-hvac.jpg` | 1920 × 1200 px (16:10) | Carte Ventilation & HVAC + Hero de la page HVAC | `src/data/services.json` → ventilation-hvac `image` |
| 6 | `service-fire-protection.jpg` | 1920 × 1200 px (16:10) | Carte Fire Protection + Hero de la page Fire Protection | `src/data/services.json` → fire-protection `image` |
| 7 | `plumbing-intro.jpg` | 1000 × 800 px (5:4) | Page Plumbing, bloc d'introduction | `services.json` → plumbing `intro.image` |
| 8 | `heating-intro.jpg` | 1000 × 800 px (5:4) | Page Heating, bloc d'introduction | `services.json` → heating `intro.image` |
| 9 | `hvac-intro.jpg` | 1000 × 800 px (5:4) | Page HVAC, bloc d'introduction | `services.json` → ventilation-hvac `intro.image` |
| 10 | `fire-protection-intro.jpg` | 1000 × 800 px (5:4) | Page Fire Protection, bloc d'introduction | `services.json` → fire-protection `intro.image` |
| 11 | `hero-contact.jpg` | 1920 × 1080 px (16:9) | Page Contact, Hero | `src/data/home.json` → `contactPage.image` |
| 12 | `og-default.jpg` *(optionnel)* | 1200 × 630 px | Image de partage réseaux sociaux (générée pour l'instant à partir du logo) | remplacer `public/og-default.jpg` |
| 13 | Logo en PNG transparent ou SVG *(optionnel)* | ≥ 1000 px de large | Header / footer / favicon (le JPG actuel a un fond blanc) | remplacer `public/logo.jpg` puis `npm run icons` |
