import React, {Component} from 'react';
import axios from 'axios';

class Records extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      error: null,
      refresh: false
    };
  }
 
  async componentDidMount() {
    this.setState({isLoading : true});
    try {
      const result = await axios.get('/api/history');
      // console.log(result)
      this.setState({ data : result.data, isLoading: false});
    }
    catch (error) {
      this.setState({ error, isLoading: false});
    }
  }

  // async componentDidUpdate(prevState) {
  //   if (prevState.refresh !== this.state.refresh) {
  //     this.setState({isLoading : true});
  //     this.setState({refresh : false});
  //     try {
  //       const result = await axios.get('/api/history');
  //       console.log(result)
  //       this.setState({ data : result.data, isLoading: false});
  //     }
  //     catch (error) {
  //       this.setState({ error, isLoading: false});
  //     }
  //   }
  // }

  renderTableData() {
    return this.state.data.map((data, index) => {
       const { date_added, fraud, id, platform, sentiment, text, url } = data //destructuring
       return (
          <tr key={id}>
            <td>{platform}</td>
             <td>{url}</td>
             {/* <td>{text}</td> */}
             <td>{sentiment}</td>
             <td>{fraud}</td>
             <td>{date_added}</td>
          </tr>
       )
    })
 }
  refresh() {
    this.setState ({ refresh: true });
    this.renderTableData();
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
      <>
        <div className = 'table-responsive' style = {{"maxHeight": "50%", "overflowY" :"auto","overflowX" :"hidden"}}>
          <table id='history' className = 'table-hover table' >
              <tbody>
              <tr>
                {/* Maybe make this dynamic? */}
                <th>Platform</th>
                <th>URL</th>
                {/* <th>Text</th> */}
                <th>Sentiments</th>
                <th>Falsehood</th>
                <th>Date Added</th>
              </tr>
                {this.renderTableData()}
              </tbody>
          </table>
        </div>
        <span><button type="submit" className = "btn btn-primary" onClick = {this.refresh.bind(this)}>Refresh</button></span>
      </>
    )
  }
}

export default Records;