# My notes on - 'Beginners guide to React'

⚠️ *Currently I'm still following the course, and with taking notes and all it's not going too fast! Keep an eye open for updates*

The more I use React, the more I want to find out what is actually happening under the hood. There is no shortage of React tutorials but most of them show you how to make something with React, but not how React does these things. Luckily there are some great resources available that do get to the core of things, one of which is the [‘Beginners guide to React’](https://egghead.io/courses/the-beginner-s-guide-to-reactjs) course from [Kent C. Dodds](https://twitter.com/kentcdodds) on egghead.io.

Besides the egghead.io course, I’ve watched [one of Kent’s talks](https://youtu.be/pugPxYH96TU) in which he covers much of the same grounds but goes a bit more in-depth at times.

During the course I also found the [React documentation](https://reactjs.org/docs/) to be really helpful, as the [React Enlightenment](https://www.reactenlightenment.com/) book which is available online for free and greatly compliments Kent's course.

At the bottom of this document you can find a list of resources I've been using throughout this course and underneath every chapter there's a list of resources about the chapter topic.

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