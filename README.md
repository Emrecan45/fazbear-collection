<div align="center">

# Fazbear Collection

![Inventaire](public/assets/img/Inventaire.png)

</div>

## Équipe
- Emrecan DEMIRTAY
- Erman KURUCELIK

*Le site a été développé avec Live Share (extension VSCode) pour coder en temps réel à plusieurs. Ce qui explique la différence de commits sur le dépot git.*


## Présentation

Ce projet est une **Single Page Application (SPA)** en **JavaScript** permettant de gérer une collection de personnages de l'univers Five Nights at Freddy's. L'objectif est de pouvoir gagner des personnages, consulter leurs détails et leur attribuer des équipements (également à gagner), le tout via une interface fluide sans rechargement de page.

## Structure du projet

- `public/`
  - `assets/`  Images et style CSS
  - `db.json`  Catalogue statique (personnages et équipements)
- `src/`
  - `components/`  Composants (cards, badges, barres de stats...)
  - `models/`  Classes objets (Character, Equipment...)
  - `services/`  Providers, catalogue statique, i18n, localStorage...
  - `views/`  Vues de chaque page (liste, détail, boutique...)
  - `index.js`  Routeur
- `index.html`  Page HTML de base
- `vite.config.js`  Configuration du bundler Vite
- `package.json`

## Spécifications techniques
- Le code a une architecture MVC afin de séparer les données, les affichages et les logiques.
- Données :
  - Catalogue : les personnages et équipements sont chargés depuis un fichier statique `public/db.json`.
  - Notes : partagées entre tous les visiteurs via **Supabase** (moyenne communautaire).
  - Local : inventaire, équipements assignés et favoris sont stockés en LocalStorage.
- Site bilingue (anglais par défaut, bascule FR/EN).
- Un routeur gère la navigation entre les vues pour respecter la contrainte du SPA.
- Recherche + pagination sur la liste des personnages.
- Chaque personnage peut avoir un équipement qui modifiera ses statistiques.
- Système de notes (avec moyenne) et de favoris (coeur sur les cards).
- Lazy loading sur les images.

## Lancer le site (local)

1. Installer les dépendances :
    ```bash
    npm install
    ```

2. Lancer le site :
    ```bash
    npm run dev
    ```

Le catalogue est servi en statique (`public/db.json`), aucun serveur de données n'est nécessaire.

## Lancer le site (en ligne)
- Front statique déployé sur **GitHub Pages** (build Vite via GitHub Actions, voir `.github/workflows/deploy.yml`).
- Inventaire, équipements et favoris sont conservés dans le navigateur (LocalStorage).
- Les notes sont partagées via **Supabase** (URL et clé `anon` à renseigner dans `src/config.js`).

**🔗 Lien du site : [https://emrecan45.github.io/fazbear-collection/](https://emrecan45.github.io/fazbear-collection/)**

## Bundler

Un bundler est un outil qui prend tous les fichiers du projet (JS, CSS, images...) et les assemble en un petit nombre de fichiers optimisés pour le navigateur.

Pour Fazbear Collection, nous avons choisi **[Vite](https://vite.dev/)** car il est rapide et simple à configurer.
- `npm run dev` : il lance un serveur local et recharge automatiquement la page à chaque modification
- `npm run build` : il génère un dossier `dist/` avec des fichiers optimisé prêt à être déployés. Cette étape est exécutée par **GitHub Actions** pour publier le site sur GitHub Pages.

### Fichier `vite.config.js`

Nous avons ajouté ce fichier pour fixer le site au port `5000` et avoir une ouverture du site sur navigateur de manière automatique après le run dev.
