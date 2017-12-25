# JSX

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

## Javascript in JSX

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

## Conditionally rendering JSX

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

## Resources - JSX

- [React Enlightment - JSX](https://www.reactenlightenment.com/react-jsx/5.7.html)
- [React Docs - Dom elements](https://reactjs.org/docs/dom-elements.html)
- [React Docs - conditional rendering](https://reactjs.org/docs/conditional-rendering.html)