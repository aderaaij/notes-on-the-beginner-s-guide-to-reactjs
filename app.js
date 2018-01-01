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

class Test extends React.Component {
    componentDidMount() {
        console.log(this.random);
    }
    render() {

        return(
            <div ref={myElement => (this.random = myElement)}>
                <h1>Hi</h1>
            </div>
        )
    }
}

ReactDOM.render(<Test />, rootEl);