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

## 📦 Configuration de son token GithubPackage pour Mooncake

Le fichier `.npmrc` est là pour ça, il permet de dire à NPM d'aller chercher tout ce qui est dépot `@o-clock-dev` sur github package, et le reste sur le dépot habituel de NPM.

Ensuite il faut s'identifier, pour ça il va falloir générer un token github.

On va sur github, on clique sur sa photo en haut à droite puis `Settings`, dans le menu à gauche tout en bas `Developer Settings` puis dans le menu de droite `Personal access tokens > Token (classic)` et `Generate new token > Generate new token (classic)`

Ici on va cocher la gestion des github packages avec aucune date d'expiration : 

![Github Token](https://user-images.githubusercontent.com/63776855/196926579-bc6ac225-c4c1-43da-ac34-9cb022debb24.png)

On valide et on récupère le token, je conseille de le **sauvegarder dans passbolt** pour éviter de refaire tout ça la prochaine fois qu'on en a besoin

Ensuite on revient dans le projet où on veut installer Mooncake et même si on utilise yarn habituellement on tape la commande : 
```
npm login --scope=@o-clock-dev --registry=https://npm.pkg.github.com
```

**:warning: Le mot de passe c'est le token qui a été généré à l'étape précédente**

Ce qui nous donne ça : 
![NPM Login](https://user-images.githubusercontent.com/63776855/196924736-25aa5c62-009b-4739-8dca-6a207e3dc8ee.png)

:tada: Ça y est, on est authentifié sur github, on n'aura plus à le re-faire normalement.

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
- `src/queryClient` - Là où se trouve le fichier de configuration de React Query ( on peut notamment y configurer le staleTime )
- `__tests__` - Là où sont les tests ( attentions ils doivent finir par monfichier.test.js )
- `__mocks__` - Là où sont les mockups pour les tests
- `build` - Les fichiers compilés ( prêts à partir en prod avec un surge par exemple )
- `webpack` - Les fichiers de config de la compilation ( Tout ce qui concerne wepback )
