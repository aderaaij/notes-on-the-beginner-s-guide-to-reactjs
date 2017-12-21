# My notes on - 'Beginners guide to React'

*Currently I'm still following the course, and with taking notes and all it's not going too fast! Keep an eye open for updates*

The more I use React, the more I want to find out what is actually happening under the hood. There is no shortage of React tutorials but most of them show you how to make something with React, not how React itself does these things. Luckily there are some great resources available, one of which is the ‘Beginners guide to React’ course from Kent C. Dodd on Egghead.io. 

Besides the egghead.io course, I’ve watched [one of Kent’s talks](https://youtu.be/pugPxYH96TU) in which he covers pretty much the same stuff, at times a bit more in-depth. 

During the following course I also found the [React documentation](https://reactjs.org/docs/) to be really helpful, as [React Enlightenment](https://www.reactenlightenment.com/) which is a great, free book which leaves no stone unturned. 

* [The beginners guide to React](https://egghead.io/courses/the-beginner-s-guide-to-reactjs)
* [The introduction to React you've been missing](https://youtu.be/pugPxYH96TU)

## Base

The base of React are its [Top-level API's](https://reactjs.org/docs/react-api.html). These are the API's that are globally available on `React` and are usable directly when you import React in your project.

## `createElement`

`React.createElement` is sort of an equivalent to `document.createElement` in that it creates `nodes`. Instead of `DOM` nodes, it creates `React` nodes. This is what the API looks like:

```javascript
React.createElement(
    type,
    [props],
    [...children]
)
```

`createElement` takes in three arguments:

1. A type. This can be something like a `div` or a `span`, a React component type (a class or a function), or a React fragment type.
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
const childEl = React.createElement('span', {}, 'hey there');
const rootEl = document.querySelector('#root');
const el = React.createElement('div', {
    className: 'container',
}, childEl);
ReactDOM.render(el, rootEl);
```

We nested `childEl` in `rootEl`, and if we would want to we could nest another element in `childEl`, and so on. We can create an entire DOM tree this way, but that would become very annoying quickly. The deeper you nest your elements this way, the harder it is to keep track of what is happening. That's where the JSX Syntax comes in.

* [React API docs](https://reactjs.org/docs/react-api.html)
* [React API createElement docs](https://reactjs.org/docs/react-api.html#createelement)

## JSX

💡 Tip on working with JSX from Kent C. Dodds: When something in JSX doesn't seem to make sense, try and transpile it to JavaScript in your head, mostly it will make sense then. (Or use the [online Babel transpiler](https://babeljs.io/repl)).

JSX is a syntax layer over the API we just used. Thanks to JSX we can write our 

* JSX needs babel to work
* JSX looks like HTML but is not HTML
* `class` is a reserved name in JavaScript, that's why we use `className`. There's a whole bunch of `JSX` specific syntax for attributes like this. Find them all on the [React enlightment](https://www.reactenlightenment.com/react-jsx/5.7.html) page and on the React

```jsx
const root = document.querySelector('#root');
const element = (
    <div className="container">
        <h1>What's crackin!!</h1>
    </div>
);
ReactDOM.render(element, root);
```

An example of a JSX component. Note that we don't have to escape our characters within the `div` like we would have to do if we would define this string in JavaScript.

### Javascript in JSX

To use JavaScript within JSX, you need to make use of curly braces. *Within curly braces you can make use of [JavaScript Expressions](https://developer.mozilla.org/nl/docs/Web/JavaScript/Guide/Expressions_and_Operators) and other JS that returns something that JSX can render. . This means making use of `arrow` functions and the logical `&&` operator. Complicated logic is best left out of the JSX itself and moved to an external function. [Read more about conditional rendering in JSX](https://reactjs.org/docs/conditional-rendering.html).

** *Is this actually true? What exactly can you use within those curly braces? Nothing that uses Curly Braces itself, right?*

You can use curly braces in the content, but also as an attribute value:

```javascript
const root = document.querySelector('#root');
const content = 'What\'s Crackin\'!!';
const elClassName = 'container';
const element = <div className={content}>{content}</div>;
ReactDOM.render(element, root);
```

This opens up a world of possibilities and makes JSX flexible and powerful. For example, we can also do this:

```javascript
const root = document.querySelector('#root');
const props = {
    className: 'container',
    children: 'What\'s going on?'
}
const element = <div {...objProps}/>;
ReactDOM.render(element, root);
```

Here we define both `className` and children in the `props` object and `spread` it inside the `JSX` div.

Properties will be read in order. When you define a property twice, the last one will be used. This can be useful for overriding a property that came from an object:

```javascript
const element = <div {...objProps} className='winsBecauseLast' />;
```

In this case, `winsBecauseLast` will be set as class name as it's last. The same goes for the `children` property. If you'd change the element to either `<div {...objProps}>This will be displayed</div>` or `<div {...objProps} children="This will be displayed"/>`, the `children` property from the `props` object would be overridden.

* [React Enlightment - JSX ](https://www.reactenlightenment.com/react-jsx/5.7.html)
* [React Docs - Dom elements](https://reactjs.org/docs/dom-elements.html)
* [React Docs, conditional rendering](https://reactjs.org/docs/conditional-rendering.html)

### Creating a React component

In React, components are used to prevent you from repeating yourself or separating your code into different functions. 
Here we've got a JSX example where we've got two elements inside of a main element. (tip, to return a multi-line and indented variable, wrap it in parentheses)

```javascript
const el = (
    <div className="container">
        <div>Hello World</div>
        <div>Hello World</div>
    </div>
);
```

If we make it a little bit more programmatic, we can make a variable with JSX and call that in our `el`.

```javascript
const helloWorld = <div>Hello World</div>;
const el = (
    <div className="container">
        {helloWorld}
        {helloWorld}
    </div>
);
```

But what if we want to change the text? In that case we can make our function take an argument

```javascript
const helloWorld = (value) => <div>{value}</div>;
const el = (
    <div className="container">
        {helloWorld('Hello there')}
        {helloWorld('Goodbye')}
    </div>
);
```

## Resources

### Documentation

* [React Enlightenment](https://www.reactenlightenment.com/) - An amazing in-depth resource for enlightening you in React.
* [React docs](https://reactjs.org/docs/hello-world.html) - Official React documentation
* [React docs - Top level api](https://reactjs.org/docs/react-api.html) - Explenation of the Top Level API

### Tools

* [Babel Repl - onine transpiling](https://babeljs.io/repl/)
* [Unpkg.com](https://unpkg.com/)
