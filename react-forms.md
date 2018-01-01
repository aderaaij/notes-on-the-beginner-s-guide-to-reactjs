# React forms

## [14. Make basic forms with React](https://egghead.io/lessons/egghead-make-basic-forms-with-react)

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

### Forms intro - Resources

- [Forms - React docs](https://reactjs.org/docs/forms.html)

## [15. Make dynamic forms with React](https://egghead.io/lessons/egghead-make-dynamic-forms-with-react)

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
               {/* When there's an error, we show this error in red */}
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
