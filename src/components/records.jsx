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
      startPage: 1,
      lastPage: false,
      startPageForUserSubmitted: 1,
      lastPageForUserSubmitted: false
    };
  }

  async loadRecords() {
    this.setState({isLoading : true});
    try {
      const result = await axios.get('/api/history', {params: {start: this.state.startPage}});
      this.setState({ all_data : result.data.results, isLoading: false, startPage: this.state.startPage});
      if (this.state.all_data === undefined || this.state.all_data.length === 0) {
        this.setState({lastPage : true});
      }
      else {
        this.setState({lastPage : false});
      }
    }
      catch (error) {
        this.setState({ error, isLoading: false});
      }
  }

  async loadUserRecords() {
    const token = localStorage.getItem('token');
    this.setState({isLoading : true});
    try {
      if (token !== null) {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            params: {start: this.state.startPageForUserSubmitted},
        }
        var user_result = await axios.get('/api/submitted', config);
        this.setState({ user_data : user_result.data.past_submissions, isLoading: false, startPageForUserSubmitted: this.state.startPageForUserSubmitted});
        this.setState({ hasValidToken : true})
        if (this.state.user_data === undefined || this.state.user_data.length === 0) {
          this.setState({lastPageForUserSubmitted : true});
        }
        else {
          this.setState({lastPageForUserSubmitted : false});
        }
      }
    }
    catch (error) {
      this.setState({ error, isLoading: false});
    }
  }
   
  componentDidMount() {
    this.loadRecords()
    this.loadUserRecords()
  }

  onNext = (e) => {
    if (e.target.classList.contains('allRecords')) {
      this.setState({startPage: e.target.value})
    }
    else {
      this.setState({startPageForUserSubmitted: e.target.value})
    }
  }

  async componentDidUpdate(prevProps, prevState)
  {
    if (this.state.startPage !== prevState.startPage) {
      this.loadRecords();
    }
    else if (this.state.startPageForUserSubmitted !== prevState.startPageForUserSubmitted) {
      this.loadUserRecords();
    }
  }


  renderTableData() {
    return this.state.all_data.map((all_data) => {
       const { date_added, fraud, id, platform, sentiment, fraud_probability, url, username_submitted} = all_data //destructuring
       const fraudProbability = Math.round(fraud_probability * 100)
       return (
          <tr key={id}>
            <td>{platform}</td>
             <td>{url}</td>
             <td>{username_submitted}</td>
             <td>{sentiment}</td>
             <td>{fraud} - {fraudProbability}%</td>
             <td>{date_added}</td>
          </tr>
       )
    })
  }

  renderUserData() {
    return this.state.user_data.map((user_data ) => {
       const { date_added, fraud, id, platform, sentiment, fraud_probability, url, username_submitted} = user_data    //destructuring
       const fraudProbability = Math.round(fraud_probability * 100)
       return (
          <tr key={id}>
            <td>{platform}</td>
             <td>{url}</td>
             <td>{username_submitted}</td>
             <td>{sentiment}</td>
             <td>{fraud} - {fraudProbability}%</td>
             <td>{date_added}</td>
          </tr>
       )
    })
  }

  render() {
    const { isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    //TODO: Rewrite this hot garbage
    var all_records = 
      <div className = 'table-responsive' style = {{"maxHeight": "50%", "overflowY" :"auto","overflowX" :"hidden"}}>
        <table  className = 'table-hover table history' >
            <tbody>
            <tr>
              {/* Maybe make this dynamic? */}
              <th>Platform</th>
              <th>URL</th>
              {/* <th>Text</th> */}
              <th>User</th>
              <th>Sentiments</th>
              <th>Falsehood (%)</th>
              <th>Date Added</th>
            </tr>
              {this.renderTableData()}
            </tbody>        
        </table>
      </div>;

    var user_records = 
      <div>
        <h2 className="mb-5">Your past analyses</h2>
        <div className = 'table-responsive history' style = {{"maxHeight": "25%", "overflowY" :"visible","overflowX" :"hidden"}}>
          <table className = 'table-hover table history' >
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

    let btns;
    if (this.state.startPage === 1) {
      btns =  <button type="submit" className = "btn btn-primary allRecords" value = {parseInt(this.state.startPage)+1} onClick = {this.onNext}>Next</button>
    }
    else if (this.state.startPage !== 1 && this.state.lastPage === true) {
      btns =  <><button type="submit" className = "btn btn-primary allRecords" value = {parseInt(this.state.startPage)-1} onClick = {this.onNext}>Back</button></>;
    }
    else {
      btns =  <><button type="submit" className = "btn btn-primary allRecords" value = {parseInt(this.state.startPage)+1} style = {{"margin": "1px"}} onClick = {this.onNext}>Next</button>
                <button type="submit" className = "btn btn-primary allRecords" value = {parseInt(this.state.startPage)-1} onClick = {this.onNext}>Back</button></>;
    }

    let user_btns;
    if (this.state.startPageForUserSubmitted === 1) {
      user_btns = <button type="submit" className = "btn btn-primary" value = {parseInt(this.state.startPageForUserSubmitted)+1} onClick = {this.onNext}>Next</button>
    }
    else if (this.state.startPageForUserSubmitted !== 1 && this.state.lastPageForUserSubmitted === true) {
      user_btns = <><button type="submit" className = "btn btn-primary" value = {parseInt(this.state.startPageForUserSubmitted)-1} onClick = {this.onNext}>Back</button></>;
    }
    else {
      user_btns = <><button type="submit" className = "btn btn-primary" value = {parseInt(this.state.startPageForUserSubmitted)+1} style = {{"margin": "1px"}} onClick = {this.onNext}>Next</button>
                    <button type="submit" className = "btn btn-primary" value = {parseInt(this.state.startPageForUserSubmitted)-1} onClick = {this.onNext}>Back</button></>;
    }


    if (this.state.hasValidToken) {
      return ( 
        <>
          {all_records}
          <hr></hr>
          {btns}
          <hr></hr>
          {user_records}
          <hr></hr>
          {user_btns}
        </>
      );
    }
    else {
      return (<>
                {all_records}
                {btns}
              </>);
    }
  }
}

export default Records;