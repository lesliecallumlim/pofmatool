import React, {Component} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios';


class ResultChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      error: null,
    };
  }
 
  async componentDidMount() {
    this.setState({isLoading : true});
    try {
      const result = await axios.get('/results');
      this.setState({ data : result.data.results, isLoading: false});
    }
    catch (error) {
      this.setState({ error, isLoading: false});
    }
  }

  render() {
    const { data, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    // A bit spaghetti - to refactor
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
      
      xAxis: { categories: platforms},
      yAxis: { min: 0, max: 100, title: { text: 'Percentage of Fake/Real News' }, labels: { formatter: function() { return this.value + '%'; } }},
      
      plotOptions: { 
        column: { 
          dataLabels: { enabled: true, style: { textOutline: false }, formatter: function() { return this.y + '%'; } },
                stacking: 'normal',
        },

      credits: { enabled: false },

      },
      tooltip: { formatter: function() { return this.series.name + ": " + this.y + "%"; }},
    }
    
    return ( 
      <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />)
  }
}

  export default ResultChart;