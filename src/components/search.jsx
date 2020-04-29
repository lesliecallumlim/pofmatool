import React, { Component } from 'react';
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
        }
    }


    inputChangeHandler(e) {
        this.setState({search: e.target.value });
    }

    formHandler(e) {
        let currentComponent = this;
        e.preventDefault();
        const formFields = this.state;
        axios.post('/evaluate', formFields)
            .then(function(response) {
                const _results = response.data;
                currentComponent.setState({results: _results.results})
                currentComponent.setState({url: _results.url})
            })
            .catch(function(error){
                currentComponent.setState({results: error})
            })
        ;
    }

    render() {
        let analysis;
        if (!this.state.results == "")
        {
            // Let's show certain elements only when used  
            analysis = 
                <div>
                    <hr className = "mb-3"></hr>
                    <h3 className="mb-2">Your result </h3> 
                    <h4>Link Entered: </h4>
                    <p>{this.state.url}</p>
                    <h4>Text: </h4>
                    <p>{this.state.results}</p>
                    <h4>Falsehood Possibility: </h4>
                    <p>{this.state.percentage}%</p>
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