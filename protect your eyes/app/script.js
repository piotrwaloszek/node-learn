import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      status: 'off',
      time: '',
      timer: null,
    };
  }

  formatTime = (arg) => {
    if(!arg || typeof(arg) !== 'number' || arg < 0){
      return null;
    }
  
    let ss = Math.floor(arg%60).toString();
    let mm = Math.floor((arg/60)%60).toString();
  
    if (ss.length <= 1 || mm.length <= 1){
      return (mm.padStart(2, '0') + ':' + ss.padStart(2, '0'));
    } else {
      return (mm + ':' + ss);
    }
  }

  step = () => {
    if (this.state.status === 'work' || this.state.status === 'rest'){
      this.setState({
        time: this.state.time - 1,
      })
    }

    if (this.state.time === 0){
      this.setState({
        time: (this.state.status === 'work' ? 20 : 1200),
        status: (this.state.status === 'work' ? 'rest' : 'work'),
      })
      this.playBell();
    }
  
  };

  startTimer = () => {
    this.setState({
      timer: setInterval(this.step, 1000),
      status: 'work',
      time: 1200,
    });
  };

  stopTimer = () => {
    this.setState({
      timer: clearInterval(this.state.timer),
      time: 0,
      status: 'off',
    })
  }

  closeApp = () => {
    window.close();
  }

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  render() {
    const { status, time } = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && 
        (<div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>)}
        {(status === 'work') && (<img src="./images/work.png" />)}
        {(status === 'rest') && (<img src="./images/rest.png" />)}
        {(status !== 'off') && 
        (<div className="timer">
          {this.formatTime(time)}
        </div>)}
        {(status === 'off') && (<button onClick={this.startTimer} className="btn">Start</button>)}
        {(status !== 'off') && (<button onClick={this.stopTimer} className="btn">Stop</button>)}
        <button onClick={this.closeApp} className="btn btn-close">X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));