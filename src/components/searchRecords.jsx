import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios';
import './../App.css';
import Popup from "reactjs-popup";

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

    inputChangeHandler(e) {
        this.setState({searchString: e.target.value });
    }

    onPlatformSelect = (e) => {
        this.setState({platform: e.target.value})
    }

    onBtnClick(){	
        this.setState({modalClosed: true});	
        this.props.rerenderParentCallback();	
    }


    formHandler(e) {
        let currentComponent = this;
        currentComponent.setState({loading: true});

        const _platform = this.state.platform;
        const _search_string = this.state.searchString;
        axios.get('/api/searchRecords', {params: {platform: _platform, search_string: _search_string}})
            .then(function(response) {
                const _results = response.data;
                currentComponent.setState({loading: false})
                currentComponent.setState({results: _results})
            })
            .catch(function(error){
                console.log(error.response.data)
                currentComponent.setState({loading: false})
                currentComponent.setState({results: error.response.data})
            });
    }

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
    
    render() {
        let content;
        if (!this.state.results == "") {
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
            <div>
            <div className="input-group">
                    <input type="text" name="search" className="form-control" 
                           placeholder="Search for past analysed records!" 
                           onChange={(e) => this.inputChangeHandler.call(this, e)} 
                           value={this.state.search} 
                    />
                    <select className = "form-control" style = {{"max-width" : "20%"}} id="dropDown" onClick = {this.onPlatformSelect}>
                        <option className="dropdown-item" value="All">All</option>
                        <option className="dropdown-item" value="Facebook">Facebook</option>
                        <option className="dropdown-item" value="Twitter">Twitter</option>
                        <option className="dropdown-item" value="Instagram">Instagram</option>
                        <option className="dropdown-item" value="LinkedIn">LinkedIn</option>
                        <option className="dropdown-item" value="User">User</option>
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