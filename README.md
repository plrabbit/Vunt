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

Open the ```theme.config.js```, you can see the frequently-used variables of Ant Design Vue.

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

All less variables could be found in [Default Variables](https://github.com/vueComponent/ant-design-vue/blob/master/components/style/themes/default.less)

> Please note that theme.config.js is a **js file**, not a less file!!!

#### Global styles

It is highly recommended that using ```variables.less``` in ```src/style``` to manage public styles of your modules.

### API Management

> Vunt offers a script calls ```coder``` to generate APIs, including API request functions(with axios), mixins for Vue components. Also, RESTful APIs is supported.

#### Generating APIs

Before running ```npm run coder```, we need to set up the API schemas in ```code/api-schemas```.

First, creat a new JS file in ```code/api-schemas``` named with a module name, such as ```base-features.js```(which includes interface like login or logout).

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
  const config = {
    params: data, // will generate data attr when method POST/PUT/PATCH
    method: 'get',
    url: API_HOST + '/home/blogArticles'
  }
  return axios(config)
}
```

Import function(s) into your components! The filename is same to the name of api-schemas file that you created.

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

P.S. Using mixins may cause problem with same function name in different schemas. Vunt will offer a way with ```Vuex``` instead in the future.

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
  const config = {
    params: data,
    method: 'get',
    url: API_HOST + `/home/${userId}/blogArticles`
  }
  return axios(config)
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
    desc: 'API for blog articles',
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
export const getArticles = function (method, pathParams = {}, data = {}) {
  const {
    userId
  } = pathParams
  if (!validateMethod(method)) throw new Error('Invalid method parameter!')
  let config = {
    method,
    url: API_HOST + `/home/${userId}/blogArticles`
  }
  config = injectData(config, data) // inject params/data attr according to the method
  return axios(config)
}

// Usage
import { blogArticles } from '@/base/api/base-features'
blogArticles('get', { userId: '7008960' }, data)
```

#### Different host (Update 11/16/2020):

You may add a string in index 0 of the schema array, like this:
```js
module.exports = [
  'OTHER_HOST',
  {
    // ...
  }
]
```

Then add this host to ```public/config.js``` and ```src/config.js```.
```js
// public/config.js
(function (global) {
  global.__config__ = {
    // Public API Addr. DO NOT rename it.
    API_HOST: 'http://127.0.0.1:8088',
    OTHER_HOST: 'http://127.0.0.1:8089' // Your host
    // ...
  }
})(window)

// src/config.js
export const OTHER_HOST = staticConfig.OTHER_HOST || 'http://127.0.0.1:8000'
```


### Cancelling request

> Vunt offers two global functions for cancelling request, you can use them directly in your Vue components.

Here is an example:

```js
// Some request(using mixins)
this.$api.getArticles('GET', {
  m: 'article',
  a: 'list'
})

// Cancel single request
this.$cancelRequest('GET', this.$api.getArticles) // ('<method>', '<request-function>')
// Of course, you can pass an url instead
this.$cancelRequest('GET', 'http://127.0.0.1:8080/v1/articles')

// Cancel all request in one time
this.$cancelAllRequest()
```

> Please note that passing a function can only work for functions generated from ```coder``` script. If you want to cancel other request function, you may pass an url instead.

### Webpack Configuration

> The ```configureWebpack``` and ```chainWebpack``` attr are separated from vue.config.js, the main thought is to distinguish webpack from other configurations.

You can find ```configureWebpack``` and ```chainWebpack``` in ```vue.webpack.config.js```

### Components

#### Exception Pages(403, 404, 500)

You can find the component in ```src/components/Basic/Exception```. All you have to do is only import it and pass ```type``` prop(String) with 403, 404 or 500, like this:

```vue
<template>
  <exception-page type="404" />
</template>

<script>
import ExceptionPage from '@/components/Basic/Exception'

export default {
  components: {
    ExceptionPage
  }
}
</script>
```

> Besides, you may configure the display text in ```src/components/Basic/Exception/en_US.js```

## License

[MIT license](./LICENSE).
