# My notes on 'The Beginners guide to React' course by Kent C. Dodds

## Table of contents

1. [React Nodes](/react-nodes.md)
1. [JSX](/react-jsx.md)
1. React Components
    1. [Components - Creating a React component](/react-components-creating-a-component.md)
    1. [Components - An introduction to prop validation](/react-components-proptype-validation.md)
    1. [Components - About class components](/react-components-class-components.md)
    1. [Components - React componenet State](/react-components-state.md)
    1. [Components - Styling](/react-components-styling.md)
1. [React events](react-events.md)
1. [Rendering - An introduction to React rendering](react-rendering-introduction.md)
1. [Resources - A list of useful articles and tutorials](react-useful-resources-articles-tutorials.md)

## Introduction

The more I use React, the more I want to find out what is actually happening under the hood. There is no shortage of React tutorials but most of them show you how to make something with React but not what the inner workings of the library are. Luckily there are some great resources available that get to the core of things, one of which is the freely available [‘Beginners guide to React’](https://egghead.io/courses/the-beginner-s-guide-to-reactjs) course from [Kent C. Dodds](https://twitter.com/kentcdodds) on egghead.io.

Besides the egghead.io course, I’ve watched [one of Kent’s talks](https://youtu.be/pugPxYH96TU) in which he covers much of the same grounds but goes a bit more in-depth at times.

During the course I also found the [React documentation](https://reactjs.org/docs/) to be really helpful, as the [React Enlightenment](https://www.reactenlightenment.com/) book which is available online for free and greatly compliments Kent's course. I've created [a document in which I gathered the resources I've used throughout the course](react-useful-resources-articles-tutorials.md).

### Structure

I haven't been adding notes for each chapter, that is something I might do later. For now I've grouped some subjects together in single documents. I've also tried to deepen some material by referring to the official react docs and [Reactenlightenment.com](http://reactenlightenment.com).


### Notes on Components

- Creating a stateless component: Create a function that returns a JSX element, and optionally takes in `props`.
- `var MyComponent = React.createClass` and `class MyComponent extends React.Component` are sort of the same. The first one was a proprietary 'class-like' structure made by the React team while in the second example the React team switched using ES6 classes you're extending. If you want to explore the differences between the two:
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

### Questions

- Do we always need a constructor in a React Class component?
- What does `super()` really do?

## Lessons

### 12. [Using Class components with React](https://egghead.io/lessons/egghead-use-class-components-with-react)

The name of this lesson might be slightly misleading as it's more about event handling and binding within the React class component. I might move this part under 'event-handling'.

Working with React class components (and ES6 classes in general) means making a lot of use of `this` to reference or declare internal functions and variables. When you create a function in the *upper scope of a class component you can call that function within other functions or components by adding `this.` to the function call:

```javascript
class ClickButton extends React.Component {
    clickHandler() {
        alert('You\'ve clicked 🎉')
    }

    render() {
        return(
            <button onClick={this.clickHandler}>Click</button>
        )
    }
}
```

The example above will work with no problem. We define a function in the upper scope and refer to it within ther `render` function by adding `this.` to the function call.

But what if you want to update / set the state in the function you call in your eventhandler?

```javascript
class ClickButton extends React.Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
        };
    }

    clickHandler() {
        this.setState(({ counter }) => ({
            counter: counter + 1,
        }));
    }

    render() {
        return(
            <button onClick={this.clickHandler}>{this.state.counter}</button>
        )
    }
}
```

In the example above we first call the `constructor` method. This is where we set the state. Note how we call `state` with `this.` infront of it. You could also define state on the same level as the `constructor`, withouth the `this`.

In our clickhandler, we now update the state with `setState` and add an extra count to the counter every time we click the button. It looks like it should work, but it doesn't though. The error message reads something like `Cannot read property 'setState' of undefined`.

As it turns out, `setState` is undefined because `this` doesn't refer to the upprscope anymore. We call the function within another function which means the `this` used with `setState` points to the wrong place. To fix this we can do a couple of things. One of the easiest ways to solve this is changing the `clickHandler` function into an arrow function:

```javascript
clickHandler = () => {
    this.setState(({ counter }) => ({
        counter: counter + 1,
    }));
}
```

This is the ['stage 3 public class field syntax proposal'](https://github.com/tc39/proposal-class-fields) and seems to be the recommended way of binding your function. Read more about the different possibilities in these great articles and the React Docs:

- [Why Arrow Functions and bind in React’s Render are Problematic](https://medium.freecodecamp.org/why-arrow-functions-and-bind-in-reacts-render-are-problematic-f1c08b060e36)
- [React Binding Patterns: 5 Approaches for Handling `this`](https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56)
- [Passing functions to components - React Docs](https://reactjs.org/docs/faq-functions.html#how-do-i-bind-a-function-to-a-component-instance)

*is this the right terminology?

### [13. Manipulate the DOM with React refs](https://egghead.io/lessons/egghead-manipulate-the-dom-with-react-refs)

There might be some cases when you need to interact with an actual DOM node, whether it is an instance of a React Component or a DOM element. You can get a reference to a DOM node with `ref` and an arrow function:

```javascript
class Test extends React.Component {
    componentDidMount() {
        console.log(this.myElement);
    }
    render() {

        return(
            <div ref={myElement => (this.myElement = myElement)}>
                <h1>Hi</h1>
            </div>
        )
    }
}
```

In this example we use an arrow function to take the element in `myElement` and declare `this.myElement` and assing it to `myElement`. `this.myElement` could also be called `this.randomstring`, it doesn't need the same name as the element itself. All we're doing is declaring a new variable that is available within the class. Now we've got `this.myElement` available as soon as the component is mounted and it could be used to load an external library for example.

#### Ref resources

- [Refs and the DOM - React Docs](https://reactjs.org/docs/refs-and-the-dom.html)
- [Using the ref attribute - reactenlightenment.com](https://www.reactenlightenment.com/basic-react-components/6.9.html)

### [14. Make basic forms with React](https://egghead.io/lessons/egghead-make-basic-forms-with-react)

When making forms in React there are a few things to keep an eye on. For one we want to prevent the default behaviour of a form so that the page doesn't fully refresh on submit.

```javascript
class NameForm extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target[0].value);
        console.log(event.target.elements.username.value);
        console.log(this.userName.value)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    name:
                    <input name="username" ref={inputNode => (this.userName = inputNode)} type="text" />
                </label>
                <button type='Submit'>Submit</button>
            </form>
        )
    }
}

```

In the above example we use `handleSubmit` as our `onSubmit` eventhandler. We also include three different manners to get the value out of the input.

In the first we use the `event.target` property and get the first element in the array. In the second we use the `name` attribute to get the specific target element. This is especially useful with big forms.

The third `console.log` uses the `ref` attribute. Where the previous two examples were pretty much examples that work with plain HTML and JS, this is the React-only solution. It's a very direct way of referencing to your elements.

#### Forms - Resources

- [Forms - React docs](https://reactjs.org/docs/forms.html)

### [15. Make dynamic forms with React](https://egghead.io/lessons/egghead-make-dynamic-forms-with-react)

When we make forms in react we can do dynamic error / input checking with the `onChange` event. In the example below you'll see a simple way to show an error message when whatever the user is typing doesn't pass the checks we've set-up. 

```javascript
class NameForm extends React.Component {

    // Set the errorMessage value as an empty string
    state = { error: this.props.getErrorMessage('') }

    // Prevent default and show an alert on success
    handleSubmit = event => {
        event.preventDefault();
        const value = event.target.elements.username.value;
        alert(`success: ${value}`)
    }

    // The magic
    // On each letter we add or remove we set the state
    // and use the error message function with the updated value.
    handleChange = event => {
        const {value} = event.target
        this.setState({
            error: this.props.getErrorMessage(value),
        })
    }

    render() {
        const { error } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input
                    type="text"
                    onChange={this.handleChange}
                    name="username"
                    />
                </label>
                {/* When there's an error, we hsow this error in red */}
                {error ? (
                <div style={{color: 'red'}}>
                {error}
                </div>
                ) : null}
                <button
                    disabled={Boolean(error)}
                    type="submit"
                >
                    Submit
                </button>
            </form>
        )
    }
}

ReactDOM.render(
    <NameForm
        getErrorMessage={value => {
            if (value.length < 3) {
                return `Value must be at least 3 characters, but is only ${value.length}`
            }
            if (!value.includes('s')) {
                return `Value does not include "s" but it should!`
            }
            return null
        }}
    />,
    document.getElementById('root'),
);
```
