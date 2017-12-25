# Creating a React component

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

## Summary

- To create a reusable component you need to make a function that starts with a capital letter
- This function takes in an object as argument, which you can use in whatever the function returns
- You can use the React elements your function returns as you would use a `div`, `span` or anything else you'd use in JSX
- You can create a component by creating a Javascript function that returns JSX, you can also extend the default React components giving extra options.

## Resources

- [React docs - Components and props](https://reactjs.org/docs/components-and-props.html)
- [React enlightenment - Basic React Components](https://www.reactenlightenment.com/basic-react-components.html)

❓*Is children always available?*