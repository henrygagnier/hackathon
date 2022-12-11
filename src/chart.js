import React, { Component } from "react";
import { Chart } from "react-google-charts";
import { GraphQLClient, gql } from 'graphql-request'

const options = {
  explorer: {axis: 'horizontal', keepInBounds: true, actions: ['dragToZoom', 'rightClickToReset']},
  fontName: 'Inter',
  legend: { position: 'top', alignment: 'center' },
  bold: true,
  hAxis: {
    title: "Timestamp",

  },
  colors:['#8878C3',],
  vAxis: {
    title: "Price",
    
  },
  interpolateNulls: true
};

class charts extends Component {
  constructor(props) {
    super(props);
    this.state = { Token1Data: [], Token2Data: [], sort2: false, sort1: false };
    this.getDays();
  }

  //TOKEN 2
  async getDataToken2(token, days, handle) {
    const query = gql`{
      tokenDayDatas(where:{date:`+ days[handle] + ` ,token:"` + token + `"}) {
        priceUSD
        date
        id
      }
    }`
    const client = new GraphQLClient('https://api.thegraph.com/subgraphs/name/ubeswap/ubeswap')
    const data = await client.request(query).then((data) => {
      let arr = [];
      arr.push(String(days[handle]));
      const data1 = data.tokenDayDatas.push({});
      if (Object.keys(data.tokenDayDatas[0]).includes("priceUSD")) {
        arr.push(Number(data.tokenDayDatas[0].priceUSD))
      } else {
        arr.push(null);
      }
      let datas = this.state.Token2Data;
      // Add item to it
      datas.push(arr);
      // Set state
      this.setState({ Token2Data: datas });
    });
  }
  intervalFuncToken2() {
    if (this.state.Token2Data.length === 365) {
      let datas = this.state.Token2Data;
      const sort = datas.sort(function (a, b) {
        return a[0] - b[0];
      })

      // Add item to it

      // Set state
      this.setState({ Token2Data: sort });
      this.setState({ sort2: true });
    } else {
      setTimeout(() => {
        this.intervalFuncToken2();
      }, 100);
    }
  }
  async getHistoricalPriceToken2(token, days) {

    const query = gql`{
    tokens(where : {id:"` + token + `"}) {
      id
    }
  }`

    const client = new GraphQLClient('https://api.thegraph.com/subgraphs/name/ubeswap/ubeswap')
    const data = await client.request(query).then((data) => {
      var tempdata = data
      tempdata.tokens.push({})
      if (Object.keys(tempdata.tokens[0]).includes("id")) {
        for (let i = 0; i < days.length; i++) {
          this.getDataToken2(token, days, [i]);
        }
        this.intervalFuncToken2();
        this.setState({ err: "" })
      } else {
        this.setState({ err: "We couldn't find any chart data for this." })
      }
    });
  }
  //TOKEN 1
  async getDataToken1(token, days, handle) {
    const query = gql`{
          tokenDayDatas(where:{date:`+ days[handle] + ` ,token:"` + token + `"}) {
            priceUSD
            date
          }
        }`
    const client = new GraphQLClient('https://api.thegraph.com/subgraphs/name/ubeswap/ubeswap')
    const data = await client.request(query).then((data) => {
      let arr = [];
      arr.push(String(days[handle]));
      const data1 = data.tokenDayDatas.push({});
      if (Object.keys(data.tokenDayDatas[0]).includes("priceUSD")) {
        arr.push(Number(data.tokenDayDatas[0].priceUSD))
      } else {
        arr.push(null);
      }
      let datas = this.state.Token1Data;
      // Add item to it
      datas.push(arr);
      // Set state
      this.setState({ Token1Data: datas });
    });
  }
  intervalFuncToken1() {
    if (this.state.Token1Data.length === 365) {
      let datas = this.state.Token1Data;
      const sort = datas.sort(function (a, b) {
        return a[0] - b[0];
      })
      // Add item to it

      // Set state
      this.setState({ Token1Data: sort });
      this.setState({ sort1: true })
    } else {
      setTimeout(() => {
        this.intervalFuncToken1();
      }, 100);
    }
  }
  async getHistoricalPriceToken1(token, days) {
    for (let i = 0; i < days.length; i++) {
      this.getDataToken1(token, days, [i]);
    }
    this.intervalFuncToken1();
  }
  getDays() {
    var ts = Math.round((new Date()).getTime() / 1000);
    var array = [Math.round(ts / 86400) * 86400];
    for (let i = 0; i < 365; i++) {
      array.push(array[array.length - 1] - 86400)
    }
    array.shift();
    this.getHistoricalPriceToken1(this.props.token1, array);
    this.getHistoricalPriceToken2(this.props.token2, array);
    this.checkForDone();
  }
  async checkForDone() {
    if ((this.state.sort1 === true) && (this.state.sort2 === true)) {
      var data = [];
      for (let i = 0; i < this.state.Token1Data.length; i++) {
        let element = [];
        element.push(new Date(this.state.Token1Data[i][0]*1000));
        if ((this.state.Token1Data[i][1] / this.state.Token2Data[i][1]) !== Infinity) {
          if ((this.state.Token1Data[i][1] / this.state.Token2Data[i][1]) !== null) {
          element.push(this.state.Token1Data[i][1] / this.state.Token2Data[i][1]);
          } else {
            element.push(0)
          }
        } else {
          element.push(0);
        }
        data.push(element);
      }
      for (let i = 0; i < (365 - this.props.days); i++) {
        data.shift();
      }
      const query1 = gql`{
        tokens(where : {id :"`+this.props.token1+`"}) {
          symbol
        }
      }`
      const query2 = gql`{
        tokens(where : {id :"`+this.props.token2+`"}) {
          symbol
        }
      }`
    
        const client = new GraphQLClient('https://api.thegraph.com/subgraphs/name/ubeswap/ubeswap')
        const request = await client.request(query1).then((data) => {
          console.log(data.tokens[0].symbol)
          this.setState({symbolone : data.tokens[0].symbol})
          var s = data.tokens[0].symbol;
        })
        const request2 = await client.request(query2).then((data) => {
          console.log(data.tokens[0].symbol)
          this.setState({symboltwo : data.tokens[0].symbol})
          var s1 = data.tokens[0].symbol;
        });
        setTimeout(() => {
          data.unshift(['X', this.state.symbolone + '/' + this.state.symboltwo])
      this.setState({ data: data })
        }, 100);
      setTimeout(() => {
      }, 1000);
    } else {
      setTimeout(() => {
        this.checkForDone();
      }, 500);
    }
  }
  render() {
    return (

      <div>
        <script>document.getElementById("loader").style.display = 'block';</script>
        <Chart
          chartType="LineChart"
          data={this.state.data}
          options={options}
          width={"100%"}
          height={"400px"}
          chartEvents={[
            {
              eventName: "ready",
              callback: () => {
                document.getElementById("loader").style.display = 'none';
              }
            }
          ]}
        />
        <p>{this.state.err}</p>
      </div>
    )
  }
}
export default charts;