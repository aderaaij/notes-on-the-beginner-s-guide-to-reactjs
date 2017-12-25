# My notes on - 'Beginners guide to React'

⚠️ *Currently I'm still following the course, and with taking notes and all it's not going too fast! Keep an eye open for updates*

## Table of contents

- [My notes on - 'Beginners guide to React'](#my-notes-on---beginners-guide-to-react)
    - [Table of contents](#table-of-contents)
    - [Introduction](#introduction)
    - [Base](#base)
        - [JSX](#jsx)
            - [Javascript in JSX](#javascript-in-jsx)
            - [Conditionally rendering JSX](#conditionally-rendering-jsx)
            - [Resources - JSX](#resources---jsx)
        - [Creating a React component](#creating-a-react-component)
            - [Summary](#summary)
            - [Resources - Creating React components](#resources---creating-react-components)
        - [Prop validation](#prop-validation)
            - [Resources - PropTypes](#resources---proptypes)
        - [Application Rendering](#application-rendering)
        - [Styling React Components (The basics)](#styling-react-components-the-basics)
        - [Event Handlers](#event-handlers)
            - [Resources event handling](#resources-event-handling)
    - [Resources](#resources)
        - [Video's](#videos)
        - [Documentation](#documentation)
        - [Articles](#articles)
        - [Overviews](#overviews)
        - [Tools](#tools)
        - [ES6](#es6)
    - [Some other notes](#some-other-notes)
        - [Components](#components)
        - [Key take aways](#key-take-aways)

## Introduction

The more I use React, the more I want to find out what is actually happening under the hood. There is no shortage of React tutorials but most of them show you how to make something with React, but not how React does these things. Luckily there are some great resources available that do get to the core of things, one of which is the [‘Beginners guide to React’](https://egghead.io/courses/the-beginner-s-guide-to-reactjs) course from [Kent C. Dodds](https://twitter.com/kentcdodds) on egghead.io.

Besides the egghead.io course, I’ve watched [one of Kent’s talks](https://youtu.be/pugPxYH96TU) in which he covers much of the same grounds but goes a bit more in-depth at times.

During the course I also found the [React documentation](https://reactjs.org/docs/) to be really helpful, as the [React Enlightenment](https://www.reactenlightenment.com/) book which is available online for free and greatly compliments Kent's course.

At the bottom of this document you can find a list of resources I've been using throughout this course and underneath every chapter there's a list of resources about the chapter topic.

## Base

### JSX

💡 *Tip on working with JSX from Kent C. Dodds: When something in JSX doesn't seem to make sense, try and transpile it to JavaScript in your head, mostly it will make sense then. (Or use the [online Babel transpiler](https://babeljs.io/repl)).*

JSX is a syntax layer over the `React.createElement` API we just explored. Thanks to JSX we can write `React.createElement` in a way that resembles HTML. We can nest elements, which can be normal HTML elements or react components, and give those elements attributes much like we would in HTML.

```jsx
const root = document.querySelector('#root');
const element = (
    <div className="container">
        <h1>What's crackin!!</h1>
    </div>
);
ReactDOM.render(element, root);
```

What is noticable in the example above is that we don't use the `class` attribute, but we use `className` instead. That's because [`class` is a reserved keyword.](http://www.ecma-international.org/ecma-262/5.1/#sec-7.6.1.2). There are a bunch of JSX specific names for attributes. For a good list on what you can use or not, check out the [React Enlightenment chapter on Defining JSX Attributes](https://www.reactenlightenment.com/react-jsx/5.7.html)

The JSX syntax is not part of the JavaScript standard and needs [babel](https://babeljs.io/) for transpiling to standard JavaScript. Normally that is something that would be done while building the project / server side, but for demonstration purposes we import Babel directly into our project.

#### Javascript in JSX

To use JavaScript within JSX, you need to make use of curly braces. *Within curly braces you can make use of [JavaScript Expressions](https://developer.mozilla.org/nl/docs/Web/JavaScript/Guide/Expressions_and_Operators) and other JS that returns something that JSX can render. This means making use of `arrow` functions and the logical `&&` operator. Complicated logic is best left out of the JSX itself and moved to an external function. [Read more about conditional rendering in JSX](https://reactjs.org/docs/conditional-rendering.html).

❓ *Is this actually true? What exactly can you use within those curly braces? Nothing that uses Curly Braces itself, right?*

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
const element = <div {...props}/>;
ReactDOM.render(element, root);
```

Here we define both `className` and `children` in the `props` object and `spread` it inside the `JSX` div.

Properties will be read in order. When you define a property twice, the last one will be used. This can be useful for overriding a property that came from an object:

```javascript
const element = <div {...objProps} className='winsBecauseLast' />;
```

In this case `winsBecauseLast` will be set as class name as it's last.

When using `children` as an attribute you should keep in mind that anything between an opening and closing `JSX` tag will override this. When you transpile `JSX` to JS you'll see that is because child content gets passed as the third argument in the `React.createElement` API.

```javascript
// Original
const root = document.querySelector('#root');
const props = {
    className: 'container',
    children: 'What\'s going on?' // Here we declare a child element
}
// But here we also declare a child element: The string inside the div. Who wins?
const element = <div {...props}>Test</div>;
ReactDOM.render(element, root);

// Transpiled
var root = document.querySelector('#root');
var props = {
    className: 'container',
    children: 'What\'s going on?'
};
var element = React.createElement(
    'div',
    props,
    'Test'
    // The output will be `div` with the content 'test', as this last argument and
    // will override `props.children`
);
ReactDOM.render(element, root);
```

#### Conditionally rendering JSX

By now we've seen that JSX is 'just syntatical sugar' which gets converted to real JavaScript ([paraphrased from reactenligtenment.com](https://www.reactenlightenment.com/react-jsx/5.4.html)) and we've also used some JavaScript variables and objects within JSX by using `{ }`.

But what if we want to conditionally render some JSX based on if there are props or not? We've already used a `function` call to output JSX, so we can easily put some logic into a function:

```javascript
const rootEl = document.querySelector('#root');
const message = (msg) => {
    if (msg) {
        return <div>{msg}</div>
    } else {
        return <div>Nothing to tell</div>
    }
}
const Greeting = ({ msg }) => (
    <div>{message(msg)}</div>
)
ReactDOM.render(<Greeting msg="Hi theeeeere"/>, rootEl);
```

This removes your logic outside of your JSX which is a great way of working and keeping your code clear. But at times you might want to use some logic within your JSX too. As you can't use any new curly brackets within JSX except for when you escape them in a string, you can make use of ternary operators and other logical expressions:

```javascript
const rootEl = document.querySelector('#root');
const Greeting = ({ msg }) => (
    <div>{msg
        ? <div>{msg}</div>
        : <div>Nothing to tell</div>
    }</div>
)
ReactDOM.render(<Greeting msg="Hi theeeeere"/>, rootEl);
```

This does exactly the same as the first example, but instead the logic is contained inline with the JSX of the component by using ternary operators.

When you only need to check if a value is true or false, you could also use an inline `if` statement with the logical `&&` operator:

```javascript
const rootEl = document.querySelector('#root');
const Greeting = ({ msg }) => (
    <div>{msg &&
        <div>{msg}</div>
    }</div>
)
ReactDOM.render(<Greeting msg="Hi theeeeere"/>, rootEl);
```

In this case we don't print anything to the screen if `msg` is empty.

#### Resources - JSX

- [React Enlightment - JSX](https://www.reactenlightenment.com/react-jsx/5.7.html)
- [React Docs - Dom elements](https://reactjs.org/docs/dom-elements.html)
- [React Docs - conditional rendering](https://reactjs.org/docs/conditional-rendering.html)

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

- To create a reusable component you need to make a function that starts with a capital letter
- This function takes in an object as argument, which you can use in whatever the function returns
- You can use the React elements your function returns as you would use a `div`, `span` or anything else you'd use in JSX
- You can create a component by creating a Javascript function that returns JSX, you can also extend the default React components giving extra options.

#### Resources - Creating React components

- [React docs - Components and props](https://reactjs.org/docs/components-and-props.html)
- [React enlightenment - Basic React Components](https://www.reactenlightenment.com/basic-react-components.html)

❓*Is children always available?*

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

For all intents and purposes, the last two examples would render the exact same thing, the difference being that in the latter we've got access to some React lifecycle goodness which we'll explore more further on.

Note that when we switch out our development version of `React` and `ReactDOM` to production versions, the errors will be gone. This is because `propType` validation does take up resources and you don't want any errorr showing in your live application.

#### Resources - PropTypes

- [React Docs - typechecking-with-proptypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
- [Reactenlightenment.com - Validating component Props](https://www.reactenlightenment.com/react-props/7.6.html)
- [PropTypes NPM package](https://www.npmjs.com/package/prop-types)

### Application Rendering

When we're creating our React elements with JSX, we're building up a virtual DOM which we could see as a ['local and simplified copy of the HTML DOM'](http://reactkungfu.com/2015/10/the-difference-between-virtual-dom-and-dom/). I won't go into too much detail about the virtual dom yet, but just know we're not actually rendering it to the page untill we call `ReactDOM.render`.

```javascript
const rootEl = document.querySelector('#root');
const time = new Date().toLocaleTimeString();
const element = <div> It's {time}</div>
ReactDOM.render(element, rootEl);
```

The above example is a simple clock. When we render the clock and refresh the browser window, we'll see the seconds updating.

When we re-render the entire app with `setInterval` you can see the clock changes without a browser window refresh.

```javascript
const rootEl = document.querySelector('#root');
function tick() {
    const time = new Date().toLocaleTimeString();
    const element = <div> It's {time}</div>
    ReactDOM.render(element, rootEl);
}
setInterval(tick, 1000);
```

When we change the div to an `input` element with `time` as a value and `focus` on the `input` element, we'll see that `focus` remains even after updating the app.

```javascript
const rootEl = document.querySelector('#root');
function tick() {
    const time = new Date().toLocaleTimeString();
    const element = (<div>
        <input value={time} />
        <input value={time} />
    </div>
    )
    ReactDOM.render(element, rootEl);
}
setInterval(tick, 1000);
```

The `focus` remains on the selected element because React keeps track of it. React also keeps track of the actual changes within our app so even though we call `ReactDOM.render` every second, it will not refresh every `element` inside, just the `time` value.

### Styling React Components (The basics)

⚠️ *This part will include a bit of CSS you can find in the [Style React Components lesson](https://egghead.io/lessons/react-style-react-components) from the egghead course.*

One of the most basic ways to style React components is with inline CSS. JSX elements can take a `style` attribute which takes in an object:

```javascript
const rootEl = document.querySelector('#root');
const App = () => (
    <div>
        <div className='box box--small' style={{paddingLeft: 20}}>box</div>
    </div>
)
ReactDOM.render(<App />, rootEl)
```

There are a few remarkable things going on here:

- The `style` property is wrapped in two sets of curly braces, one to interpolate JavaScript and the second to define the object.
- The CSS property key is camelCased so we don't have to escape `-`. The regular CSS property key would be `padding-left`.
- We haven't added a unit to our value. When no unit is added, `px` will be asumed.
- I also went ahead and added a `className`. [`className` is used instead of `class` for several reasons](https://goo.gl/JwQzsY)

One of the nice things about having `style` as an `object` is the possibility to include your styling in the `props` object.

```javascript
const className = "box box--small"
const props = {
    className,
    style: {padding: 20}
}
const App = () => (
    <div>
        <div {...props}>
            box
        </div>
    </div>
)
```

Notice that we use the `className` shorthand in the object. When the property key and value are the same, you don't need to write them out.

The next thing we'll do is make a reusable `Box` component.

```javascript
const Box = (props) => (
    <div
        className="box box--small"
        style={{padding: 20}}
        {...props}
    >
    </div>
)
const App = () => (
    <div>
        <Box>Small Box</Box>
        <Box>Small Box</Box>
        <Box>Small Box</Box>
    </div>
)
```

In this example we have a functional `Box` component that takes in `props`. By default the containing `div` has a `className` and a `style` property. All the other properties we assign to `Box` when we use the component in the `App` we can spread out.

Now we've got three boxes which share some values, but we'd also like to style them differently. So what happens when you add a property like `style={{backgroundColor: 'blue}}` to a box?

I'll tell you because I'm too lazy to make screenshots at the moment: You will lose your padding! Equally, when we'd use `{...props}` before defininig `style` and `className` we would lose the `backgroundColor` we just set. This is because the value in `style` is an entire object, which will be completely replaced by the `style` object from our `props` (or the other way around, depending on the order). This is called a `shallow merge`. When spreading the properties, the only thing looked at are the top-level keys and values.

This is more of an `ES6` lesson than a `React` lesson, but we can fix this by destructuring part of our props in our function argument.

```javascript
const Box = ({style, ...rest}) => (
    <div
        className="box box--small"
        style={{padding: 20, ...style}}
        {...rest}
    >
    </div>
);
const App = () => (
    <div>
        <Box style={{backgroundColor: 'green'}}>Small Box</Box>
        <Box>Small Box</Box>
        <Box>Small Box</Box>
    </div>
);
```

In this case we're doing two shallow merges. First we destructure `style` from our `props` and put the rest into a `rest` variable with the `...` operator. Next up we change `...props` to `...rest` which now means "add anything that we haven't destructured". In the style object we merge `style` by doing another shallow merge. Now the entire `style` object isn't replaced, we just add values.

Let's do the same thing for our classnames. When we just add a `className` property to our `Box` element, this will overwrite the default `className`, which isn't what we wanted. We want to add a `className` to the default one to make our box a specific size we already defined in our CSS. In this case we will also have to destructure the `className` property out of our `props` object:

```javascript
const Box = ({style, className, ...rest}) => (
    <div
        className={`box ${className}`}
        style={{padding: 20, ...style}}
        {...rest}
    >
    </div>
);
const App = () => (
    <div>
        <Box className="box--small" style={{backgroundColor: 'green'}}>Small Box</Box>
        <Box>Small Box</Box>
        <Box>Small Box</Box>
    </div>
);
```

This works. Although when you don't use a `className` property, our classes would render like `class="box undefined"`. To solve this we can assign a default value of nothing *while* we're destructuring our props:

```javascript
const Box = ({style, className = '', ...rest}) => (//...etc
```

Now we're able to render a bunch of boxes with eah a different color and size:

```javascript
const Box = ({style, className = '', ...rest}) => (
    <div
        className={`box ${className}`}
        style={{padding: 20, ...style}}
        {...rest}
    >
    </div>
);
const App = () => (
    <div>
        <Box className="box--small" style={{backgroundColor: 'green'}}>Small Box</Box>
        <Box className="box--medium" style={{backgroundColor: 'tomato'}}>Small Box</Box>
        <Box className="box--large" style={{backgroundColor: 'rebeccapurple'}}>Small Box</Box>
    </div>
);
```

A concern in this case could be that the composer of these elements needs to know the CSS classnames. It would be better if the author could just define a size like `small`, `medium` or `large`. That's why we could replace `className` with a `size` property that takes in a string:

```javascript
const Box = ({style, size, ...rest}) => {
    const className = size ? `box box--${size}` : 'box';
    return (
        <div
        className={className}
        style={{padding: 20, ...style}}
        {...rest}
        />
    )
};
const App = () => (
    <div>
        <Box size="small" style={{backgroundColor: 'green'}}>Small Box</Box>
        <Box size="medium" style={{backgroundColor: 'tomato'}}>Small Box</Box>
        <Box size="large" style={{backgroundColor: 'rebeccapurple'}}>Small Box</Box>
    </div>
);
```

In this example we destructure `size` instead of `className`.

- [Use inline CSS in JSX - Reactenlightenment.com](https://www.reactenlightenment.com/react-jsx/5.6.html)

### Event Handlers

Event handling with React elements resembles event handling with DOM elements but with some differences in syntax. There are a whole bunch of [supported events](https://reactjs.org/docs/events.html#supported-events) available. You'd normally add an eventhandler to a JSX element like this:

```javascript
    <input onChange={function} />
    <button onClick={function}>Click</button>
```

Every event you pass is wrapped in a `SyntheticEvent`, a React wrapper around the browsers native event. It works the same as the native events except that the bevaviour is similair across browsers. React also takes care of event delegation for events that bubble, meaning they're collected into a single event handler.

#### Resources event handling

- [Use event handlers with React - The beginners guide to React](https://egghead.io/lessons/egghead-use-event-handlers-with-react)
- [Defining React Node events - Reactenlightenment.com](https://www.reactenlightenment.com/react-nodes/4.7.html)
- [Defining events in JSX - Reactenlightenment.com](https://www.reactenlightenment.com/react-jsx/5.8.html)
- [Supported events - React Docs](https://reactjs.org/docs/events.html#supported-events)
- [`SyntheticEvent` - React Docs](https://reactjs.org/docs/events.html)

## Resources

### Video's

- [The introduction to React you've been missing - Workshop by Kent C. Dodds](https://youtu.be/pugPxYH96TU)
- [The beginners guide to React by Kent C. Dodds](https://egghead.io/courses/the-beginner-s-guide-to-reactjs)
- [React documentation](https://reactjs.org/docs/)
- [React Enlightenment](https://www.reactenlightenment.com/)

### Documentation

- [React Enlightenment](https://www.reactenlightenment.com/) - An amazing in-depth resource for enlightening you in React.
- [React docs](https://reactjs.org/docs/hello-world.html) - Official React documentation
- [React docs - Top level api](https://reactjs.org/docs/react-api.html) - Explenation of the Top Level API

### Articles

- [React stateless functional components - nine wins you might have overlooked](https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc)
- [Why Arrow Functions and bind in React’s Render are Problematic](https://medium.freecodecamp.org/why-arrow-functions-and-bind-in-reacts-render-are-problematic-f1c08b060e36)
- [React Binding Patterns: 5 Approaches for Handling `this`](https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56)
- [How to use Classes and sleep at night - Dan Abramov](https://medium.com/@dan_abramov/how-to-use-classes-and-sleep-at-night-9af8de78ccb4)
- [You might not need Redux - Dan Abramov](https://medium.com/@dan_abramov/how-to-use-classes-and-sleep-at-night-9af8de78ccb4)
- [Sebastian Markbage: Minimal API Surface Area (JSConf 2014)](https://www.youtube.com/watch?v=4anAwXYqLG8&feature=youtu.be&t=21m33s)
- [React beginner's question Thread by Dan Abramov](https://dev.to/dan_abramov/react-beginner-question-thread--1i5e/)
- [Binding with Class properties - Dan Abramov commend on dev.to](https://dev.to/dan_abramov/comment/1n2d)

### Overviews

- [React / Redux links](https://github.com/markerikson/react-redux-links)
- [React component patterns](https://github.com/markerikson/react-redux-links)
- [React component composition](https://github.com/markerikson/react-redux-links)
- [React architecture](https://github.com/markerikson/react-redux-links)
- [React courses overview](https://reactjs.org/community/courses.html)

### Tools

- [Babel Repl - onine transpiling](https://babeljs.io/repl/)
- [Unpkg.com](https://unpkg.com/)

### ES6

- [Implicit returns - Stackoverflow](https://stackoverflow.com/a/28889451)

## Some other notes

### Components

Creating a stateless component: Create a function that returns a JSX element, and optionally takes in `props`.
`convarst MyComponent = React.createClass` and `class MyComponent extends React.Component` are the same. The first one is `es5` syntax, the latter is `es6`. I'm completely commited to the `es6` syntax but if you want to explore the differences, [Todd Moto did a write-up on `createClass` vs `extends React.Component`](https://toddmotto.com/react-create-class-versus-component/) that is worth exploring.
[Stackoverflow - React.createClass vs extends Component](https://stackoverflow.com/questions/33526493/react-createclass-vs-extends-component)

### Key take aways

- JSX is a readable syntax on top of the  `React.createElement` API. The more you realise that this is the case, the better you will understand what is happening.
- The `...` spread operator is really f-in usefull. The content of a JSX element is in the `children` prop so you can always define a few default values in your component and spread other values, including `children`, into them.