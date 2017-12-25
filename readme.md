# My notes on - 'Beginners guide to React'

⚠️ *Currently I'm still following the course, and with taking notes and all it's not going too fast! Keep an eye open for updates*

The more I use React, the more I want to find out what is actually happening under the hood. There is no shortage of React tutorials but most of them show you how to make something with React, but not how React does these things. Luckily there are some great resources available that do get to the core of things, one of which is the [‘Beginners guide to React’](https://egghead.io/courses/the-beginner-s-guide-to-reactjs) course from [Kent C. Dodds](https://twitter.com/kentcdodds) on egghead.io.

Besides the egghead.io course, I’ve watched [one of Kent’s talks](https://youtu.be/pugPxYH96TU) in which he covers much of the same grounds but goes a bit more in-depth at times.

During the course I also found the [React documentation](https://reactjs.org/docs/) to be really helpful, as the [React Enlightenment](https://www.reactenlightenment.com/) book which is available online for free and greatly compliments Kent's course.

At the bottom of this document you can find a list of resources I've been using throughout this course and underneath every chapter there's a list of resources about the chapter topic.

## Table of contents

- [React Nodes](/react-nodes.md)
- [JSX](/jsx.md)
- Componemts
    - [Components - Creating a React component](/components-creating-a-react-component.md)
    - [Components - An introduction to prop validation](/components-introduction-to-prop-validation.md)
- [Styling React components](/styling-react-components.md)
- [React events](events-in-react.md)
- [Rendering - An introduction to React rendering](rendering-introduction-to-react-rendering.md)
- [Resources - A list of useful articles and tutorials](react-useful-resources-articles-tutorials.md)

## Some other notes

### Components

Creating a stateless component: Create a function that returns a JSX element, and optionally takes in `props`.
`convarst MyComponent = React.createClass` and `class MyComponent extends React.Component` are the same. The first one is `es5` syntax, the latter is `es6`. I'm completely commited to the `es6` syntax but if you want to explore the differences, [Todd Moto did a write-up on `createClass` vs `extends React.Component`](https://toddmotto.com/react-create-class-versus-component/) that is worth exploring.
[Stackoverflow - React.createClass vs extends Component](https://stackoverflow.com/questions/33526493/react-createclass-vs-extends-component)

### Key take aways

- JSX is a readable syntax on top of the  `React.createElement` API. The more you realise that this is the case, the better you will understand what is happening.
- The `...` spread operator is really f-in usefull. The content of a JSX element is in the `children` prop so you can always define a few default values in your component and spread other values, including `children`, into them.