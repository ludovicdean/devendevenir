Les level ups :
 - présentation technique
 - sur un sujet spécifique
 - afin d'avoir un vernis technique sur le sujet

## Caractéristiques d'Astro
- îles Astro
- UI agnostique (React, Svelte, Vue)
- Server first (rendu géré sur le serveur)
- 0 JS
- Collections de contenu
- Plein d'intégrations

## L’architecture “Astro Islands”.

- Idée 2019 développée par le créateur de Preact (alternative à React, plus compacte).
- Une page web est composée d’Astro Islands :
  - des emplacements réservés (slots)
  - hydratation dynamique et indépendante
  - React, Vue, Svelte en simultané
  - Pas de JS côté client, que du html/css
  - Chargement des composants contrôlé
  - Deux types d’Astro Islands :
    - les layouts (trames de pages web)
    - les composants

## Démo 1

- Visite guidée du blog
- Les collections
  - Configurer une collection
  - Zod : 
    - bibliothèque TypeScript 
    - permet d'assurer le typage et le respect du schéma des objets
    - la structure des objets est définie à un seul endroit et vérifiée partout dans le projet
- Le FrontMatter
    - Créer un nouveau fichier avec un FrontMatter incomplet
```html
---
title: "Mon nouvel article"
tags:
    - Framework
description: "Mon nouvel article."
banner: "/images/arnel-hasanovic-MNd-Rka1o0Q-unsplash.jpg"
readingtime: "5 min"
author: "Arnel Hasanovic"
authorlink: "https://unsplash.com/fr/@arnelhasanovic?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
unsplashlink: "https://unsplash.com/fr/photos/macbook-air-a-cote-dune-lampe-detude-doree-et-de-livres-a-spirale-MNd-Rka1o0Q?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
isArticle: true
---
```

- Corriger le FrontMatter

```html
---
date: Apr 18 2024
---
```
- File routing
  - Chaque collection a son propre répertoire
  - Fichiers ignorés avec un _



- Les variables globales
  - consts.ts

```javascript
export const VARIABLE_GLOBALE = 'Vous êtes développeur/se depuis peu ? Ce n\'était pas votre métier initial ? Ce site est fait pour vous !';
```
  - index.astro
```javascript
import { VARIABLE_GLOBALE } from "../consts";
```

- Composant Image
  - astro.mdx : montrer que l'inspecteur indique d'utiliser le composant Image avec l'outil Audit
```html
import {Image} from "astro:assets";
import {arborescence} from "../../assets/astro-arborescence.png";

<Image src={arborescence} alt="Arborescence d'un projet Astro généré automatiquement avec le template blog." inferSize />

```

- View Transitions
  - index.astro

```html
import { ViewTransitions } from 'astro:transitions';
<ViewTransitions />

```

- Directives client
  - BlogPost.astro
```javascript
client:visible
```