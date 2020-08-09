/**
 * Component to display the trending searches on the platform.
 */
import React, {Component} from 'react';
import axios from 'axios';

//Initialize states with empty/null values

class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trending_data: [],
      isLoading: false,
      error: null,
      refresh: false,
    };
  }
  //Function that is triggered when component is rendered onto mainpage (App.js)
  async componentDidMount() {
    this.setState({isLoading : true});
    try {
      //Perform GET Request to API endpoint /api/trending and set trending_data in state with response data
      const result = await axios.get('/api/trending');
      this.setState({ trending_data : result.data.results, isLoading: false});
    }
    catch (error) {
      this.setState({ error, isLoading: false});
    }
  }
  //Function to map and populate data from trending_data into the trending table
  renderTableData() {
    return this.state.trending_data.map((trending_data) => {
       const { id, platform, url, sentiment, fraud, fraud_probability, date_added, count} = trending_data //destructuring
       const fraudProbability = Math.round(fraud_probability * 100)
       return (
          <tr key={id}>
            <td>{platform}</td>
             <td>{url}</td>
             <td>{sentiment}</td>
             <td>{fraud} - {fraudProbability}%</td>
             <td>{date_added}</td>
             <td>{count}</td>
          </tr>
       )
    })
  }

  refresh() {
    this.setState ({ refresh: true });
    this.renderTableData();
  }
  //Render the trending component
  render() {
    const { isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }
    var trending_all = 
    //HTML codes for table header
      <div className = 'table-responsive history' style = {{"maxHeight": "100%", "overflowY" :"auto","overflowX" :"hidden"}}>
        <table id='history' className = 'table-hover table' >
            <tbody>
            <tr>
              <th>Platform</th>
              <th>URL</th>
              <th>Sentiments</th>
              <th>Falsehood (%)</th>
              <th>Date Added</th>
              <th>Hits</th>
            </tr>
            {this.renderTableData()}
            </tbody>        
        </table>
      </div>;

      return (<>{trending_all}</>);
  }
}

export default Trending;