import React from 'react';
import './App.css';
// Import charts
import ResultChart from './components/charts.jsx';
import Records from './components/records.jsx';
import Search from './components/search.jsx';
import Highcharts from 'highcharts/highstock'
import ScrollspyNav from 'react-scrollspy-nav';
function App() {
  return (
    <div className="App">
      <div className="container-fluid p-0" >
        <section className="site-section p-3 p-lg-5 d-flex align-items-center" id="about">
          <div className="w-100">
            <div className = "mb-5"></div>
            <h1 className="mb-3">pofma
              <span className="text-primary"> checker</span>
            </h1>
            <div className="subheading mb-5">
              a rumour detection platform which seeks to identify falsehoods that are widely witnessed in social media.
            </div>
            <div className="subheading mb-5">
          <p className="lead mb-5">
            With online falsehood creating distrust and unnecessary panic in our society, a social media rumour detection platform is needed to steer users away from the dissemination of fake news. 
            As such, a rumour detection platform is created in hopes to address these concerns, and reduce the number of falsehood being perpetuated in the world today.
          </p>
          </div>
          <p className="subheading mb-5"></p>
            <Search />
          <hr className="mb-2"></hr>
            <div className="social-icons">
              <a href="mailto:hello@lesliecallum.com">
                <i className="fa fa-envelope"></i>
              </a>
            </div>
          </div>
        </section>
      </div>

      <hr className="m-0"></hr>
      <section className="site-section p-3 p-lg-5 d-flex justify-content-center" id="methodology">
      <div className="w-100">
          <h2 className="mb-5">methodology</h2>
            <div className="site-item d-flex flex-column flex-md-row justify-content-between mb-5">
              <div className="site-content">
                <img src="img/concept.png" alt="framework" className="responsive mb-4"></img>
                <h4 className="mb-4 center">A React and Flask Framework</h4>
                <div className = "subheading m-3"><h3>the process</h3></div>
                <hr></hr>
                <ol className = "mb-4">
                  <li>The web application first sends a request to Flask. </li>
                  <li>Flask then communicates with the backend python modules with the parameters of the request. </li>
                  <li>The backend modules then process the requests, and if necessary, pulls the data from the database.  </li>
                  <li>If data is needed from the database, the data will be returned to the backend python modules. </li>
                  <li>The backend modules then return the results to flask. </li>
                  <li>Flask then returns the results in a JSON payload. </li>
                  <li>The web application proceeds to parse the JSON string and visualise the results. </li>
                </ol>
              <div className = "subheading m-3"><h3>current limitations</h3></div>
              <hr></hr>
              <ol>
                <li>The supported social media platforms as of now are: Facebook, Instagram, and Twitter.</li>
                <li>The machine learning model are not updated on the fly but rather updated periodically due to the overheads and the ambiguity involved.</li>
              </ol>
              </div>
              
            </div>
      </div>
      </section>
      <hr className="m-0"></hr>
      <section className="site-section p-3 p-lg-5 d-flex align-items-left" id="statistics">
        <div className="w-100">
              <h2 className="mb-5">Statistics</h2>
              <ResultChart highcharts={Highcharts} />
             <i>Only news that are classified with 70% probability threshold are part of the tabulation for fake news. </i> 
          </div>
      </section>
      <hr className="m-0"></hr>
      <section className="site-section p-3 p-lg-5 d-flex align-items-left" id="records">
        <div className="w-100">
          <h2 className="mb-5">Past Analysis</h2>
          <Records />
        </div>
      </section>
      
    <ScrollspyNav scrollTargetIds ={ ['about', 'methodology', 'statistics', 'records'] } activeNavClass= "active" offset={0} ></ScrollspyNav>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
        <a className="navbar-brand" href="#page-top">
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
              <a className="nav-link active" href="#about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#methodology">Methodology</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#statistics">Statistics</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#records">History</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default App;