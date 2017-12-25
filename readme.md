# My notes on - 'Beginners guide to React'

⚠️ *Currently I'm still following the course, and with taking notes and all it's not going too fast! Keep an eye open for updates*

The more I use React, the more I want to find out what is actually happening under the hood. There is no shortage of React tutorials but most of them show you how to make something with React, but not how React does these things. Luckily there are some great resources available that do get to the core of things, one of which is the [‘Beginners guide to React’](https://egghead.io/courses/the-beginner-s-guide-to-reactjs) course from [Kent C. Dodds](https://twitter.com/kentcdodds) on egghead.io.

Besides the egghead.io course, I’ve watched [one of Kent’s talks](https://youtu.be/pugPxYH96TU) in which he covers much of the same grounds but goes a bit more in-depth at times.

During the course I also found the [React documentation](https://reactjs.org/docs/) to be really helpful, as the [React Enlightenment](https://www.reactenlightenment.com/) book which is available online for free and greatly compliments Kent's course.

At the bottom of this document you can find a list of resources I've been using throughout this course and underneath every chapter there's a list of resources about the chapter topic.


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