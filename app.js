// const root = document.getElementById('root');
// const divStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     flexDirection: 'column',
//     alignItems: 'center',
// };

// const buttonStyle = {
//     margin: '1em 0',
//     padding: '1em 2em',
//     display: 'block',
//     background: 'transparent',
//     border: '1px solid #999999',
//     fontWeight: '700',
//     width: 120,
// };

// class StopWatch extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { 
//             lapse: 0,
//             running: false,
//         }
//     }

//     handleRunClick = () => {
//         this.setState(state => {
//             if (state.running) {
//                clearInterval(this.timer);
//             } else {
//                 this.timer = setInterval(() => {
//                     this.setState({ lapse: Date.now() - startTime });  
//                 });
//             }
//             return { running: !state.running }
//         })
//         const startTime = Date.now() - this.state.lapse;
//     }

//     handleClearClick = () => {
//         clearInterval(this.timer);
//         this.setState({ lapse: 0, running: false, });
//     }

//     componentWillUnmount() {
//         clearInterval(this.timer);
//     }

//     render() {
//         const { lapse, running } = this.state;
//         return (
//             <div style={divStyle}>
//                 <label style={{ fontSize: '2em', fontWeight: '700' }}>
//                     {lapse}ms
//                 </label>
//                 <button onClick={this.handleRunClick} style={buttonStyle}>{running ? 'Stop' : 'Start'}</button>
//                 <button onClick={this.handleClearClick} style={buttonStyle}>Clear</button>
//             </div>
//         )
//     }
// }

// ReactDOM.render(<StopWatch />,root);

const rootEl = document.querySelector('#root');



// class ClickButton extends React.Component {
//     render() {
//         return (
//             <div>
//                 <button>1</button>
//             </div>
//         )
//     }
// }

// class ClickButton extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             counter: 0,
//         };
//     }

//     clickHandler() {
//         this.setState(({ counter }) => ({
//             counter: counter + 1,
//         }));
//     }

//     render() {
//         return(
//             <button onClick={this.clickHandler}>{this.state.counter}</button>
//         )
//     }
// }

// class Test extends React.Component {
//     componentDidMount() {
//         console.log(this.random);
//     }
//     render() {

//         return(
//             <div ref={myElement => (this.random = myElement)}>
//                 <h1>Hi</h1>
//             </div>
//         )
//     }
// }

// class NameForm extends React.Component {
    
//     handleSubmit = (event) => {
//         event.preventDefault();
//         console.log(event.target[0].value);
//         console.log(event.target.elements.username.value);
//         console.log(this.userName.value)
//     }

//     render() {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <label>
//                     name: 
//                     <input name="username" ref={inputNode => (this.userName = inputNode)} type="text" />
//                 </label>
//                 <button type='Submit'>Submit</button>
//             </form>
//         )
//     }
// }

// ReactDOM.render(<NameForm />, rootEl);

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
                {/* When there's an error, we hsow this error in red */}
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