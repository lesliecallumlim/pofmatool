/**
 * Component to display the search bar to allow users to search for past 
 * analysed records based on the platform.
 */

import React, { Component } from 'react';
//Utilize spinner library as a loading visual while search function runs in the background
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios';
import './../App.css';
//Utilize reactjs-pop library for the pre-built popup visual
import Popup from "reactjs-popup";

//Initialize states with empty/null values
class SearchRecords extends Component {
    constructor(props) {
        super(props);
        this.onBtnClick = this.onBtnClick.bind(this);	
        this.state = { 
            searchString: '',
            results: [],        
            platform: 'All',
            loading: false,
            sentiment: '',
            modalClosed: false,
        }
    }

    //Setting the search state to the value of the search button
    //which then triggers the formhandler
    inputChangeHandler(e) {
        this.setState({searchString: e.target.value });
    }

    //Setting the platform state to the value of the dropdown selected
    onPlatformSelect = (e) => {
        this.setState({platform: e.target.value})
    }

    //Function to close the popup and re-render the component on the index.js screen
    onBtnClick(){	
        this.setState({modalClosed: true});	
        this.props.rerenderParentCallback();	
    }

    //Function that calls the backend api to retrieve past analysed data based on selected platform
    formHandler(e) {
        let currentComponent = this;
        currentComponent.setState({loading: true});
        //Setting JSON Payload parameter data
        const _platform = this.state.platform;
        const _search_string = this.state.searchString;
        //Perform GET Request to api endpoint /api/searchRecords with JSON Payload data
        axios.get('/api/searchRecords', {params: {platform: _platform, search_string: _search_string}})
            .then(function(response) {
                //Setting the state data and results data from the response received from the API
                const _results = response.data.results;
                currentComponent.setState({loading: false})
                currentComponent.setState({results: _results})
            })
            .catch(function(error){
                currentComponent.setState({loading: false})
                currentComponent.setState({results: error.response.data})
            });
    }
    //Method to map state data into table fields for past search analyses based on selected platform
    renderTableData() {
        return this.state.results.map((all_data) => {
           const { date_added, fraud, id, platform, sentiment, fraud_probability, text, url, username_submitted} = all_data //destructuring
           const fraudProbability = Math.round(fraud_probability * 100)
           return (
              <tr key={id}>
                <td>{platform}</td>
                 <td>{url}</td>
                 <td>{username_submitted}</td>
                 <td>{sentiment}</td>
                 <td className = "truncate">{text}</td>
                 <td>{fraud} - {fraudProbability}%</td>
                 <td>{date_added}</td>
              </tr>
           )
        })
      }
    //Render the search records component
    render() {
        let content;
        if (!this.state.results == "") {
            //HTML codes for table header
            var all_records = 
            <>
            <hr></hr>
            <h3 >Your results</h3> 
            <hr style = {{ "margin-top": "-0.1em"}}></hr>
            <div className = 'table-responsive history' style = {{"maxHeight": "30%", "overflowY" :"auto","overflowX" :"hidden"}}>
            <table id='history' className = 'table-hover table' >
                <tbody>
                <tr>
                    <th>Platform</th>
                    <th>URL</th>
                    <th>User</th>
                    <th>Sentiments</th>
                    <th>Text</th>
                    <th>Falsehood (%)</th>
                     <th>Date Added</th>
                </tr>
                    {this.renderTableData()}
                </tbody>        
            </table>
            </div>
            </>;
        }
        //Spinner loading visual while API request is still loading
        if (this.state.loading) {
            content = 
            <div>
                <hr className = "mb-3"></hr>
                <h3 className="mb-2">Your result </h3> 
                <hr style = {{ marginTop: "-0.1em"}}></hr>
                <Spinner animation="grow" variant="dark">
                <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        }
        
        return(
            //More HTML Codes for dropdown selection and Popup Modal
            <div>
            <div className="input-group">
                    <input type="text" name="search" className="form-control" 
                           placeholder="Search for past analysed records!" 
                           onChange={(e) => this.inputChangeHandler.call(this, e)} 
                           value={this.state.search} 
                    />
                    <select className = "form-control" style = {{"maxWidth" : "20%"}} id="dropDown" onClick = {this.onPlatformSelect}>
                        <option className="dropdown-item" value="All" 
                           onChange={(e) => this.inputChangeHandler.call(this, e)} >All</option>
                        <option className="dropdown-item" value="Facebook"
                           onChange={(e) => this.inputChangeHandler.call(this, e)} >Facebook</option>
                        <option className="dropdown-item" value="Twitter"
                           onChange={(e) => this.inputChangeHandler.call(this, e)} >Twitter</option>
                        <option className="dropdown-item" value="Instagram"
                           onChange={(e) => this.inputChangeHandler.call(this, e)} >Instagram</option>
                        <option className="dropdown-item" value="LinkedIn"
                           onChange={(e) => this.inputChangeHandler.call(this, e)} >LinkedIn</option>
                        <option className="dropdown-item" value="User"
                           onChange={(e) => this.inputChangeHandler.call(this, e)} >User</option>
                    </select>
                    
                <div>
                    <Popup modal
                       contentStyle = {{ "maxWidth": "70%", "maxHeight": "80%", "overflowY" :"auto","overflowX" :"hidden", "width": "100%", "textAlign": "center" } }
                       trigger= {<span><button type="submit" className = "btn btn-primary" onClick = {this.formHandler.bind(this)}><i className="fa fa-search"></i></button></span> } >
                        {close => ( 
                            <>
                                { all_records } 
                                <a className="close" onClick={(e) => {close(); window.location.reload(false)}}>x</a>
                            </>
                        )}
                    </Popup> 
                </div> 
                </div> 
            </div> 
        );
    }
  }
  
  export default SearchRecords; 