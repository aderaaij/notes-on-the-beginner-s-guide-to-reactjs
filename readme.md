# My notes on - 'Beginners guide to React'

⚠️ *Currently I'm still following the course, and with taking notes and all it's not going too fast! Keep an eye open for updates*

## Introduction

The more I use React, the more I want to find out what is actually happening under the hood. There is no shortage of React tutorials but most of them show you how to make something with React, but not how React does these things. Luckily there are some great resources available, one of which is the [‘Beginners guide to React’](https://egghead.io/courses/the-beginner-s-guide-to-reactjs) course from [Kent C. Dodd](https://twitter.com/kentcdodds).

Besides the egghead.io course, I’ve watched [one of Kent’s talks](https://youtu.be/pugPxYH96TU) in which he covers pretty much the same stuff, at times a bit more in-depth.

During the course I also found the [React documentation](https://reactjs.org/docs/) to be really helpful, as [React Enlightenment](https://www.reactenlightenment.com/) which is available for free and greatly compliments Kent's course.

Resources:

* [The beginners guide to React](https://egghead.io/courses/the-beginner-s-guide-to-reactjs)
* [The introduction to React you've been missing](https://youtu.be/pugPxYH96TU)
* [React documentation](https://reactjs.org/docs/)
* [React Enlightenment](https://www.reactenlightenment.com/) 

## Base

The core of React is based on its [Top-level API's](https://reactjs.org/docs/react-api.html). These are the API's that are globally available on `React` and are usable directly when you import React in your project.

### `createElement`

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
const rootEl = document.querySelector('#root');
const childEl = React.createElement('span', {}, 'hey there');
const el = React.createElement('div', {
    className: 'container',
}, childEl);
ReactDOM.render(el, rootEl);
```

We nested `childEl` in `rootEl`, and if we would want to we could nest another element in `childEl`, and so on. We can create an entire DOM tree this way, but that would become annoying quickly. The deeper you nest your elements this way, the harder it is to keep track of what is happening. That's where the JSX Syntax comes in.

* [React API docs](https://reactjs.org/docs/react-api.html)
* [React API createElement docs](https://reactjs.org/docs/react-api.html#createelement)

### JSX

💡 Tip on working with JSX from Kent C. Dodds: When something in JSX doesn't seem to make sense, try and transpile it to JavaScript in your head, mostly it will make sense then. (Or use the [online Babel transpiler](https://babeljs.io/repl)).

JSX is a syntax layer over the API we just used. Thanks to JSX we can write our `React.createElement` in a way that seems a bit like HTML. We can nest elements which can be normal HTML elements or react components and give those elements attributes much like we would in HTML.

```jsx
const root = document.querySelector('#root');
const element = (
    <div className="container">
        <h1>What's crackin!!</h1>
    </div>
);
ReactDOM.render(element, root);
```

The JSX syntax is not part of the normal JavaScript standard, and needs [babel](https://babeljs.io/) for transpiling to normal JavaScript. Normally that is something that would be done while building the project / server side, but for demonstration purposes we import Babel directly into our project.

What is noticable in the example above is that we don't use the `class` attribute, but we use `className` instead. That's because [`class` is a reserved keyword.](http://www.ecma-international.org/ecma-262/5.1/#sec-7.6.1.2). There are a bunch of JSX specific names for attributes. For a good list on what you can use or not, check out the [React Enlightenment chapter on Defining JSX Attributes](https://www.reactenlightenment.com/react-jsx/5.7.html)

### Javascript in JSX

To use JavaScript within JSX, you need to make use of curly braces. *Within curly braces you can make use of [JavaScript Expressions](https://developer.mozilla.org/nl/docs/Web/JavaScript/Guide/Expressions_and_Operators) and other JS that returns something that JSX can render. This means making use of `arrow` functions and the logical `&&` operator. Complicated logic is best left out of the JSX itself and moved to an external function. [Read more about conditional rendering in JSX](https://reactjs.org/docs/conditional-rendering.html).

** *Is this actually true? What exactly can you use within those curly braces? Nothing that uses Curly Braces itself, right?*

You can use curly braces in the content, but also as an attribute value:

```javascript
const root = document.querySelector('#root');
const content = 'What\'s Crackin\'!!';
const elClassName = 'container';
const element = <div className={content}>{content}</div>;
ReactDOM.render(element, root);
```

This opens up a world of possibilities and makes JSX flexible and powerful. We could also define all the properties in an object for example:

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

But what if we want to change the text? In that case we can make our function take an argument. This could be a single argument, but let's use an object right away as we'll create a React component which needs an object after this.

```javascript
const message = (props) => <div>{props.msg}</div>;
const el = (
    <div className="container">
        {message({msg: 'Hello there'})}
        {message({msg: 'Goodbye dude'})}
    </div>
);
```

Functions don't always look too clear in JSX, but there's a solution for that. We can create a React component instead. That's something you'd do with JSX, but let's see how it looks with the `React.createElement` API first:

```javascript
const message = (props) => <div>{props.msg}</div>;
const el = (
    <div className="container">
        {React.createElement(message, {msg: 'Hello there'})}
        {React.createElement(message, {msg: 'Goodbye'})}
    </div>
);
```

To do this the JSX way we can use our message function as a component. To do this and let JSX differentiate between passing a string and a component, we need to capitalize our `message` variable.

```javascript
const Message = (props) => <div>{props.msg}</div>;
const el = (
    <div className="container">
        <Message msg="Hello world" />
        <Message msg="Goodbye world" />
    </div>
);
```

And that's it. We've created a React component. Notice that the object we pass as props to our message function now looks like a HTML attribute and value. We can re-use the `Message` component as much as we want now. 

Notice that if the property is actually going to be the content of an element, you can use the `childrens` property:

```javascript
const Message = (props) => <div>{props.children}</div>;
const el = (
    <div className="container">
        <Message>Hello world</Message>
        <Message>Goodbye World</Message>
    </div>
);
```

The `children` property will pass anything you add between an opening and closing component tag. This allows us to nest components and sort of treat our structure like we would in HTML.

#### Summary

* To create a reusable component you need to make a function that starts with a capital letter
* This function takes in an object as argument, which you can use in whatever the function returns
* You can use the React elements your function returns as you would use a `div`, `span` or anything else you'd use in JSX
* You can create a component by creating a Javascript function that returns JSX, you can also extend the default React components giving extra options.

* [React docs - Components and props](https://reactjs.org/docs/components-and-props.html)
* [React enlightenment - Basic React Components](https://www.reactenlightenment.com/basic-react-components.html)

* *Is children always available?*

### Prop validation

In the following example, we create a `Greetings` component which will return a first name and a last name, IF they're filled in: 

```javascript
const rootEl = document.querySelector('#root');
const Greeting = props => <div>Hello {props.firstName} {props.lastName}!</div>
ReactDOM.render(<Greeting/>, rootEl);
```

We haven't added any properties to the component so it just renders `Hello !`, which is not what we want. To make sure a value is present and is of the right type, React has a `prop-types` function you can and should use in your project:

```javascript
const rootEl = document.querySelector('#root');
const Greeting = props => <div>Hello {props.firstName} {props.lastName}!</div>

 Greeting.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string
}
ReactDOM.render(<Greeting/>, rootEl);
```

Here we define what type of value our `props` should be and if they are required or not. `ReactDOM.render(<Greeting lastName={false} />, rootEl);` would log two errors. One because `firstName` is missing while it's required in the validation, and a second because we pass a `boolean` value type instead of a `string`.

When we'd use an actual `React` class component, we would use the proptypes as `static` type inside the function call. 

```javascript
const rootEl = document.querySelector('#root');
class Greeting extends React.Component {
    static propTypes = {
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string
    }
    render() {
        const { firstName, lastName } = this.props;
        return(
            <div>Hello {firstName} {lastName}!</div>
        )
    }
}
ReactDOM.render(<Greeting lastName={false} />, rootEl);
```

For all intents and purposes, the last two examples would render the exact same thing, the difference being that we've got access to some React lifecycle goodness which we'll explore more further on. 

Note that when we switch out our development version of `React` and `ReactDOM` to production versions, the errors will be gone. This is because `propType` validation does take up resources and you don't want any errorr showing in your live application.

## Resources

### Documentation

* [React Enlightenment](https://www.reactenlightenment.com/) - An amazing in-depth resource for enlightening you in React.
* [React docs](https://reactjs.org/docs/hello-world.html) - Official React documentation
* [React docs - Top level api](https://reactjs.org/docs/react-api.html) - Explenation of the Top Level API

### Tools

* [Babel Repl - onine transpiling](https://babeljs.io/repl/)
* [Unpkg.com](https://unpkg.com/)



## Some other notes

Components:

Creating a stateless component: Create a function that returns a JSX element, and optionally takes in `props`.
`convarst MyComponent = React.createClass` and `class MyComponent extends React.Component` are the same. The first one is `es5` syntax, the latter is `es6`. I'm completely commited to the `es6` syntax but if you want to explore the differences, [Todd Moto did a write-up on `createClass` vs `extends React.Component`](https://toddmotto.com/react-create-class-versus-component/) that is worth exploring.
[Stackoverflow - React.createClass vs extends Component]https://stackoverflow.com/questions/33526493/react-createclass-vs-extends-component