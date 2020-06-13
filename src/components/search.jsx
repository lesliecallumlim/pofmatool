import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios';
import './../App.css';
// import Popover from 'react-simple-popover';
import Popup from "reactjs-popup";


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
            modalClosed: false
        }
    }

    onBtnClick(){
        this.setState({modalClosed: true});
        this.props.rerenderParentCallback();
    }

    inputChangeHandler(e) {
        this.setState({search: e.target.value });
    }

    // refreshPage = () => {
    //     window.location.reload(false);
    // }

    formHandler(e) {
        let currentComponent = this;
        currentComponent.setState({loading: true});
        e.preventDefault();
        const formFields = this.state;
        axios.post('/api/evaluate', formFields)
            .then(function(response) {
                const _results = response.data;
                currentComponent.setState({loading: false})
                currentComponent.setState({results: _results.results})
                currentComponent.setState({url: _results.url})
                currentComponent.setState({sentiment: _results.sentiment})
                currentComponent.setState({fraud: _results.fraud})
            })
            .catch(function(error){
                currentComponent.setState({loading: false})
                currentComponent.setState({results: error})
            });
    }

    render() {
        let content;
        if (!this.state.results == "") {
            // const sentimentList =  this.state.sentiments;
            // Let's show certain elements only when used  
            var sentiment_color;
            if (this.state.sentiment == 'Positive') {
                sentiment_color = 'success'
            } 
            else {
                sentiment_color = 'danger'
            }

            var fraud_color;
            if (this.state.fraud === 'Real') {
                fraud_color = 'success'
            } 
            else {
                fraud_color = 'danger'
            }
            if (!this.state.sentiment == '') {
            content = 
            <div>
                <hr></hr>
                    <h3 >Your result</h3> 
                    <hr style = {{ "margin-top": "-0.1em"}}></hr>
                    <h4>Link Entered: </h4>
                    <p>{this.state.url}</p>
                    <h4>Keywords: </h4>
                    <p>{this.state.results}</p>
                    <h4>Falsehood:</h4>
                    <span style={{textTransform: 'capitalize'}} className ={"badge p-2 mr-1 mb-3 badge-" + fraud_color}>{this.state.fraud}</span>
                    <h4>Sentiments: </h4>  
                    <span className ={"badge p-2 mr-1 mb-3 badge-" + sentiment_color}>{this.state.sentiment }</span>
                    <h4>What do you think?</h4>
                    <button className = "btn badge badge-success p-2 mr-1 mb-3">Excellent!</button>
                    <button className = "btn badge badge-warning p-2 mr-1 mb-3">More work to be done!</button>
                    <button className = "btn badge badge-dark p-2 mr-1 mb-3">Terrible!</button> 
                    <hr></hr>
            </div>
            }
            else {
                content =  //TODO: Rewrite this - the elements will not render proper if appended to the string, tenaries don't work because of the jsx adjacent element issues
                <div>
                    <hr></hr>
                        <h3 >Your result</h3> 
                        <hr style = {{ "margin-top": "-0.1em"}}></hr>
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
                <hr style = {{ "margin-top": "-0.1em"}}></hr>
                <Spinner animation="grow" variant="dark">
                <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        }
        
        return(
            <div>
                <div className="input-group">
                        {/* TODO: Add validation of the link */}
                        <input type="text" name="search" className="form-control" placeholder="Validate your results today!" onChange={(e) => this.inputChangeHandler.call(this, e)} value={this.state.search} />
                    <div>
                    <Popup modal
                       contentStyle = {{ "maxWidth": "500px", "maxHeight": "80%", "overflowY" :"auto","overflowX" :"hidden", "width": "80%", "text-align": "center" } }
                       trigger= {<span><button type="submit" className = "btn btn-primary" onClick = {this.formHandler.bind(this)}><i className="fa fa-search"></i></button></span> } >
                        {close => ( 
                            <>{ content } <a 
                                            className="close" 
                                            onClick={(e) => {
                                                close()
                                                window.location.reload(false)
                                            }}>x
                                            </a></>
                        )}
                    </Popup> 
                </div> 
                </div> 
            </div> 
        );
    }
  }
  
  export default Search; 