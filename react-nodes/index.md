# React Nodes

The core of React is based on its [Top-level API's](https://reactjs.org/docs/react-api.html). These are the API's that are globally available on `React` and are usable directly when you import React in your project.

## `createElement`

When you've worked with React beore you're probably familiair with JSX. JSX looks and behaves much like HTML, but in fact is a syntax over the `React.createElement` API.

`React.createElement` is sort of an equivalent to `document.createElement` in that it creates `nodes`. Instead of `DOM` nodes, it creates `React` nodes. This is what the API looks like:

```javascript
React.createElement(
    type,
    [props],
    [...children]
)
```

`createElement` takes in three arguments:

1. A type. This can be something like a `div` or a `span`, a React component type (a class or a function), or a React [fragment type](https://reactjs.org/docs/fragments.html).
1. A `props` object in which you can add attributes and children (single value or array)
1. Children or an array of children

Using a real-life example and appending it to the `DOM` with `react-dom`, it looks like this:

```javascript
const rootEl = document.querySelector('#root');
const el = React.createElement('div', {
    className: 'container',
    children: 'Hello World'
});
ReactDOM.render(el, RootEl);
```

In this example we see that `children` is declared in the `props` object, but it could also have been added as third argument.

React elements can be children of other React elements:

```javascript
const rootEl = document.querySelector('#root');
const childEl = React.createElement('span', {}, 'hey there');
const el = React.createElement('div', {
    className: 'container',
}, childEl);
ReactDOM.render(el, rootEl);
```

We nested `childEl` in `rootEl`, and if we would want to we could nest another element in `childEl`, and so on. We can create an entire DOM tree this way, but that would become annoying quickly. The deeper you nest your elements this way, the harder it is to keep track of what is happening. That's where the JSX Syntax comes in.

## Resources

- [React nodes - Reactenlightenment.com](https://www.reactenlightenment.com/react-nodes.html)
- [React API docs](https://reactjs.org/docs/react-api.html)
- [React API createElement docs](https://reactjs.org/docs/react-api.html#createelement)