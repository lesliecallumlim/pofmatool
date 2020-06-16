import React, {Component} from 'react';
import axios from 'axios';

class Records extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_data: [],
      user_data: [],
      isLoading: false,
      error: null,
      refresh: false,
      hasValidToken: false,
    };
  }
 
  async componentDidMount() {
    this.setState({isLoading : true});
    try {
      const result = await axios.get('/api/history');
      this.setState({ all_data : result.data, isLoading: false});

      const token = localStorage.getItem('token');
      if (token !== null) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        var user_result = await axios.get('/api/submitted', config);
        this.setState({ user_data : user_result.data.past_submissions, isLoading: false});
        this.setState({ hasValidToken : true})
      }
      
    }
    catch (error) {
      this.setState({ error, isLoading: false});
    }
  }

  // checkToken() {
  //   this.setState({hasValidToken: true})
  // }

  renderTableData() {
    return this.state.all_data.map((all_data) => {
       const { date_added, fraud, id, platform, sentiment, text, url, username_submitted} = all_data //destructuring
       return (
          <tr key={id}>
            <td>{platform}</td>
             <td>{url}</td>
             <td>{username_submitted}</td>
             {/* <td>{text}</td> */}
             <td>{sentiment}</td>
             <td>{fraud}</td>
             <td>{date_added}</td>
          </tr>
       )
    })
  }

  renderUserData() {
    return this.state.user_data.map((user_data ) => {
       const { date_added, fraud, id, platform, sentiment, text, url, username_submitted} = user_data    //destructuring
       return (
          <tr key={id}>
            <td>{platform}</td>
             <td>{url}</td>
             <td>{username_submitted}</td>
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
    this.renderUserData();
  }

  render() {
    const { data, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    //TODO: Rewrite this hot garbage
    var all_records = 
      <div className = 'table-responsive' style = {{"maxHeight": "50%", "overflowY" :"auto","overflowX" :"hidden"}}>
        <table id='history' className = 'table-hover table' >
            <tbody>
            <tr>
              {/* Maybe make this dynamic? */}
              <th>Platform</th>
              <th>URL</th>
              {/* <th>Text</th> */}
              <th>By User</th>
              <th>Sentiments</th>
              <th>Falsehood</th>
              <th>Date Added</th>
            </tr>
              {this.renderTableData()}
            </tbody>
        </table>
      </div>;

    var user_records = 
      <div className="mb-5 w-100">
        <h2 className="mb-5">Your past analyses</h2>
        <div className = 'table-responsive' style = {{"maxHeight": "50%", "overflowY" :"auto","overflowX" :"hidden"}}>
          <table id='history' className = 'table-hover table' >
              <tbody>
              <tr>
                {/* Maybe make this dynamic? */}
                <th>Platform</th>
                <th>URL</th>
                {/* <th>Text</th> */}
                <th>User</th>
                <th>Sentiments</th>
                <th>Falsehood</th>
                <th>Date Added</th>
              </tr>
                {this.renderUserData()}
              </tbody>
          </table>
        </div>
      </div>;

    if (this.state.hasValidToken) {
      return ( 
        <>
          {all_records}
          <hr></hr>
          {user_records}
        </>
      );
    }
    else {
      return (<>{all_records}</>);
    }
  }
}

export default Records;