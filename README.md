# tap

### Usage

#### Install:
```bash
git clone https://github.com/Metnew/react-semantic.ui-starter.git
cd react-semantic.ui-starter && rm -rf .git
npm install
```

#### Run:

```bash
npm run dev # run app in dev mode
npm run db  # run mock db for app(from another process)
```

#### Build:

```bash
npm run build # build app
npm run build:demo # build with process.env.BUILD_DEMO = true
```

These commands generate the `dist` folder.

#### Test:

```bash
npm run test # run tests with Jest
```

#### Lint:

```bash
npm run lint:styles  # lint styles with Stylelint
npm run lint:scripts # lint scripts with ESlint
```

#### Docs:

```bash
npm run docs # generate docs and `serve`
```

### FAQ

#### Where are static assets?
You can store static assets (images, videos) in `/static` folder.

#### Where is manifest.json?
You can find it in `webpack_config/config.js`

#### Is SSR available?
It's under active development inside `/src/server` folder.

#### How it differs from other starters?
Performance-first.
**Main purpose - build highly customizable isomorphic(!) skeleton for PWA, with SSR, code-splitting, following best practices.**

#### "You have a components folder and containers folder..and in the container you have another components folder?"

Components inside `containers/**/components` are components that are required by container.

For example, `Dashboard`(container) has `DashboardComponent`(component). You can think about `DashboardComponent` as "Isolated component", it isn't used in app anywhere except own parent-container.

Components in components are components that:
1. Don't have own logic and connection with state (as opposite to containers)
2. Aren't "isolated".(!)

As your app's `components` folder increases in size, it could be refactored to similar structure that implemented in [semantic-ui-react]( https://github.com/Semantic-Org/Semantic-UI-React/tree/master/src).

#### Where are tests?
There are tests for actions and for reducers.
Each reducer/action has own folder, where you can find:
1. Reducer/action itself.
2. Tests for it.

#### How to write tests?
You can find [action testing example here.](https://github.com/Metnew/react-semantic.ui-starter/blob/master/src/common/actions/auth/index.test.js)
It uses [redux-mock-store.](https://github.com/Metnew/react-semantic.ui-starter/blob/master/src/common/actions/auth/index.test.js)

