# ![Logo](./docs/logo.ico) React Notes a Clone of Google Keep

For my first project, I developed a minimalist *Clone* of [Google Keep](https://keep.google.com) written in [ReactJS](https://reactjs.org/) with [shadcn/ui](https://ui.shadcn.com/) components suitable for the application. It's themed to look like *Google Keep*, and includes features such as customization, drag-and-drop, archiving, and more (detailed below). The backend is a straightforward RESTfull API implemented with [Node.js](https://nodejs.org/en), using the [Mongoose-ORM](https://mongoosejs.com/), and data is persisted on MongoDB Atlas. Additionally, the server implementation is secured with token-based authentication, using jsonwebtoken.

## Video Demo

<div align="center">
<a href="https://www.youtube.com/watch?v=9cDGpNDJ1CY">
    <img width="50%" src="https://img.youtube.com/vi/9cDGpNDJ1CY/maxresdefault.jpg">
  </a>
<br/>
<p style="font-style:italic">
  Demo of the application divided into 5 parts: Note Creation, App Features, Labels Management, Search Feature, App Display (Display Mode and Responsivity)
</p>
</div>



## Features

* 🔐 **Login**, 🔏 **Register** for creating a new user and ❌**Delete** account

* 🌈 **Colors**, 📐 **Sizes**, ❮❯ **Margins**, ❯❮ **Paddings** etc., matches exactly that of *Google Keep*'s Web App

* 📲 **Responsive Design** -  Adapts to all screen sizes, from mobile screens to desktop.

* 📝 **Notes** - Create, Update, *Copy*, Delete items on the fly

  * 📝 **Simple Notes** - Update/delete text in a simple text mode

  * ☑️ **Todos with Checkboxes** - Mark items complete/incomplete using the checkbox

* 🚥 **Colors** - Assign colors to Notes

* 🔎 **Search** - Dynamic search functionality for notes based on their content, with options to use filters or directly enter queries in a search bar.

* 📜 **Display Mode** - Notes can appear in the canvas in 2 different modes (option save to localstorage)

  * **List** - Displays notes as one item

  * **Grid** - Displays notes as tiles, and spread across the canvas

* 🏷️ **Labels** - Label your notes, assign/unassign labels dynamically and filter notes by selecting labels in Sidebar

* 🤚 **Drag and Drop** - Feature to drag and drop unpinned notes together for flexible organization

* 📌 **Pinned Note** - Feature enabling the pinning of notes and dividing the note interface into two distinct categories

* 📅 **Latest Updated** - Indication of the last update of the note

* 🗃️ **Archiving** - Capability to archive notes as an alternative to deletion, offering a way to preserve important information without cluttering the main interface

## Features in Progress 🚧

* 🌚 **Dark Mode** - Dynamically change light/dark theme

* 🔍 **Display modal** - When a user clicks on any of the notes, a modal window opens. This modal is not just a simple pop-up; it comes with a visually scaling animation

* 🔗 **Optimistic approach to restful API queries** - To enhance user experience, instead of displaying a loader while retrieving data from the server, it would be better to adopt an optimistic data mutation approach using the onMutate method of ``react-query``. This method immediately updates the front-end data cache. A comparison is then made with the server-side update to modify the cache in case of an error

## Libraries Used



#### Frontend

* [ReactJS](https://fr.react.dev/) <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" width="20"> - See [`Front source`](./front/src)
  - Complete frontend JS framework

* [Typescript](https://www.typescriptlang.org/) <img src="https://guilhermetheodoro.gallerycdn.vsassets.io/extensions/guilhermetheodoro/typescript-indexing/0.0.4/1642797063953/Microsoft.VisualStudio.Services.Icons.Default" width="20"> - See [`Util example`](front\src\utils\transformToPatch.ts) or See [`Type`](front\src\type\userType.ts)
  - TypeScript is an indispensable, strongly typed programming language that builds on JavaScript, enhancing it with type annotations and advanced features

* [Tailwind css](https://tailwindcss.com/)  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/320px-Tailwind_CSS_Logo.svg.png" width="20">- See [`NavBar example`](front\src\components\NavBar\index.tsx)

  - A popular utility-first CSS framework for rapidly building custom user interfaces

* [Shadcn/ui](https://ui.shadcn.com/) <img src="https://avatars.githubusercontent.com/u/139895814?s=280&v=4" width="20">- See [`ui/shadcn-ui`](./front/src/components/ui/shadcn-ui)

  - This is a set of reusable components that you can copy and paste into your application. This library focused on accessibility, customization and open source is trendy and has experienced strong growth in 2023


* [Reach Router Dom](https://reactrouter.com/en/main) <img src=https://static-00.iconduck.com/assets.00/react-router-icon-512x279-zswz065s.png width="20"> - See [`Router`](front\src\router.tsx)

  - For client-side (browser) routing

* [React Query](https://tanstack.com/query/latest) <img src="https://seeklogo.com/images/R/react-query-logo-1340EA4CE9-seeklogo.com.png" width="20"> - See [`Queries`](./front/src/queries)

  - React Query is a data-fetching and state management library for React applications that simplifies fetching, caching, and updating data.

* [Zod](https://zod.dev/) <img src="https://codesandbox.io/api/v1/sandboxes/ojufdb/screenshot.png" width="20"> - See [`zod-schema`](./front/src/zod-schema)


#### Backend

* [Node.js and Express](https://nodejs.org/en) <img src=https://static-00.iconduck.com/assets.00/node-js-icon-227x256-913nazt0.png width="20"> - See [`App.js`](back\app.js)

* [Mongoose](https://mongoosejs.com/) <img src=https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mongoose/mongoose.png width="20"> - See [`Model`](./back/api/models)

* [jsonwebtoken](https://mongoosejs.com/) <img src=https://cdn.worldvectorlogo.com/logos/jwt-3.svg width="20"> - See [`authentification.js`](back\api\middleware\authentification.js)


## Conception

<div align="center">
    <img width="50%" alt='App diagram architecture' src="./docs/App Diagram Arch.png">
<br/>

</div>
<br/>

This diagram explains the design of the high-level architecture of this project. This stack is a Monolith, with a frontend-backend database grouped into a single container deployment. The frontend is a ReactJS stack.

For the user to access the service, they must authenticate, and the [PrivateRoutes](front\src\components\PrivatesRoutes\index.tsx) checks for the presence of a **token** and redirects the user to the `/sign-in` route or not. The `/sign-in` and ``/sign-up`` routes are accessible without token verification, and data validations are done on the front end with zod and on the back end via mongoose model validators. On the backend, each server, client, etc., error is managed by [Apierror](back\api\services\error), a JavaScript Error class handled in middleware on the back end, and returns a personalized message with a status code to the front end; if necessary, the message is displayed with a toast to inform the user.

The User must fill out a standard form to register (no email verification is in place) and password. All login and registration HTTP calls are **RESTfull** and are made via the ``React Query library``. Once created, the user accesses the /notes route. Whether for authentication or registration, a token is set in the browser's local storage.

As soon as the user accesses the main page, several requests are made: for the **Profile**, **Notes**, **Note contents**, and **Labels**. The user's data is then cached using React Query keys. Each of these keys can be called to invalidate them and precisely target the data to update (to improve UX, especially on instant updates without delay, it would be preferable to have an optimistic approach by proceeding to mutate the data on the front end via the onMutate method of React Query and then comparing the data with the API response).

The user can **create**, **update**, **delete** note elements, and can also create and **assign/unassign** labels to note elements. Labels can be **added** and **modified**. For an exhaustive list of functionalities, please refer to [Features](#features). The user can log out and delete their account by clicking on the **Profile** icon.

The Backend is a simple RESTfull API built with ``Node.js`` and ``Express``. The router consists of 3 main routes: ``/users``, ``/notes``, and ``/labels``. All routes dedicated to user-specific services are protected by an [authentication middleware](back\api\middleware\authentification.js) that verifies the JWT token. The database is built with three MongoDB documents: **users**, **labels**, and **notes**, and each of these documents is pre-generated by a [mongoose model](back\api\models).

