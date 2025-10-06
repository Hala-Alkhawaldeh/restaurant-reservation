# Restaurant Reservation 🥗🍽️

A starter template to help you get up and running with **Vue 3** using **Vite**.
A Vue 3 + Vite application to manage restaurant branches and reservations.
This project is built with a focus on clean architecture, scalability, and maintainability.
---

## 🚀 Features

- Vue 3 + Composition API support
- TypeScript ready
- ESLint configured
- Hot-reload for development
- Production-ready build setup

---

## 🗂️ Project Structure
This project follows a **feature-based structure** for scalability and maintainability. Here are the most important features:

- **API Layer (`src/api` & `src/services`)**  
  Centralized Axios  (`axios.ts`) and feature-specific services (e.g., `branchService.ts`) to handle HTTP requests cleanly.

- **State Management (`src/stores`)**  
  Pinia stores (e.g., `branches.ts`) provide reactive state management across the app, making it easy to share and update data between components.

- **Composable Functions (`src/composables`)**  
  Reusable logic hooks like `useSnackbar.ts` allow you to handle common functionality across multiple components efficiently.


- **Reusable Components (`src/components`)**  
  Generic UI components like `Button.vue` can be reused across the application to maintain consistency and reduce duplication.


- **Routing (`src/router`)**  
  Vue Router setup for navigating between pages/views. Supports lazy-loaded feature-based views.

- **Layouts (`src/layouts`)**  
  Layout components (e.g., `defaultLayout.vue`) provide consistent page structure and can be extended for different sections of the app.

- **TypeScript Support (`src/types`)**  
  Global and feature-specific types ensure type safety across the project (`branch.d.ts`, `reservation.d.ts`).


## 🛠️ Recommended IDE Setup

We recommend using **VS Code** with the following extensions:

- [Vue (Official) - Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur if installed)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

> **Tip:** Volar provides full TypeScript support for `.vue` files, enabling auto-completion, type-checking, and more.

---

## 🌐 Recommended Browser Setup

### Chromium-based browsers (Chrome, Edge, Brave, etc.)

- [Vue.js Devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- Enable **Custom Object Formatter** in DevTools: [Chrome Instructions](http://bit.ly/object-formatters)

### Firefox

- [Vue.js Devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- Enable **Custom Object Formatter**: [Firefox Instructions](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

---

## 📝 TypeScript Support for `.vue` Imports

TypeScript cannot handle `.vue` imports by default.  

- Use [`vue-tsc`](https://github.com/johnsoncodehk/volar) for type checking.
- Make sure Volar is installed in your editor for full language support.

## Project Setup
## 🧩 Node.js Version
```sh
nvm use 20
```

## node Modules 
```sh
npm install
```
## 🔧 Environment Setup
1. Create a `.env` file in the project root.
2. Copy the variables from `.env.example` and update with your actual API keys.


### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
