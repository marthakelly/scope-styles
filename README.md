# scope-styles

`scope-styles` is a utility that converts inline style objects into scoped css, which can be either embedded into the page or extracted out. Works with Radium-compatibile inline style objects.

# usage

**styles.js**
```javascript
module.exports = styles;

var styles = {
  foo: {
    fontWeight: 'bold'
  },
  bar: {
    color: 'blue',
    fontSize: '15px',
    backgroundColor: '#fff',
    transition: 'width 500ms ease',
    ':after': {
      color: 'green',
      content: "''"
    },
    '@media (max-width: 600px)': {
      color: 'orange'
    }
  }
};
```

**component.js**
```javascript
var scopeStyles = require('scope-styles');
var insertCss = require('insert-css');
var styles = require('./styles');

var result = scopeStyles(styles);
var fooScoped = result.exports.foo;
var barScoped = result.exports.bar;
var css = result.css;

var div1 = document.createElement('div');
div1.className = fooScoped;
var div2 = document.createElement('div');
div2.className = barScoped;

// inject scoped css into page
insertCss(css);

// render
document.body.appendChild(div1);
document.body.appendChild(div2);

```

**rendered output**
```html
<html>
  <head>
    <style>
      .foo_4c06c {
        font-weight: bold
      }
      .bar_4c06c {
        color: blue;
        font-size: 15px;
        background-color: #fff;
        transition: width 500ms ease
      }
      .bar_4c06c:after {
        color: green;
        content: ''
      }
      @media (max-width: 600px) {
      .bar_4c06c {
        color: orange
      }
      }
    </style>
  </head>
  <body>
    <div class="foo_4c06c"></div>
    <div class="bar_4c06c"></div>
  </body>
</html>
```