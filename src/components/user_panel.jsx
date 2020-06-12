import React, { Component } from 'react';
import './../App.css';
import Popup from "reactjs-popup";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

class UserPanel extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            results: '',
            loading: false,
            // error: '',
        }
    }

    async formHandler(values) {
        let currentComponent = this;
        currentComponent.setState({loading: true});
        // e.preventDefault();
            await axios.post('/api/register', values)
            .then(function(response) {
                const _results = response.data;
                currentComponent.setState({loading: false})
                currentComponent.setState({results: _results})
            })
            .catch(function(error){
                currentComponent.setState({loading: false})
                currentComponent.setState({results: error.response.data.message})
                console.log(error.response)
            });
    }
    
    
    render() {        
    let content = 
        <div>
            <hr className = "mb-3"></hr>
            <h3 className="mb-2">Register</h3> 
            <hr></hr>
            <Formik
                initialValues={{ username: '', password: '', email: ''}}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } 
                    
                    else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}

                onSubmit= { (values, { setSubmitting }) => {
                    setTimeout(() => {
                        this.formHandler(values);
                        setSubmitting(false);
                    }, 400);
                }}
            >
            {({ isValid, dirty }) => (
            <div>
                <Form className =  "registrationForm">
                    <Field type="username" name="username" placeHolder = "Your username." className = "inputFields"/>
                    <ErrorMessage name="email" component="span"/>
                    <Field type="email" name="email" placeHolder = "Your email." className = "inputFields"/>
                    <ErrorMessage name="email" component="div"/>
                    <Field type="password" placeHolder = "Your password." name = "password" className = "inputFields" />
                    <ErrorMessage name="password" component="div"/>
                    <Popup modal 
                        // contentStyle = {{ "maxWidth": "500px", "maxHeight": "100%", "overflowY" :"auto","overflowX" :"hidden", "width": "100%", "text-align": "center", "border-radius": "20px", } }
                        trigger = {<button type="submit" className = "inputFields submit" disabled={!(isValid && dirty)}>Submit</button>}>
                        {modal => ( 
                            <>{ this.state.results } <a href className="close" onClick={modal}>x</a></>
                        )}
                    </Popup>
                </Form>
            </div>
            )}
            </Formik>
        <hr></hr>
        </div>
    ;
    let login_status;

        return(
            <>
            <Popup modal 
                contentStyle = {{ "maxWidth": "500px", "maxHeight": "80%", "overflowY" :"auto","overflowX" :"hidden", "width": "100%", "text-align": "center" } }
                trigger= {< a href = "#register" className = "nav-link nav-link-active">Register</a> } >
                {modal => ( 
                    <>{ content } <a href className="close" onClick={modal}>x</a></>
                )}
            </Popup> 
        </> 
        );
    }
  }
  
  export default UserPanel; 