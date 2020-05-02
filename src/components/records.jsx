import React, {Component} from 'react';
import axios from 'axios';

class Records extends Component {
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
      const result = await axios.get('/api/history');
      console.log(result)
      this.setState({ data : result.data, isLoading: false});
    }
    catch (error) {
      this.setState({ error, isLoading: false});
    }
  }

  renderTableData() {
    return this.state.data.map((data, index) => {
       const { date_added, fraud_probability, id, platform, sentiment, text, url } = data //destructuring
       return (
          <tr key={id}>
             <td>{platform}</td>
             <td>{url}</td>
             {/* <td>{text}</td> */}
             <td>{sentiment}</td>
             <td>{fraud_probability}%</td>
             <td>{date_added}</td>
          </tr>
       )
    })
 }


  render() {
    const { data, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return ( 
        <div className = 'table-responsive'>
          <table id='history' className = 'table-hover table' >
              <tbody>
              <tr>
                {/* Maybe make this dynamic? */}
                <th>Platform</th>
                <th>URL</th>
                {/* <th>Text</th> */}
                <th>Sentiments</th>
                <th>Falsehood (%)</th>
                <th>Date Added</th>
              </tr>
                {this.renderTableData()}
              </tbody>
          </table>
        </div>
    )
  }
}

export default Records;