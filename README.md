# VuePress Plugin Auto Nav Links

> Auto nav links plugin for VuePress 1.x

[![Build Status](https://img.shields.io/travis/webmasterish/vuepress-plugin-autonav/master.svg?style=flat-square)](https://travis-ci.org/webmasterish/vuepress-plugin-autonav)
[![npm version](https://img.shields.io/npm/v/vuepress-plugin-autonav.svg?style=flat-square)](http://npm.im/vuepress-plugin-autonav)
[![Greenkeeper badge](https://badges.greenkeeper.io/webmasterish/vuepress-plugin-autonav.svg?style=flat-square)](https://greenkeeper.io/)
[![MIT License](https://img.shields.io/npm/l/express.svg?style=flat-square)](http://opensource.org/licenses/MIT)


## What

Auto populates `themeConfig.nav` with top level pages if it's not already set.

Using a page `frontmatter` you can:

- Enable/disable adding a link to the navbar - a typical would be if you don't
  want to add the home page
- Page order


## Install


```sh
$ npm install -D vuepress-plugin-autonav

# or

$ yarn add -D vuepress-plugin-autonav
```


## Usage

Add `vuepress-plugin-autonav` in your site or theme config file.

> See [official docs on using a plugin](https://vuepress.vuejs.org/plugin/using-a-plugin.html)


```js
// .vuepress/config.js
// or
// .vuepress/theme/index.js

// set your global autonav options - override in page frontmatter `autonav`
const autonav_options = {
  enable: true
};

module.exports = {
  plugins: [
    [ 'autonav', autonav_options ]
  ]
}
```


### Page `frontmatter`


```md
---

title: Page Title

autonav:
  enable: true
  order: -1

---

```


## Reference

- VuePress official [plugin docs](https://vuepress.vuejs.org/plugin/)
- VuePress official [Navbar Links](https://vuepress.vuejs.org/theme/default-theme-config.html#navbar-links)
- VuePress official [Front Matter](https://vuepress.vuejs.org/guide/frontmatter.html)


## Related Plugins

- [VuePress Plugin Auto Meta](https://github.com/webmasterish/vuepress-plugin-autometa)
- [VuePress Plugin Minimal Google Analytics](https://github.com/webmasterish/vuepress-plugin-minimal-analytics)


## License

MIT © [webmasterish](https://webmasterish.com)
