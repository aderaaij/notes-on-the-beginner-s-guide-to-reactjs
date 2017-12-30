# Using component state with React

The first lesson about Component state in 'The beginners guide to React' went slightly fast, so I'll start with a bit of theory.

Each React `class` component offers a `state` you can set. You can use the component `state` to set information and data that belong to the specific component and can change over time. These changes are usually triggered by user or system events like someone clicking a button or a server request. In the component's `state` you can keep track of these changes and update your UI or functions accordingly.

In many aspects, state is similair to `props` with the big difference being that the state is a private object which is only controlled by the component. The state is not accessible outside of the component although it could be passed down as a `prop` in a child component. Data that is stored in the state can only be passed down as a prop.

You can set props with the [`setState()`](https://reactjs.org/docs/react-component.html#setstate) api.


