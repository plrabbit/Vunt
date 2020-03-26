# Vunt

A light web app framework built with [Vue](https://github.com/vuejs/vue) + [Ant Design Vue](https://github.com/vueComponent/ant-design-vue)

Easier project customization for developers.

## Usage

### Pillar-CLI

> ```pillar-cli``` is a scaffolding tool which helps you create projects with Vunt.

Install ```pillar-cli``` globally and run create command.
```
npm i -g @plrabbit/cli

pillar create project-name
```

Or, using ```npx```:

```
npx @plrabbit/cli create project-name
```
> Please note that ```npx``` requires ```npm version >= 5.2.0```, and may cause some errors on account of the space in your system username.

Then just follow the steps in the command line.

### General

Initially, clone this repository.
```
git clone --depth 1 https://github.com/plrabbit/vunt.git project-name
```

Then modify the project name in ```package.json```.
```
{
  "name": "project-name"
  ...
}
```

Finally, install dependencies and run ```serve``` script.
```
npm install

npm run serve
```

## Customize Configurations

All the configuration files are stored in the **config folder**. You may find it in the root directory.

### Basic(vue.config.js)

Modifying the basic configuration, just opening the ```vue.config.js``` in the root directory, it includes some frequently-used API.

> vue.config.js API schema is same to [Vue-CLI](https://cli.vuejs.org/config/#vue-config-js)

```js
// vue.config.js

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  css: {
    loaderOptions: {
      less: {
        /* Customize themes, modify it in /config/theme.config.js */
        modifyVars,
        /* Allow scripts to import *.less */
        javascriptEnabled: true
      }
    }
  },

  /* generate sourceMap or not */
  productionSourceMap: process.env.NODE_ENV === 'development',

  /* To make lint errors show up in the browser overlay. */
  lintOnSave: 'error',

  /* webpack-dev-server configuration */
  devServer: {
    /* gzip(only development) */
    compress: true,
    // host: '127.0.0.1',
    port: 8000
  },

  /* Compile dependencies in node_modules */
  transpileDependencies: []
}
```

### Importing Ant Design Components

> Vunt has install ```babel-plugin-import``` to import AntD components as you need. It helps us to decrease webpack bundle size.

But the bad news is, every time you using a new component, you need to modify ```src/ant-components.js```, like this:

```js
/* Oh! I want to use a-button! */
import {
  // ...
  Button
} from 'ant-design-vue'

/* Add Button here for Vue.use() */
/* message, notification, Modal are not required to Vue.use() */
[
  // ...
  Button
].forEach(n => {
  Vue.use(n)
})
```

It is recommended that import frequently-used AntD components in ```src/ant-components.js```, and import the particular AntD components in your Vue components.

#### Importing All AntD components

Seems inconvenient? If you don't need to consider bundle size, you can import all AntD components in one time.

First, you need to REMOVE the ```babel-plugin-import``` stated in ```babel.config.js```
```js
plugins: [
  // [
  //   'import',
  //   {
  //     libraryName: 'ant-design-vue',
  //     libraryDirectory: 'es',
  //     style: true
  //   }
  // ]
]
```

Then modify the ```src/main.js```.

```js
// import './ant-components'
import AntD from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less' // Must be less, otherwise the theme won't work.
Vue.use(AntD)
```

### CDN

Open the ```cdn.config.js```, modify the variable "useCDN", decide if you want to request assets from CDN.

> Please note that "useCDN" is false by default.

```js
const useCDN = true
```

Then simply add webpack externals and cdn address for assets below.
```js
// config/cdn.config.js

const sourcesCDN = {
  /* webpack externals */
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
  },
  /* css assets on CDN */
  css: [],
  /* js assets on CDN */
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@3.1.5/dist/vue-router.min.js',
    'https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js',
    'https://cdn.jsdelivr.net/npm/axios@0.19.2/index.min.js'
  ]
}
```

### Theme

Open the ```theme.config.js```, you can see the frequently-used variables in [Ant Design Vue](https://github.com/vueComponent/ant-design-vue).

Just modify them simply.

```js
// config/theme.config.js

module.exports = {
  '@primary-color': '#1890ff',
  '@link-color': '#1890ff',
  '@success-color': '#52c41a',
  '@warning-color': '#faad14',
  '@error-color': '#f5222d',
  '@font-size-base': '14px',
  '@heading-color': 'rgba(0, 0, 0, .85)',
  '@text-color': 'rgba(0, 0, 0, .65)',
  '@text-color-secondary': 'rgba(0, 0, 0, .45)',
  '@disabled-color': 'rgba(0, 0, 0, .25)',
  '@border-radius-base': '4px',
  '@border-color-base': '#d9d9d9',
  '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, .15)'
}
```

In addition, all less variables could be found in [Default Variables](https://github.com/vueComponent/ant-design-vue/blob/master/components/style/themes/default.less)

> Please note that theme.config.js is a **js file**, not a less file!!!

### Iconfont

Vunt can help you inject [Iconfont](https://www.iconfont.cn/) conveniently.

> Vunt supports any icons with "Font Class", not only icons from [Iconfont](https://www.iconfont.cn/).

Copy your iconfont files into ```public/assets/icons```, including the css file. Storing them into the ```public``` folder so that you can replace the icons without rebuilding, unless adding a new set of iconfont.

That will be like this:

    public
    ├── assets
        ├── icons
            ├── iconfont.css
            ├── iconfont.eot
            ├── iconfont.svg
            ├── iconfont.ttf
            ├── iconfont.woff
            ├── iconfont.woff2

Rerun ```npm run serve```.

Generally, only ```assets/icons/iconfont.css``` is specified. You can specify the other css file(s) in ```config/plugins.config.js```.

```js
// config/plugins.config.js

// The paths are relative to 'publicPath' configured in vue.config.js
new HtmlInjectIconfont(['assets/icons/iconfont.css', 'assets/icons/others/xxx.css'], publicPath)
```

> In addition, changing the iconfont css files configured in ```config/plugins.config.js``` can trigger a reload automatically.

### Webpack Configuration

> The ```configureWebpack``` and ```chainWebpack``` attr. are separated from vue.config.js, the main thought is to distinguish webpack from other configurations.

You can find ```configureWebpack``` and ```chainWebpack``` in ```vue.webpack.config.js```

### API Management

> Vunt offers a script calls ```coder``` to generate APIs, including API request functions(with axios), mixins for Vue components. Also, RESTful APIs is supported.

#### Generating APIs

Before running ```npm run coder```, we need to set up the API schemas in ```code/api-schemas```.

First, creat a new JS file in ```code/api-schemas``` named with a module name, such as ```base-feature.js```(which includes interface like login or logout).

The JS file should export an Array, with your API object in it, for example:

```js
/**
 * @type {array}
 * @property {string}   path      API path
 * @property {string}   desc      API description
 * @property {string}   name      Customize the function name
 * @property {boolean}  rest      Decide if generate RESTful API
 * @property {object}   options   Options for axios
 */
module.exports = [
  {
    path: '/home/blogArticles', // Will be generated: API_HOST + path
    desc: 'Get all blog articles',
    name: 'getArticles',
    rest: false,
    options: {
      method: 'get'
    }
  }
]
```

> The whole path will be ```API_HOST + path```, ```API_HOST``` is a global variable like ```baseUrl``` in axios, you can find it in ```public/config.js```.

Then, run ```npm run coder```, and find the generated API files in ```src/base/api``` and ```src/base/mixin```. The generated functions will be like this:

```js
/** Get all blog articles */
export const getArticles = function (data = {}) {
  return axios({
    params: data,
    method: 'get',
    url: API_HOST + '/home/blogArticles'
  })
}
```

Every function returns a promise from axios, just simply import them in your modules!

```js
// api
import { getArticles } from '@/base/api/base-features'
// getArticles({ ... }).then(res => { ... }) somewhere

// mixin
import baseFeatures from '@/base/mixin/base-features'
export default {
  mixins: [baseFeatures]
  // this.$api.getArticles({ ... }).then(res => { ... }) somewhere
}
```

> TIP: Using ```this.$api.xxx``` in mixins so that we can distinguish Vue components functions from API functions.

#### Dynamic Path Parameters

To use dynamic path parameters, you may configure it in your api-schemas files, like this:

```js
module.exports = [
  {
    path: '/home/:userId/blogArticles', // Insert some dynamic path parameters with a colon before.
    desc: 'Get all blog articles',
    name: 'getArticles',
    rest: false,
    options: {
      method: 'get'
    }
  }
]
```

Run ```npm run coder``` to generate functions.

```js
/** Get all blog articles */
export const getArticles = function (pathParams = {}, data = {}) {
  const {
    userId
  } = pathParams
  return axios({
    params: data,
    method: 'get',
    url: API_HOST + `/home/${userId}/blogArticles`
  })
}

// Pass an object with path parameter(s)!
import { getArticles } from '@/base/api/base-features'
getArticles({ userId: '7008960' }, data)
```

#### RESTful API Support

Change the ```rest``` attribute to ```true``` in your api-schemas file.

```js
module.exports = [
  {
    path: '/home/:userId/blogArticles',
    desc: 'Get all blog articles',
    name: 'blogArticles',
    rest: true, // change it to true
    options: {
      method: 'get' // method will be ignored
    }
  }
]
```

Run ```npm run coder```, the request function will be generated reserving an additional ```method``` parameter:

```js
/** Get all blog articles */
export const blogArticles = function (method, pathParams = {}, data = {}) {
  const {
    userId
  } = pathParams
  return axios({
    params: data,
    method,
    url: API_HOST + `/home/${userId}/blogArticles`
  })
}

// Usage
import { blogArticles } from '@/base/api/base-features'
blogArticles('get', { userId: '7008960' }, data)
```

## License

[MIT license](./LICENSE).
