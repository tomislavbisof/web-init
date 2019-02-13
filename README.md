# Web Init

Web Init is a modern starter kit for developing websites which includes a preconfigured build process and a project structure that can be built upon.

ESLint and Prettier are included to enforce uniform and well-written code. Both are customizable through their respective configuration files.

Git hooks are set up with Husky that format your files with Prettier and check for code errors with ESLint on commit.

## Includes

- [SASS](http://sass-lang.com)
- [PostCSS](http://postcss.org)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [ESLint](https://eslint.org)
- [Airbnb Style Guide](https://github.com/airbnb/javascript)
- [Webpack 4](https://webpack.js.org)
- [JQuery](https://jquery.com/)

### Installation

To install Web Init, simply clone or download the repository, navigate to the project root and run:

```
npm install
```

### Usage

For development with the Webpack Dev Server and HMR, use:

```
npm run watch
```

To build the project for production, use:

```
npm run build
```

Your project files will be located in the `/dist/` folder after building. Images smaller than 8KB will be embedded, while larger ones will be located in `/dist/assets/`.

### License

This started out as a quick-start template for my own projects, so feel free to modify or use it as you like.
