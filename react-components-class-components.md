# About Class components / es6 classes

React uses default ES6 classes for their components with a couple of default methods and api's: Lifecycle hooks, API's, class properties and instance properties. You can use all these methods directly in a React class component and add your own methods as well. When you want to use a method within a method, you can call it with `this`.

In theory you can directly set the sate in a React class component like in the following example:

```javascript
class SomeComponent extends React.Component {
    state = {
        word: 'word',
    }

    render() {
        return(
            <div>{this.state.word}</div>
        )
    }
}
```

In general, the best place to initialize your `state` is within the special `constructor()` method. The `constructor()` method is part of ES6 classes and is called on initializing of your component. In the `constructor()` method, you should also call `super()`, which somehow makes sure that `this` is available within the other methods. In any case, a React class component should look like this:

```javascript
class SomeComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            word: 'word',
        }
    }

    render() {
        return(
            <div>{this.state.word}</div>
        )
    }
}
```

Notice that we now set the `state` api with `this.state`. We can now call the content of the `state` with `this.state` or set new content with `this.setState`.

## Resources

- [React component - React docs](https://reactjs.org/docs/react-component.html)
- [Class components - Alligator.io](https://alligator.io/react/class-components/)
- [ES6 classes - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [A deep dive into es6 classes - sitepoint.com](https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/)