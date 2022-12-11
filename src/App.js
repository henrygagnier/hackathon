import './App.css';
import { Component} from 'react';
import React from "react";
import Chart from './chart.js';
import { GraphQLClient, gql } from 'graphql-request';
import './chartDaysSelect.css'

class Charts extends Component {
  constructor(props) {
    super(props);
  }
  setup() {var ts = Math.round((new Date()).getTime() / 1000);
  var array = [Math.round(ts/86400)*86400];
  for (let i = 0; i < 99; i++) {
    array.push(array[array.length-1] -86400)
  }
  this.setState({days : array})
}
  
  async getHistoricalPrice(token, days) {
    let total = []
    for (let i = days.length; i > 1; i--) {
        const query = gql`{
    tokenDayDatas(where:{date:`+days[i-1]+` ,token:"`+token+`"}) {
      priceUSD
      date
    }
  }`
    const client = new GraphQLClient('https://api.thegraph.com/subgraphs/name/ubeswap/ubeswap')
  const data = await client.request(query).then((data) =>{
    let arr = [];
    arr.push(data.tokenDayDatas[0].priceUSD)
    arr.push(data.tokenDayDatas[0].date)
    total.push(arr)});
    }
    this.setState({objects:total})
    }
    
    render() {
      return(
        <div></div>
      )
    }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { type : 'Buy', timeShown : 365, chart : <Chart token1='0x471ece3750da237f93b8e339c536989b8978a438' token2='
    0x00be915b9dcf56a3cbe739d9b9c202ca692409ec' id='chart' days={365}/>}
    this.hide()
}
hide() {
}
  handleInput = event => {
    const cb = document.querySelector('#switch');
        if (cb.checked === true) {
          this.setState({ type : 'Sell'})
        } else {
          this.setState({ type : 'Buy'})
        }
};
handle = event => {
  this.setState({ timeShown : event.target.value })
  this.setState({chart : <Chart token1='0x471ece3750da237f93b8e339c536989b8978a438' token2='
  0x00be915b9dcf56a3cbe739d9b9c202ca692409ec' id='chart' days={event.target.value}/>})
  console.log(this.state.timeShown);
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
        <Chart token1='0x471ece3750da237f93b8e339c536989b8978a438' token2='0x00be915b9dcf56a3cbe739d9b9c202ca692409ec' id='chart' days={this.state.timeShown}/>
        </div>
        <span className="loader" id='loader'></span>
        </div>
        </center>
    </div>

  );
}
}
export default App;
