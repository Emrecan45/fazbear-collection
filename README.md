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

- `data/`
  - `db.json`  Base de données Json (json-server)
- `public/`
  - `assets/`  Images et style CSS
- `src/`
  - `components/`  Composants (cards, badges, barres de stats...)
  - `models/`  Classes objets (Character, Equipment...)
  - `services/`  Providers (appels API...)
  - `views/`  Vues de chaque page (liste, détail, boutique...)
  - `config.js`  URL de base pour l'API
  - `index.js`  Routeur
- `index.html`  Page HTML de base
- `vite.config.js`  Configuration du bundler Vite
- `package.json`

## Spécifications techniques
- Le code a une architecture MVC afin de séparer les données, les affichages et les logiques.
- Données :
  - API : Les personnages, notes et équipements etc.. sont gérés depuis `json-server`.
  - Local : Les favoris sont stockés en LocalStorage.
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

2. Lancer le serveur de données :
    ```bash
    npx json-server data/db.json --port 3000
    ```

3. Générer le build :
    ```bash
    npm run build
    ```

4. Lancer le site :
    ```bash
    npm run dev
    ```

## Lancer le site (en ligne)
Configuration du déploiement :
- Déployé sur **[Vercel](https://vercel.com)** avec mise à jour automatique via le dépôt GitHub.
- API json-server hébergée sur **[Render](https://render.com)**.
- Ping constants grâce à **[UptimeRobot](https://uptimerobot.com)** pour éviter la mise en veille du serveur.
- Site validé et indexé sur **[Google Search Console](https://search.google.com/search-console)**.

**🔗 Lien du site : [https://fazbear-collection.vercel.app](https://fazbear-collection.vercel.app)**

## Bundler

Un bundler est un outil qui prend tous les fichiers du projet (JS, CSS, images...) et les assemble en un petit nombre de fichiers optimisés pour le navigateur.

Pour Fazbear Collection, nous avons choisi **[Vite](https://vite.dev/)** car il est rapide et simple à configurer.
- `npm run dev` : il lance un serveur local et recharge automatiquement la page à chaque modification
- `npm run build` : il génère un dossier `dist/` avec des fichiers optimisé prêt à être déployés. Cette étape a été utilisée par **Vercel** pour mettre le site en ligne.

### Fichier `vite.config.js`

Nous avons ajouté ce fichier pour fixer le site au port `5000` et avoir une ouverture du site sur navigateur de manière automatique après le run dev.
