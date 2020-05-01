import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios';
import './../App.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            search: '',
            results: '',            
            url: '',
            percentage: 0,
            loading: false,
            sentiments: ['hate speech', 'partisan views']
        }
    }
    inputChangeHandler(e) {
        this.setState({search: e.target.value });
    }

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
            })
            .catch(function(error){
                currentComponent.setState({loading: false})
                currentComponent.setState({results: error})
            })
        ;
    }

    render() {
        let analysis;
        if (!this.state.results == "")
        {

            const sentimentList =  this.state.sentiments;
            // Let's show certain elements only when used  
            analysis = 
                <div>
                    <hr className = "mb-3"></hr>
                    <h3 className="mb-2">Your result </h3> 
                    <h4>Link Entered: </h4>
                    <p>{this.state.url}</p>
                    <h4>Text: </h4>
                    <p>{this.state.results}</p>
                    <h4>Falsehood Probability: </h4>
                    <p>{this.state.percentage}%</p>
                    <h4>Sentiments: </h4>
                    {/* Display tag for sentiments. TODO: Classify colors based on sentiment */}
                    {   sentimentList.map(function(sentiment) {
                        return <span class="badge badge-danger p-2 mr-1 mb-3">{sentiment}</span>
                    })}
                    <h4>What do you think?</h4>
                    <button class = "btn badge badge-success p-2 mr-1 mb-3">Excellent!</button>
                    <button class = "btn badge badge-warning p-2 mr-1 mb-3">More work to be done!</button>
                    <button class = "btn badge badge-dark p-2 mr-1 mb-3">Terrible!</button>
                </div>
        }
        if (this.state.loading) {
            analysis = 
            <div>
                <hr className = "mb-3"></hr>
                <h3 className="mb-2">Your result </h3> 
                <Spinner animation="grow" variant="dark">
                <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        }
        return(
            <div>
                <div className="input-group">
                        <input type="text" name="search" className="form-control" placeholder="Validate your results today!" onChange={(e) => this.inputChangeHandler.call(this, e)} value={this.state.search} />
                        <span><button type="submit" className = "btn btn-primary" onClick = {this.formHandler.bind(this)}><i className="fa fa-search"></i></button></span>
                </div> 
                {analysis}
            </div>
        );
    }
  }
  
  export default Search;