# MBDSMagascar2022_2023_front

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.

## Lancement

- Vous pouvez voir le lien du Back-End utilise dans le fichier /environments/environments.ts
- Une fois que votre Back-End est lance, vous pouvez lancer
  npm install
  puis ng serve

## Hebergement

Le site est heberge sur render.com que vous pouvez visiter sur https://front1357.onrender.com/

## Projet

Pour finir le projet, je me suis inspire des composants dans le site [Angular material](https://material.angular.io).Et j' ai demande de l'aide a ChatGPT pour quelques blocages sur des erreurs.

### Fonctionnalites

#### Page d accueil

Sur le page d'accueil,vous pouvez voir la liste des devoirs qui sont rendus du cote droite et la liste des non rendus sur le cote gauche

#### Details

#### Login

Vous pouvez voir la liste des users dans le fichier auth.service.ts
this.userList = [
{ name: 'Pascal', password: 'admin', role: 'admin' },
{ name: 'Jean', password: 'test', role: 'user' },
{ name: 'Batman', password: 'test', role: 'user' }
];

#### Action

Vous pouvez modifier, supprimer si vous etes connectes en mode admin. Si vous etes en mode simple user vous pouvez ajouter un assignment, voir les details d un assignment et faire l action de rendre un projet.
La creation et la modification du devoir est sur un formulaire de type stepper.

## Equipe

13 - HERITIANA Jerry
57 - RAZFINDRAKOTO ANDRIANANTENAINA Tsiry
