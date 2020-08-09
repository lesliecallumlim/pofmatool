/**
 * Component to display the search bar whereby users can enter a URL 
 * on the search bar to perform a rumor check.
 */

import React, { Component } from 'react';
//Utilize spinner library as a loading visual while search function runs in the background
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios';
import './../App.css';
//Utilize reactjs-pop library for the pre-built popup visual
import Popup from "reactjs-popup";

//Initialize states with empty/null values
class Search extends Component {
    constructor(props) {
        super(props);
        this.onBtnClick = this.onBtnClick.bind(this);	
        this.state = { 
            search: '',
            results: '',            
            url: '',
            fraud: '', 
            loading: false,
            sentiment: '',
            modalClosed: false,
            fraudProbability: '',
            searchID: '',
            token: '',
            feedback_data: '',
        }
    }

    //Setting the search state to the value of the search button
    //which then triggers the formhandler
    inputChangeHandler(e) {
        this.setState({search: e.target.value });
    }

    //Function to close the popup and re-render the component on the App.js screen
    onBtnClick(){	
        this.setState({modalClosed: true});	
        this.props.rerenderParentCallback();	
    }
    
    //Function that calls the backend api to perform the rumor check in the backfround
    formHandler(e) {
        let currentComponent = this;
        currentComponent.setState({loading: true});
        e.preventDefault();
        //Getting token from local storage
        const token = localStorage.getItem('token');
        var auth;
        if (token == null) { auth = ""; }
        else { 
            auth = `Bearer ${token}`
            currentComponent.setState({token: token}) 
        }

        //Passing JWT token into header for POST request
        const config = {
            headers: { 
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `${auth}`
            },
            // data: {},
        };

        const formFields = this.state;
        //Perform a post request to API endpoint /api/evaluate with the state data as
        //JSON payload which will have a response of the rumor detection result.
        axios.post('/api/evaluate', formFields, config)
            //Setting the state data and results data from the response received from the API
            .then(function(response) {
                const _results = response.data;
                currentComponent.setState({loading: false})
                currentComponent.setState({results: _results.results})
                currentComponent.setState({url: _results.url})
                currentComponent.setState({sentiment: _results.sentiment})
                currentComponent.setState({fraud: _results.fraud})
                currentComponent.setState({searchID: _results.id})
                currentComponent.setState({fraudProbability: Math.round(_results.fraud_probability * 100)})
            })
            .catch(function(error){
                currentComponent.setState({loading: false})
                currentComponent.setState({results: error.response.data.message})
            });
    }

    //Function that allows user to provide feedback after performing the rumor check
    async addFeedback(e) {
        var auth;
        var currentComponent = this;
        //Checking for JWT token
        if(this.state.token === ''){ auth = ""; }
        else { auth = `Bearer ${this.state.token}` }

        const searchID = this.state.searchID;
        //Passing JWT token into header for POST request
        const config = {
            headers: { 
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${this.state.token}` 
        }};
        //Setting JSON payload with user's specified data in the feedback field
        const params = {"feedback_string": e.target.value, "id": searchID};
        //Perform POST request to API endpoint /api/provideFeedback with JWT header and JSON payload data
        axios.post('/api/provideFeedback', params, config)
            .then(function(response) {
                //Setting state data with response's feedback data.
                currentComponent.setState({feedback_data: response.data.message});
            })
            .catch(function(error) {
                currentComponent.setState({feedback_data: error.response.data.message});
            });
    }

    //Render the search feature component
    render() {
        let content;
        if (this.state.results !== "") {
            // Let's show certain elements only when used  
            const sentiment_colors = { 'Positive' : 'success', 'Negative' : 'danger' };
            const fraud_colors = { 'Real' : 'success', 'Fake' : 'danger' };

            if (this.state.sentiment !== '') {
            //HTML codes for Popup Modal during search and after search for feedback
                content = 
            <div>
                <hr></hr>
                    <h3 >Your result</h3> 
                    <hr style = {{ "marginTop": "-0.1em"}}></hr>
                    <h4>Link Entered: </h4>
                    <p>{this.state.url}</p>
                    <h4>Keywords: </h4>
                    <p>{this.state.results}</p>
                    <h4>Falsehood:</h4>
                    <span style={{textTransform: 'capitalize'}} className ={"badge p-2 mr-1 mb-3 badge-" + fraud_colors[this.state.fraud]}>{this.state.fraud} - {this.state.fraudProbability}%</span>
                    <h4>Sentiments: </h4>  
                    <span className ={"badge p-2 mr-1 mb-3 badge-" + sentiment_colors[this.state.sentiment]}>{ this.state.sentiment }</span>
                    <h4>What do you think?</h4>

                    <Popup modal
                       contentStyle = {{ "maxWidth": "500px", "maxHeight": "80%", "overflowY" :"auto","overflowX" :"hidden", "width": "80%", "textAlign": "center" } }
                       trigger= {<span><button className = "btn badge badge-success p-2 mr-1 mb-3" value = 'Great' onClick = {this.addFeedback.bind(this)}>Excellent!</button></span> } >
                        {close => ( 
                            <> <span>{this.state.feedback_data}</span> <a className="close" onClick={(e) => { close(); window.location.reload(false) }}>x </a></>
                        )}
                    </Popup> 
                    <Popup modal
                       contentStyle = {{ "maxWidth": "500px", "maxHeight": "80%", "overflowY" :"auto","overflowX" :"hidden", "width": "80%", "textAlign": "center" } }
                       trigger= {<span><button className = "btn badge badge-warning p-2 mr-1 mb-3" value = 'Neutral' onClick = {this.addFeedback.bind(this)}>Neutral</button></span> } >
                        {close => ( 
                            <> <span>{this.state.feedback_data}</span> <a className="close" onClick={(e) => { close(); window.location.reload(false) }}>x </a></>
                        )}
                    </Popup> 
                    <Popup modal
                       contentStyle = {{ "maxWidth": "500px", "maxHeight": "80%", "overflowY" :"auto","overflowX" :"hidden", "width": "80%", "textAlign": "center" } }
                       trigger= {<span><button className = "btn badge badge-dark p-2 mr-1 mb-3" value = 'Poor' onClick = {this.addFeedback.bind(this)}>Terrible!</button></span> } >
                        {close => ( 
                            <> <span>{this.state.feedback_data}</span> <a className="close" onClick={(e) => { close(); window.location.reload(false) }}>x </a></>
                        )}
                    </Popup> 
                    <hr></hr>
            </div>
            }
            else {
                content =  
                <div>
                    <hr></hr>
                        <h3 >Your result</h3> 
                        <hr style = {{ "marginTop": "-0.1em"}}></hr>
                        <h4>Link Entered: </h4>
                        <p>{this.state.url}</p>
                        <h4>Error: </h4>
                        <p>{this.state.results}</p>
                        <hr></hr>
                </div>
            }
        }
        
        if (this.state.loading) {
            content = 
            <div>
                <hr className = "mb-3"></hr>
                <h3 className="mb-2">Your result </h3> 
                <hr style = {{ "marginTop": "-0.1em"}}></hr>
                <Spinner animation="grow" variant="dark">
                <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        }
        
        return(
            <div>
                <div className="input-group">
                        <input type="text" name="search" className="form-control" placeholder="Validate your results today!" onChange={(e) => this.inputChangeHandler.call(this, e)} value={this.state.search} />
                    <div>
                    <Popup modal
                       contentStyle = {{ "maxWidth": "500px", "maxHeight": "80%", "overflowY" :"auto","overflowX" :"hidden", "width": "80%", "textAlign": "center" } }
                       trigger= {<span><button type="submit" className = "btn btn-primary" onClick = {this.formHandler.bind(this)}><i className="fa fa-search"></i></button></span> } >
                       {close => ( 
                           <>{ content } <a className="close" onClick={(e) => { close(); window.location.reload(false) }}>x</a></>
                        )}
                    </Popup> 
                </div> 
                </div> 
            </div> 
        );
    }
  }
  
  export default Search; 