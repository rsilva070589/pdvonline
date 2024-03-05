# vue3-nouislider

A Vue3 wrapper for noUiSlider

## Table of contents

- [Installation](#installation)

# Installation

```
npm install --save vue3-nouislider
```

## Default import

Install all the components:

```javascript
import VueNouislider from 'vue3-nouislider';
import {createApp} from 'vue';
import App from './App.vue';

const app = createApp(App).use(VueNouislider);
```
---

# Plugin Development

## Installation

The first time you create or clone your plugin, you need to install the default dependencies:

```
npm install
```

## Watch and compile

This will run webpack in watching mode and output the compiled files in the `dist` folder.

```
npm run dev
```

## Use it in another project

While developping, you can follow the install instructions of your plugin and link it into the project that uses it.

In the plugin folder:

```
npm link
```

In the other project folder:

```
npm link vue3-nouislider
```

This will install it in the dependencies as a symlink, so that it gets any modifications made to the plugin.

## Publish to npm

You may have to login to npm before, with `npm adduser`. The plugin will be built in production mode before getting published on npm.

```
npm publish
```

## Manual build

This will build the plugin into the `dist` folder in production mode.

```
npm run build
```

---

## License

[MIT](http://opensource.org/licenses/MIT)
