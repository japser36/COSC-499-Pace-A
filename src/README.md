# COSC-499-Pace-A

### `src` directory

This directory contains the root of the project's source code.

### Contents

##### Sub-folders
* `components/` -> All React component files should go in this directory. Styles for specific components can be included here too.
* `pages/` -> All root page React components should go in this directory, with it's location in sub folders matching the desired url. For example, to make `http://localhost:3000/app/calendar`, export a default component from `pages/app/calendar.tsx`. Server API endpoints are definable under the `pages/api/` sub-directory.
* `public/` -> All static assets, such as images, text documents, etc., should go in here. However, `.css` (as well as `.scss` and `.sass`) files should go under `styles/` instead. This is where we might put `robots.txt` for SEO purposes, for example, or a `manifest.json` for a PWA (Progressive Web App).
* `styles/` -> With the exception of component specific styles, (see `components/` above), all style related (`.css`, `.scss`, `.sass`) files should go under this directory. Any file named `*.module.(css|scss|sass)` can be assigned to specific components in React. Files with just the extension, and no `.module` in their name, are only 'globally' importable in a component.

##### Files
* `.gitignore` -> This file tells git what files to ignore/not ignore, under the `src/` directory.
* `next-env.d.ts` -> This is a file required by typescript to see some global NextJS environment types. PLEASE DON'T MODIFY
* `package.json` -> This file tells node what packages this project needs, and includes other project related things.
* `postcss.config.js` -> The PostCSS configuration file.
* `tailwind.config.js` -> The TailwindCSS configuration file.
* `tsconfig.json` -> The TypeScript compiler configuration file.
* `yarn.lock` -> The Yarn package manager lock file. Auto-generated, but should be included in version control (not .gitignore'd).

### Running the Project

To run the project, open a command prompt or terminal to this directory.

1. Always start by making sure you are on the right branch!
2. Run `yarn install` to install any and all dependencies.
3. Run `yarn dev` to start the server in development mode.

##### (Optional) Runnning the Project in Production Mode
If you must test the project in production mode, run `yarn build && yarn start`. This is not generally needed during development. This is the same command the deployment mechanism will be running to host the server.
