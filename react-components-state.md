# Using component state with React

The first lesson about Component state in 'The beginners guide to React' went slightly fast, so I'll start with a bit of theory.

Each React `class` component offers a `state` you can use. You can use this `state` to set information and data that belong to the specific component and can change over time. These changes are usually triggered by user or system events like someone clicking a button or a server request. In the component's `state` you can keep track of these changes and update your UI or functions accordingly.


> Contain data that a component's event handlers may change to trigger a UI update. In real apps this data tends to be very small and JSON-serializable. When building a stateful component, think about the minimal possible representation of its state, and only store those properties in this.state. Inside of render() simply compute any other information you need based on this state. You'll find that thinking about and writing applications in this way tends to lead to the most correct application, since adding redundant or computed values to state means that you need to explicitly keep them in sync rather than rely on React computing them for you.

