import React, { useState, useEffect } from 'react';
import './App.css';
// Import charts
import ResultChart from './components/charts.jsx';
import Highcharts from 'highcharts/highstock'


function App() {
  const [currentTime, setCurrentTime] = useState(0);


  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
        <a className="navbar-brand js-scroll-trigger" href="#page-top">
        <span className="d-block d-lg-none">pofma checker</span>
        <span className="d-none d-lg-block">
            <img className="img-fluid img-profile rounded-circle mx-auto mb-2" src="img/logo.png"></img>
        </span>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#methodology">Methodology</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#statistics">Statistics</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container-fluid p-0">
        <section className="resume-section p-3 p-lg-5 d-flex align-items-center" id="about">
          <div className="w-100">
            <h1 className="mb-0">POFMA
              <span className="text-primary">Checker</span>
            </h1>
            <div className="subheading mb-5">
              A rumour detection platform which seeks to identify falsehoods that widely witnessed in social media.
            </div>
            <div className="subheading mb-5">
          <p className="lead mb-5">
            With online falsehood creating distrust and unnecessary panic in our society, a social media rumour detection platform is needed to steer users away from the dissemination of fake news. 
            As such, a rumour detection platform is created in hopes to address these concerns, and reduce the number of falsehood being perpetuated in the world today.
          </p>
          </div>
          <p className="subheading mb-5"></p>
            <div className="form-group">
              <div className="input-group">
                <input type="text" name="search" className="form-control" placeholder="Validate your results today!"></input>
                <span><button type="submit" className="btn btn-primary"><i className="fa fa-search"></i></button></span>
              </div>
            </div>
          <hr className="m-2"></hr>
            <div className="social-icons">
              <a href="mailto:hello@lesliecallum.com">
                <i className="fa fa-envelope"></i>
              </a>
            </div>
          </div>
        </section>
      </div>

      <hr className="m-0"></hr>
      <section className="resume-section p-3 p-lg-5 d-flex justify-content-center" id="methodology">
      <div className="w-100">
          <h2 className="mb-5">Methodology</h2>
            <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
              <div className="resume-content">
                <h3 className="mb-0">A React and Flask Framework</h3>
                <img src="img/concept.png" alt="framework" className="responsive"></img>
                <div className = "subheading mb-3">The Process</div>
                <hr></hr>
                <ol>
                  <li> The web application first sends a request to Flask. </li>
                  <li> Flask then communicates with the backend python modules with the parameters of the request. </li>
                  <li> The backend modules then process the requests, and if necessary, pulls the data from the database.  </li>
                  <li> If data is needed from the database, the data will be returned to the backend python modules. </li>
                  <li> The backend modules then return the results to flask. </li>
                  <li> Flask then returns the results in a JSON payload. </li>
                  <li> The web application will then proceed to parse the JSON string, and visualise the results. </li>
                </ol>
              </div>
            </div>
      </div>
      </section>

      <hr className="m-0"></hr>
      <section className="resume-section p-3 p-lg-5 d-flex align-items-left" id="statistics">
      <div className="w-100">
            <h2 className="mb-5">Statistics</h2>
            <ResultChart highcharts={Highcharts} />
        </div>
      </section>
    </div>
  );
}

export default App;