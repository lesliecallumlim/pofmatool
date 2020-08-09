/**
 * Component to display the User Panel to allow users to register or login 
 */
import React, { Component } from 'react';
import './../App.css';
//Utilize reactjs-pop library for the pre-built popup visual
import Popup from "reactjs-popup";
//Utilize formik library for the pre-built form builder
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

//Initialize states with empty/null values
class UserPanel extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            results: '',
            loading: false,
            isLoggedIn: false
        }
    }
    //Function to determine whether user wants to login or register based on the type parameter and 
    //relevant data in the values parameter
    async formHandler(values, type) {
        let currentComponent = this;
        currentComponent.setState({loading: true});
        // e.preventDefault();
        let api_url;
        api_url = type === 'login' ? 'login' : 'register';
        
        //Perform POST Request to API Endpoint /api/ register OR login
        await axios.post('/api/' + api_url, values)
        .then(function(response) {
            //Setting state data with response from API
            const _results = response.data;
            currentComponent.setState({loading: false})
            currentComponent.setState({results: _results.message})
            //If user is logged in, JWT token will be included in response header.
            //Store the JWT Token in localstorage for subsequent retrieval.
            if (api_url === 'login') {
                localStorage.setItem('token', _results.token);
                if (_results.token !== '') { localStorage.setItem('loggedIn', true); 
                                            window.location.reload(false)} //To refactor
            }
        })
        .catch(function(error){
            currentComponent.setState({loading: false})
            currentComponent.setState({results: error.response.data.message})
        })
    }
    //Function that triggers when component is rendered.
    //Setting state data to determine if user is logged-in or not.
    componentDidMount() {
        const loggedIn = localStorage.getItem('loggedIn') === 'true';
        if (loggedIn === true)
            this.setState({ isLoggedIn: true});
        else
            this.setState({isLoggedIn: false})
    }
    //Logout function to remove token from localstorage
    //and set isLoggedIn state data to false
    logOut() {
        localStorage.setItem('loggedIn', false);
        localStorage.removeItem('token');
        this.setState({isLoggedIn: false});
        window.location.reload(false)
    }
    //Render user panel component
    render() {        
    let registration = 
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

                    else if (!values.username) {
                        errors.username = 'Required'
                    }

                    else if (values.password !== values.verify_password) {
                        errors.password = 'Please check your password!'
                    }

                    return errors;
                }}

                onSubmit= { (values, { setSubmitting }) => {
                    setTimeout(() => {
                        this.formHandler(values, 'register');
                        setSubmitting(false);
                    }, 400);
                }}
            >
            {({ isValid, dirty }) => (
            //HTML Codes for Reggistration form
            <div>
                <Form className =  "registrationForm">
                    <Field type="username" name="username" placeHolder = "Your username." className = "inputFields"/>
                    <ErrorMessage name="username" component="span"/>
                    <Field type="email" name="email" placeHolder = "Your email." className = "inputFields"/>
                    <ErrorMessage name="email" component="div"/>
                    <Field type="password" placeHolder = "Your password." name = "password" className = "inputFields" />
                    <ErrorMessage name="password" component="div"/>
                    <Field type="password" placeHolder = "Verify password." name = "verify_password" className = "inputFields" />
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
    
    let login = 
    //HTML Codes for Login form
    <div>
            <hr className = "mb-3"></hr>
            <h3 className="mb-2">Login</h3> 
            <hr></hr>
            <Formik
                initialValues={{ username: '', password: ''}}
                validate={values => {
                    const errors = {};
                    if (!values.username) {
                        errors.username = 'Required';
                    } 
                    if (!values.password) {
                        errors.password = 'Required';
                    } 
                    return errors;
                }}

                onSubmit= { (values, { setSubmitting }) => {
                    //window.location.reload(false)
                    setTimeout(() => {
                        this.formHandler(values, 'login');
                        setSubmitting(false);
                    }, 700); 
                }}
            >
            {({ isValid, dirty }) => (
            <div>
                <Form className =  "registrationForm"> 
                    <Field type="username" name="username" placeHolder = "Your username." className = "inputFields"/>
                    <ErrorMessage name="username" component="div"/>
                    <Field type="password" placeHolder = "Your password." name = "password" className = "inputFields" />
                    <ErrorMessage name="password" component="div"/>
                    <Popup modal 
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
    //Trigger the popup with the registration form
    var register_link = 
        <Popup modal 
                contentStyle = {{ "maxWidth": "500px", "maxHeight": "80%", "overflowY" :"auto","overflowX" :"hidden", "width": "100%", "text-align": "center" } }
                trigger= {< a href = "#register" className = "nav-link ">Register</a> } >
                {modal => ( 
                <>{ registration } <a href className="close" onClick={modal}>x</a></>
                )}
        </Popup>
    ;
    //Trigger the popup with the login form
    var login_link = 
        <Popup modal 
                contentStyle = {{ "maxWidth": "500px", "maxHeight": "80%", "overflowY" :"auto","overflowX" :"hidden", "width": "100%", "text-align": "center" } }
                trigger= {< a href = "#login" className = "nav-link ">Login</a> } >
                {modal => ( 
                <>{ login } <a href className="close" onClick={modal}>x</a></>
                )}
        </Popup>
    ;

    if (this.state.isLoggedIn) { 
        return(<><a href = "#logout" className = "nav-link nav-link-active" onClick = {this.logOut.bind(this)}>Logout</a></>) 
    }
    else { 
        return(<div className ="dropdown">
                <button  className ="dropbtn">User Panel</button>
                    <div  className ="dropdown-content">
                        {register_link}{login_link}  
                    </div>
                </div>); 
    }
 }
}

export default UserPanel;