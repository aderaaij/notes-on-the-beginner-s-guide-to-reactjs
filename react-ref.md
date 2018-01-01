# React Ref - Manipulating the DOM

From the lesson - [13. Manipulate the DOM with React refs](https://egghead.io/lessons/egghead-manipulate-the-dom-with-react-refs)

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

In this example we use an arrow function to take the element in `myElement` and declare `this.myElement` and assign it to `myElement`. `this.myElement` could also be called `this.randomstring`, it doesn't need the same name as the element itself. All we're doing is declaring a new variable that is available within the class. Now we've got `this.myElement` available as soon as the component is mounted and it could be used to load an external library for example.

## Ref resources

- [Refs and the DOM - React Docs](https://reactjs.org/docs/refs-and-the-dom.html)
- [Using the ref attribute - reactenlightenment.com](https://www.reactenlightenment.com/basic-react-components/6.9.html)