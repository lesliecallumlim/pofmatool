/**
 * Component to display statistics in Charts on the results of each platform.
 */

import React, {Component} from 'react';
//Import charts library 
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios';

class ResultChart extends Component {
  //Initialize states with empty/null values
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      error: null,
    };
  }
 
  /**
   * When component is mounted, perform a get request by calling the API endpoing /api/results 
   * Set data state with the response data.
   */
  async componentDidMount() {
    this.setState({isLoading : true});
    try {
      const result = await axios.get('/api/results');
      this.setState({ data : result.data.results, isLoading: false});
    }
    catch (error) {
      this.setState({ error, isLoading: false});
    }
  }

  /**
   * Render the component for the charts with corresponding data received from /api/results
   */
  render() {
    const { data, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    // TODO: To refactor
    let platforms = []; let fake_news = [];  let real_news = [];
    Object.keys(data).forEach(function(key) {
      platforms.push(data[key]['platform']);
      fake_news.push(data[key]['fake_news']);
      real_news.push(data[key]['real_news']);
    });

    const options = {
      title: { text: 'Number of falsehoods in the various social media platforms' },
      chart : { type: 'column'},
      series: [ 
        { name: 'Fake News', color: '#FB9039', data: fake_news },
        { name: 'Real News', color: '#1F3044', data: real_news }
      ],
      
      credits: false,
      
      xAxis: { categories: platforms},
      yAxis: { min: 0, max: 100, title: { text: 'Percentage of Fake/Real News' }, labels: { formatter: function() { return this.value + '%'; } }},
      
      plotOptions: { 
        column: { 
          dataLabels: { enabled: true, style: { textOutline: false }, formatter: function() { return this.y; } },
          stacking: 'percent'
        }
      },
      tooltip: {  pointFormat: '({point.percentage:.0f}%)'
      } 
    }
    
    return ( 
      <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />)
  }
}

export default ResultChart;