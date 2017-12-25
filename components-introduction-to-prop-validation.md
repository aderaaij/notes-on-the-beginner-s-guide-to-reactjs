# Prop validation

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

## Resources

- [React Docs - typechecking-with-proptypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
- [Reactenlightenment.com - Validating component Props](https://www.reactenlightenment.com/react-props/7.6.html)
- [PropTypes NPM package](https://www.npmjs.com/package/prop-types)