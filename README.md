# GIG Technology LLC — website

Site vitrine (Astro 7 + CSS natif) de GIG Technology LLC : plumbing, heating, HVAC et fire protection à Staten Island, NY. Prévu pour un déploiement sur Vercel.

## Commandes

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # build de production (dist/ et .vercel/output)
npm run preview
npm run icons     # régénère favicons et logos optimisés depuis public/logo.jpg
```

## Contenu modifiable

Tout le contenu se trouve dans `src/data/` :

| Fichier | Contenu |
|---|---|
| `site.json` | Nom, téléphone, email, adresse, horaires, réseaux sociaux, menu |
| `home.json` | Textes de la page d'accueil (hero, réassurance, about, compteurs, pourquoi nous, étapes, zones, devis) et page Contact |
| `services.json` | Les 4 services : cartes, pages dédiées, SEO, prestations, FAQ propres à chaque service |
| `faq.json` | FAQ générale |
| `areas.json` | Arrondissements et quartiers desservis |
| `reviews-demo.json` | Avis de démonstration, affichés seulement sans clé Google |

Les valeurs entre crochets (`[HOURS]`, `[EMERGENCY_HOURS]`…) sont des placeholders : le site les affiche surlignés en jaune. Dans le code, les zones correspondantes portent le commentaire `TODO : à confirmer avec le client`.

## Variables d'environnement (Vercel → Settings → Environment Variables)

| Variable | Rôle |
|---|---|
| `SITE_URL` | URL de production, ex. `https://www.gigtechnology.com` (canonical, sitemap, JSON-LD) |
| `GOOGLE_PLACES_API_KEY` | Clé Google Cloud avec **Places API (New)** activée |
| `PLACE_ID` | Place ID de la fiche Google Business |
| `RESEND_API_KEY` | Clé API Resend pour l'envoi des demandes de devis |
| `QUOTE_TO_EMAIL` | Adresse qui reçoit les devis (plusieurs adresses séparées par des virgules). Par défaut : l'email de `site.json` |
| `QUOTE_FROM_EMAIL` | Expéditeur vérifié chez Resend, ex. `GIG Technology <quotes@domaine.com>` |

Sans ces clés :
- le site affiche des avis de démonstration, clairement signalés comme tels ;
- le formulaire fonctionne en mode simulé (aucun email envoyé, la demande est écrite dans les logs).

Les avis Google sont récupérés **au moment du build**. Pour les rafraîchir, relancez un déploiement, ou automatisez-le avec un Deploy Hook Vercel appelé par une tâche cron hebdomadaire. L'API Places renvoie au maximum 5 avis.
