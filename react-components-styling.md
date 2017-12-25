# Styling React Components (The basics)

⚠️ *This part will include a bit of CSS you can find in the [Style React Components lesson](https://egghead.io/lessons/react-style-react-components) from the egghead course.*

One of the most basic ways to style React components is with inline CSS. JSX elements can take a `style` attribute which takes in an object:

```javascript
const rootEl = document.querySelector('#root');
const App = () => (
   <div>
       <div className='box box--small' style={{paddingLeft: 20}}>box</div>
   </div>
)
ReactDOM.render(<App />, rootEl)
```

There are a few remarkable things going on here:

- The `style` property is wrapped in two sets of curly braces, one to interpolate JavaScript and the second to define the object.
- The CSS property key is camelCased so we don't have to escape `-`. The regular CSS property key would be `padding-left`.
- We haven't added a unit to our value. When no unit is added, `px` will be assumed.
- I also went ahead and added a `className`. [`className` is used instead of `class` for several reasons](https://goo.gl/JwQzsY)

One of the nice things about having `style` as an `object` is the possibility to include your styling in the `props` object.

```javascript
const className = "box box--small"
const props = {
   className,
   style: {padding: 20}
}
const App = () => (
   <div>
       <div {...props}>
           box
       </div>
   </div>
)
```

Notice that we use the `className` shorthand in the object. When the property key and value are the same, you don't need to write them out.

The next thing we'll do is make a reusable `Box` component.

```javascript
const Box = (props) => (
   <div
       className="box box--small"
       style={{padding: 20}}
       {...props}
   >
   </div>
)
const App = () => (
   <div>
       <Box>Small Box</Box>
       <Box>Small Box</Box>
       <Box>Small Box</Box>
   </div>
)
```

In this example we have a functional `Box` component that takes in `props`. By default the containing `div` has a `className` and a `style` property. All the other properties we assign to `Box` when we use the component in the `App` we can spread out.

Now we've got three boxes which share some values, but we'd also like to style them differently. So what happens when you add a property like `style={{backgroundColor: 'blue}}` to a box?

I'll tell you because I'm too lazy to make screenshots at the moment: You will lose your padding! Equally, when we'd use `{...props}` before defining `style` and `className` we would lose the `backgroundColor` we just set. This is because the value in `style` is an entire object, which will be completely replaced by the `style` object from our `props` (or the other way around, depending on the order). This is called a `shallow merge`. When spreading the properties, the only thing looked at are the top-level keys and values.

This is more of an `ES6` lesson than a `React` lesson, but we can fix this by destructuring part of our props in our function argument.

```javascript
const Box = ({style, ...rest}) => (
   <div
       className="box box--small"
       style={{padding: 20, ...style}}
       {...rest}
   >
   </div>
);
const App = () => (
   <div>
       <Box style={{backgroundColor: 'green'}}>Small Box</Box>
       <Box>Small Box</Box>
       <Box>Small Box</Box>
   </div>
);
```

In this case we're doing two shallow merges. First we destructure `style` from our `props` and put the rest into a `rest` variable with the `...` operator. Next up we change `...props` to `...rest` which now means "add anything that we haven't destructured". In the style object we merge `style` by doing another shallow merge. Now the entire `style` object isn't replaced, we just add values.

Let's do the same thing for our classnames. When we just add a `className` property to our `Box` element, this will overwrite the default `className`, which isn't what we wanted. We want to add a `className` to the default one to make our box a specific size we already defined in our CSS. In this case we will also have to destructure the `className` property out of our `props` object:

```javascript
const Box = ({style, className, ...rest}) => (
   <div
       className={`box ${className}`}
       style={{padding: 20, ...style}}
       {...rest}
   >
   </div>
);
const App = () => (
   <div>
       <Box className="box--small" style={{backgroundColor: 'green'}}>Small Box</Box>
       <Box>Small Box</Box>
       <Box>Small Box</Box>
   </div>
);
```

This works. Although when you don't use a `className` property, our classes would render like `class="box undefined"`. To solve this we can assign a default value of nothing *while* we're destructuring our props:

```javascript
const Box = ({style, className = '', ...rest}) => (//...etc
```

Now we're able to render a bunch of boxes with eah a different color and size:

```javascript
const Box = ({style, className = '', ...rest}) => (
   <div
       className={`box ${className}`}
       style={{padding: 20, ...style}}
       {...rest}
   >
   </div>
);
const App = () => (
   <div>
       <Box className="box--small" style={{backgroundColor: 'green'}}>Small Box</Box>
       <Box className="box--medium" style={{backgroundColor: 'tomato'}}>Small Box</Box>
       <Box className="box--large" style={{backgroundColor: 'rebeccapurple'}}>Small Box</Box>
   </div>
);
```

A concern in this case could be that the composer of these elements needs to know the CSS classnames. It would be better if the author could just define a size like `small`, `medium` or `large`. That's why we could replace `className` with a `size` property that takes in a string:

```javascript
const Box = ({style, size, ...rest}) => {
   const className = size ? `box box--${size}` : 'box';
   return (
       <div
       className={className}
       style={{padding: 20, ...style}}
       {...rest}
       />
   )
};
const App = () => (
   <div>
       <Box size="small" style={{backgroundColor: 'green'}}>Small Box</Box>
       <Box size="medium" style={{backgroundColor: 'tomato'}}>Small Box</Box>
       <Box size="large" style={{backgroundColor: 'rebeccapurple'}}>Small Box</Box>
   </div>
);
```

In this example we destructure `size` instead of `className`.

## Resources

- [Use inline CSS in JSX - Reactenlightenment.com](https://www.reactenlightenment.com/react-jsx/5.6.html)
