# My notes on - 'Beginners guide to React'

⚠️ *Currently I'm still following the course, and with taking notes and all it's not going too fast! Keep an eye open for updates*

The more I use React, the more I want to find out what is actually happening under the hood. There is no shortage of React tutorials but most of them show you how to make something with React, but not how React does these things. Luckily there are some great resources available that do get to the core of things, one of which is the [‘Beginners guide to React’](https://egghead.io/courses/the-beginner-s-guide-to-reactjs) course from [Kent C. Dodds](https://twitter.com/kentcdodds) on egghead.io.

Besides the egghead.io course, I’ve watched [one of Kent’s talks](https://youtu.be/pugPxYH96TU) in which he covers much of the same grounds but goes a bit more in-depth at times.

During the course I also found the [React documentation](https://reactjs.org/docs/) to be really helpful, as the [React Enlightenment](https://www.reactenlightenment.com/) book which is available online for free and greatly compliments Kent's course.

At the bottom of this document you can find a list of resources I've been using throughout this course and underneath every chapter there's a list of resources about the chapter topic.

## Table of contents

1. [React Nodes](/react-nodes.md)
1. [JSX](/react-jsx.md)
1. React Components
    1. [Components - Creating a React component](/react-components-creating-a-component.md)
    1. [Components - An introduction to prop validation](/react-components-proptype-validation.md)
1. [Styling React components](/react-components-styling.md)
1. [React events](react-events.md)
1. [Rendering - An introduction to React rendering](react-rendering-introduction.md)
1. [Using `state`](react-rendering-introduction.md)
1. [Resources - A list of useful articles and tutorials](react-useful-resources-articles-tutorials.md)

## Some other notes

### Components

Creating a stateless component: Create a function that returns a JSX element, and optionally takes in `props`.
`var MyComponent = React.createClass` and `class MyComponent extends React.Component` are sort of the same. The first one was a proprietary 'class-like' structure made by the React team while in the second example the React team switched using ES6 classes you're extending. If you want to explore the differences between the two:

- [`createClass` vs `extends React.Component` - Todd Moto](https://toddmotto.com/react-create-class-versus-component/)
- [Stackoverflow - React.createClass vs extends Component](https://stackoverflow.com/questions/33526493/react-createclass-vs-extends-component)

### Key takeaways

- JSX is a readable syntax on top of the  `React.createElement` API. The more you realise that this is the case, the better you will understand what is happening.
- The `...` spread operator is really f-in useful. The content of a JSX element is in the `children` prop so you can always define a few default values in your component and spread other values, including `children`, into them.
- Equally useful is ES6 destructuring. Destructuring props in a function call or element render is great and once you know what is going on it makes your code a lot more readable.
- In short, some ES6 knowledge is really useful when working with React.
- Extending the React class Component is nothing more than using an ES6 Class created by the React team. `React.createClass` was their own proprietary solution which they've since backed away from.
- A stateless / functional component is exactly what the name implies. Don't worry too much about which one you're using, switching them out is not that hard and the performance gain of using stateless components isn't always that high. Linters be damned.
- When you're thinking about sending data in the form of `props` or `state` from a child component to a parent component, ask yourself if it's really necessary. Most of the time you already have data available in the parent component (*needs example*)