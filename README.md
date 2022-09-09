# :rocket: :star: React App Template :star: :rocket:

## Dépendances

- Webpack
- ESLint
- Prettier
- Git-Flow
- Husky
- Recoil
- Sass


## :sunny: Pré-requis

- Installe les dépendances nécessaires au bon fonctionnement du projet. 
Les dépendances ce trouvent dans le fichier `package.json` et vont s'installer dans le dossier `node_modules` :

```bash
yarn
```

- Lance le server de developpement :

```bash
yarn start
```

Si tu veut Build :

```bash
yarn build
```

Si tu veut lancer tes tests :

```bash
yarn test
```

## Utilisation de `Git Flow` pour la gestion des branches
Workflow ici -> https://www.atlassian.com/fr/git/tutorials/comparing-workflows/gitflow-workflow


## Commit

Les commits sont soumis à une règle commitlint qui doit être respectée comme ceci : 
```sh
type(scope?): subject
```

Le type doit être choisis parmis : 
- feat
- fix
- docs
- style
- refactor
- test
- revert

Le scope est optionnel, c'est en un mot la catégorie de choses qui a été touchée, et le sujet c'est le "message" du commit, tout en minuscule

Avec la commande ci-dessous, des prompts vont s'afficher afin de vous aider à créer un commit valide :

```shell
$ yarn commit
```

Pour avoir un prompt en cas d'erreur au moment du commit, vous pouvez installer [git-cz](https://www.npmjs.com/package/git-cz) en global sur votre poste

## Versionning automatique

Lors d'un push sur Master, une release PR est automatiquement créée, il suffit de la valider pour que la version du projet ainsi que le changelog soient automatiquement mis à jour (à condition d'utiliser la convention de nommage de commit : `type(scope?): subject` cf au dessus).


## Les dossiers courants à l'utilisation :

- `src` - Là où sont les sources
- `src/commons` - Pour Keycloack et l'Api
- `src/components` - Pour tout ce qui est composant réutilisable
- `src/pages` - Là où sont les vues ou pages
- `src/recoil` - Là ou se trouve le state et les requêtes, dans les Atom et Selectors
- `src/routes` - Là où se trouve le fichier regroupant les routes
- `__tests__` - Là où sont les tests ( attentions ils doivent finir par monfichier.test.js )
- `__mocks__` - Là où sont les mockups pour les tests
- `build` - Les fichiers compilés ( prêts à partir en prod avec un surge par exemple )
- `webpack` - Les fichiers de config de la compilation ( Tout ce qui concerne wepback )
