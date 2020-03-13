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
        /* Customize themes, modify it in /config/modifyVars.theme.js */
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

Open the ```modifyVars.theme.js```, you can see the frequently-used variables in [Ant Design Vue](https://github.com/vueComponent/ant-design-vue).

Just modify them simply.

```js
// config/modifyVars.theme.js

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

> Please note that modifyVars.theme.js is a **js file**, not a less file!!!

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

## License

[MIT license](./LICENSE).
