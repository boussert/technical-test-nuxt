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


## Améliorations futures potentielles

Le temps étant évidemment restreint pour ce genre de projets, on peut voir plein d'améliorations possibles pour avoir un projet vraiment qualitatif :

En terme de design :
- Avoir une cohérence entre les design tokens Vuetify et Tailwind (voir garder les classes utilitaires de Vuetify si cela suffit). En l'état les variables de couleurs sont dupliquées entre les fichiers `nuxt.config.ts` et `tailwind.css`. On peut imaginer utiliser style dictionary ou un autre outil pour séparer les tokens dans un fichier json ou typescript à part.
- Ajouter des composants skeleton au chargement des pages
- Ajouter plus de micro-animations (actuellement il n'y a que la card de la liste des films qui est animée au hover)

En terme de fonctionnel :
- Séparer les composants Vue : par modules fonctionnels, et/ou par atomicité (cf la méthode Atomic Design de Brad Frost), par exemple MovieCard aurait pu appeler un composant UICard.vue, qui lui même aurait pu appeler la v-card de Vuetify si c'était pertinent.
- Ajouter plus de tests