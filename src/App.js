import './App.css';
import { Component } from 'react';
import React from "react";
import Chart from './chart.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {type: 'Buy'}
  }
  handleInput = event => {
    const cb = document.querySelector('#switch');
    if (cb.checked === true) {
      this.setState({ type: 'Sell' })
    } else {
      this.setState({ type: 'Buy' })
    }
  };
  render() {
    return (
      <div className="App">
        <center>
          <div className="maincontent"><div className='notcenter'><p>Limit Orders</p></div><br></br>
            <center>
              <div className='check'>
                <input type="checkbox" id="switch"
                  className="checkbox" onChange={this.handleInput} />
                <label htmlFor="switch" className="toggle"><span className='br'></span>
                  <p className='togglet a'>Buy </p><p className='togglet b'> Sell</p>
                </label>
              </div>
            </center>
            <br></br>
            <div className='notcenter'><p>{this.state.type} Amount</p></div>
            <textarea placeholder='0.000'></textarea>
            <div className='notcenter'><p>Limit Price</p></div>
            <textarea placeholder='0.000' inputMode='decimal' pattern='^[0-9]*[.,]?[0-9]*$' type='number'></textarea>
            <div id='chart'>
              <Chart token1='0x471ece3750da237f93b8e339c536989b8978a438' token2='0x00be915b9dcf56a3cbe739d9b9c202ca692409ec' id='chart' days={this.state.timeShown} />
            </div>
            <div id='loader'>
              <span className="loader" ></span><br></br>
              <p>Loading...please stand by until we fetch the chart data!</p>
            </div>
          </div>
        </center>
      </div>

    );
  }
}
export default App;