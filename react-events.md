# Event Handlers

Event handling with React elements resembles event handling with DOM elements, with some differences in syntax. There are a whole bunch of [supported events](https://reactjs.org/docs/events.html#supported-events) available. You'd normally add an eventhandler to a JSX element like this:

```javascript
   <input onChange={function} />
   <button onClick={function}>Click</button>
```

Every event you pass is wrapped in a `SyntheticEvent`, a React wrapper around the browsers native event. It works the same as the native events except that the behaviour is similar across browsers. React also takes care of event delegation for events that bubble, meaning they're collected into a single event handler.

## Resources event handling

- [Use event handlers with React - The beginners guide to React](https://egghead.io/lessons/egghead-use-event-handlers-with-react)
- [Defining React Node events - Reactenlightenment.com](https://www.reactenlightenment.com/react-nodes/4.7.html)
- [Defining events in JSX - Reactenlightenment.com](https://www.reactenlightenment.com/react-jsx/5.8.html)
- [Supported events - React Docs](https://reactjs.org/docs/events.html#supported-events)
- [`SyntheticEvent` - React Docs](https://reactjs.org/docs/events.html)
