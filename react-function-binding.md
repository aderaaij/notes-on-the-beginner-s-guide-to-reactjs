# 12. Function binding

The material in this article comes from the ['Using Class components with React'](https://egghead.io/lessons/egghead-use-class-components-with-react) lesson.

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

The example above will work with no problem. We define a function in the upper scope and refer to it within the `render` function by adding `this.` to the function call.

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

In the example above we first call the `constructor` method. This is where we set the state. Note how we call `state` with `this.` in front of it. You could also define state on the same level as the `constructor`, without the `this`.

In our clickhandler, we now update the state with `setState` and add an extra count to the counter every time we click the button. It looks like it should work, but it doesn't though. The error message reads something like `Cannot read property 'setState' of undefined`.

As it turns out, `setState` is undefined because `this` doesn't refer to the upper scope anymore. We call the function within another function which means the `this` used with `setState` points to the wrong place. To fix this we can do a couple of things. One of the easiest ways to solve this is changing the `clickHandler` function into an arrow function:

```javascript
clickHandler = () => {
   this.setState(({ counter }) => ({
       counter: counter + 1,
   }));
}
```

This is the ['stage 3 public class field syntax proposal'](https://github.com/tc39/proposal-class-fields) and seems to be the recommended way of binding your function. 

## Resources

- [Why Arrow Functions and bind in React’s Render are Problematic](https://medium.freecodecamp.org/why-arrow-functions-and-bind-in-reacts-render-are-problematic-f1c08b060e36)
- [React Binding Patterns: 5 Approaches for Handling `this`](https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56)
- [Passing functions to components - React Docs](https://reactjs.org/docs/faq-functions.html#how-do-i-bind-a-function-to-a-component-instance)

*is this the right terminology?
