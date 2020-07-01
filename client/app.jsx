import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './components/Chart.jsx';
import $ from 'jquery';
import '../public/dist/style.css';



class App extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      chartData: {},
      startDate: null,
      endDate: null,
      toggleChart: false

    }

    this.getInitialData = this.getInitialData.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.formatData = this.formatData.bind(this);
  }
  componentDidMount() {
    this.getInitialData(null, null);
  }
  getInitialData (startDate, endDate) {
    var options;
    if (startDate && endDate ) {
      var options = {
        startDate: startDate,
        endDate: endDate
      }
  } else {
    options = {};
  }
    $.ajax({
      type: 'POST',
      url: '/getData',
      data: options,
      success: (data) => {
       console.log('get success')
        data = JSON.parse(data);
        var newData = this.formatData(data);
        this.setState({
          chartData: newData,
          toggleChart: true
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    })

  }
  onHandleChange (e) {
    var value = e.target.value;
    var name = e.target.name;

    this.setState({
      [e.target.name]: `${e.target.value}`
    })
  }
  onHandleSubmit () {
     var startDate = this.state.startDate;
     var endDate = this.state.endDate;
     this.getInitialData(startDate, endDate);
  }
  formatData (obj) {
    var newObj = {
      labels:Object.keys(obj.bpi),
      datasets: [{
        label : 'bitcoin price chart in USD',
        data: Object.values(obj.bpi)
      }]
    };

    return newObj;
  }

  render () {
    return (
      <div>
        <h4>Bitcoin Price Chart</h4>
        <div>Start Date <input placeholder='yyyy-mm-dd' onChange={this.onHandleChange} name='startDate' />&#9203;</div>
        <div>End date  <input placeholder='yyyy-mm-dd' onChange={this.onHandleChange} name='endDate' />&#9203;</div>
        <button onClick={this.onHandleSubmit}>Submit</button>
        <div>{this.state.toggleChart && <Chart data={this.state.chartData} />} <p>"Powered by CoinDesk"</p></div>

      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));