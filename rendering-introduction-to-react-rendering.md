# Application Rendering

When we're creating our React elements with JSX, we're building up a virtual DOM which we could see as a ['local and simplified copy of the HTML DOM'](http://reactkungfu.com/2015/10/the-difference-between-virtual-dom-and-dom/). I won't go into too much detail about the virtual dom yet, but just know we're not actually rendering it to the page untill we call `ReactDOM.render`.

```javascript
const rootEl = document.querySelector('#root');
const time = new Date().toLocaleTimeString();
const element = <div> It's {time}</div>
ReactDOM.render(element, rootEl);
```

The above example is a simple clock. When we render the clock and refresh the browser window, we'll see the seconds updating.

When we re-render the entire app with `setInterval` you can see the clock changes without a browser window refresh.

```javascript
const rootEl = document.querySelector('#root');
function tick() {
    const time = new Date().toLocaleTimeString();
    const element = <div> It's {time}</div>
    ReactDOM.render(element, rootEl);
}
setInterval(tick, 1000);
```

When we change the div to an `input` element with `time` as a value and `focus` on the `input` element, we'll see that `focus` remains even after updating the app.

```javascript
const rootEl = document.querySelector('#root');
function tick() {
    const time = new Date().toLocaleTimeString();
    const element = (<div>
        <input value={time} />
        <input value={time} />
    </div>
    )
    ReactDOM.render(element, rootEl);
}
setInterval(tick, 1000);
```

The `focus` remains on the selected element because React keeps track of it. React also keeps track of the actual changes within our app so even though we call `ReactDOM.render` every second, it will not refresh every `element` inside, just the `time` value.