# Test technique Nuxt/VueJS 3

Le projet utilise le template [Nuxt Starter](https://github.com/lazercaveman/nuxt-starter), compatible Nuxt 4 et VueJS 3.

## 🚀 Getting Started
1. Clone or download this repository
2. Ensure you have Node version v22.13.0 up an running
3. Make sure you have pnpm version mentioned in the package json in use (or use the package manager of your choice it should also work - in case remove the `.npmrc` file and execute e.g. `corepack use yarn@4.10.3`).
4. Run `pnpm install` to install dependencies
5. Run `pnpm dev` to start the local development environment

! Configuration nécessaire !
Ajouter le fichier `.env` à la racine du projet, avec l'Access Token Auth de votre API TMDB : `NUXT_PUBLIC_TMDB_HEADER_AUTH=VOTRE_ACCESS_TOKEN`