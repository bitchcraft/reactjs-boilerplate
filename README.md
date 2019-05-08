# reactjs-boilerplate

![CI status](https://travis-ci.org/maddrag0n/reactjs-boilerplate.svg?branch=master)


## What’s in the Box?

- **Free**: Open source ([BSD-3-Clause](./LICENSE.md))
- **Modern language features**: ES6/ES2015+ (env, flow, jsx)
- **Clean code**: Eslint, Flow
- **Ready to use**:
	- ReactJS with redux (dev logger, async actions), router and material-ui
	- Express server with CORS, helmet, morgan and express-handlebars
	- Distributed SCSS setup
- **Convenient tooling**:
	- Styleguidist live styleguide for developing components
	- JSdoc API documentation
	- Webpack with react-🔥-dom for development, caching and worker pools
	- Multi-stage docker build for production
	- Nodemon
	- Jest for unit-testing
- **A manual**: Read this fucking manual


## Setup

### NodeJS

Make sure to use the node version specified in `.node-version`. If you are using nodenv, you can simply `$ nodenv install $(< .node-version)`.

### Yarn

In order to build and run the code, you need to install [Yarn](https://yarnpkg.com).

### IDE

We recommend to use an IDE or code editor with eslint support.



## Running

Start by installing all the packages with `yarn`.

> On MacOS you might need to install Command Line Tools first `xcode-select --install`

### Starting everything

```bash
$ yarn start
```

This will start

- API server on port 3001
- [UI client on port 3000](http://localhost:3000)
- Docs and README at http://localhost:3000/docs

### Start the ReactJS component styleguide

```bash
$ yarn run styleguide
```


### Compile a static version of the Docs

```bash
$ yarn run jsdoc
```

### Compile a docker image

```bash
$ yarn run docker
```

### Offline code linting

```bash
$ yarn run lint
```

### Folder structure

- `api-server/` contains all api-server code
- `client/` contains all ui-client code
- `server/` contains the webserver (for ui-client and live docs)


## Contributors

* Thiemo Krause
* David Silva
* Josh Li
