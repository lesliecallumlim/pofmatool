[1mdiff --git a/src/components/charts.jsx b/src/components/charts.jsx[m
[1mindex 1018887..cd522f8 100644[m
[1m--- a/src/components/charts.jsx[m
[1m+++ b/src/components/charts.jsx[m
[36m@@ -17,7 +17,6 @@[m [mclass ResultChart extends Component {[m
     this.setState({isLoading : true});[m
     try {[m
       const result = await axios.get('/api/results');[m
[31m-      console.log(result)[m
       this.setState({ data : result.data.results, isLoading: false});[m
     }[m
     catch (error) {[m
[36m@@ -38,7 +37,6 @@[m [mclass ResultChart extends Component {[m
 [m
     // TODO: To refactor[m
     let platforms = []; let fake_news = [];  let real_news = [];[m
[31m-    console.log(data)[m
     Object.keys(data).forEach(function(key) {[m
       platforms.push(data[key]['platform']);[m
       fake_news.push(data[key]['fake_news']);[m
[1mdiff --git a/src/components/records.jsx b/src/components/records.jsx[m
[1mindex 50985e1..aab50bc 100644[m
[1m--- a/src/components/records.jsx[m
[1m+++ b/src/components/records.jsx[m
[36m@@ -5,10 +5,12 @@[m [mclass Records extends Component {[m
   constructor(props) {[m
     super(props);[m
     this.state = {[m
[31m-      data: [],[m
[32m+[m[32m      all_data: [],[m
[32m+[m[32m      user_data: [],[m
       isLoading: false,[m
       error: null,[m
[31m-      refresh: false[m
[32m+[m[32m      refresh: false,[m
[32m+[m[32m      hasValidToken: false,[m
     };[m
   }[m
  [m
[36m@@ -16,36 +18,53 @@[m [mclass Records extends Component {[m
     this.setState({isLoading : true});[m
     try {[m
       const result = await axios.get('/api/history');[m
[31m-      // console.log(result)[m
[31m-      this.setState({ data : result.data, isLoading: false});[m
[32m+[m[32m      this.setState({ all_data : result.data, isLoading: false});[m
[32m+[m
[32m+[m[32m      const token = localStorage.getItem('token');[m
[32m+[m[32m      if (token !== null) {[m
[32m+[m[32m        const config = {[m
[32m+[m[32m            headers: { Authorization: `Bearer ${token}` }[m
[32m+[m[32m        }[m
[32m+[m[32m        var user_result = await axios.get('/api/submitted', config);[m
[32m+[m[32m        this.setState({ user_data : user_result.data.past_submissions, isLoading: false});[m
[32m+[m[32m        this.setState({ hasValidToken : true})[m
[32m+[m[32m      }[m
[32m+[m[41m      [m
     }[m
     catch (error) {[m
       this.setState({ error, isLoading: false});[m
     }[m
   }[m
 [m
[31m-  // async componentDidUpdate(prevState) {[m
[31m-  //   if (prevState.refresh !== this.state.refresh) {[m
[31m-  //     this.setState({isLoading : true});[m
[31m-  //     this.setState({refresh : false});[m
[31m-  //     try {[m
[31m-  //       const result = await axios.get('/api/history');[m
[31m-  //       console.log(result)[m
[31m-  //       this.setState({ data : result.data, isLoading: false});[m
[31m-  //     }[m
[31m-  //     catch (error) {[m
[31m-  //       this.setState({ error, isLoading: false});[m
[31m-  //     }[m
[31m-  //   }[m
[32m+[m[32m  // checkToken() {[m
[32m+[m[32m  //   this.setState({hasValidToken: true})[m
   // }[m
 [m
   renderTableData() {[m
[31m-    return this.state.data.map((data, index) => {[m
[31m-       const { date_added, fraud, id, platform, sentiment, text, url } = data //destructuring[m
[32m+[m[32m    return this.state.all_data.map((all_data) => {[m
[32m+[m[32m       const { date_added, fraud, id, platform, sentiment, text, url, username_submitted} = all_data //destructuring[m
[32m+[m[32m       return ([m
[32m+[m[32m          <tr key={id}>[m
[32m+[m[32m            <td>{platform}</td>[m
[32m+[m[32m             <td>{url}</td>[m
[32m+[m[32m             <td>{username_submitted}</td>[m
[32m+[m[32m             {/* <td>{text}</td> */}[m
[32m+[m[32m             <td>{sentiment}</td>[m
[32m+[m[32m             <td>{fraud}</td>[m
[32m+[m[32m             <td>{date_added}</td>[m
[32m+[m[32m          </tr>[m
[32m+[m[32m       )[m
[32m+[m[32m    })[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  renderUserData() {[m
[32m+[m[32m    return this.state.user_data.map((user_data ) => {[m
[32m+[m[32m       const { date_added, fraud, id, platform, sentiment, text, url, username_submitted} = user_data    //destructuring[m
        return ([m
           <tr key={id}>[m
             <td>{platform}</td>[m
              <td>{url}</td>[m
[32m+[m[32m             <td>{username_submitted}</td>[m
              {/* <td>{text}</td> */}[m
              <td>{sentiment}</td>[m
              <td>{fraud}</td>[m
[36m@@ -53,10 +72,12 @@[m [mclass Records extends Component {[m
           </tr>[m
        )[m
     })[m
[31m- }[m
[32m+[m[32m  }[m
[32m+[m
   refresh() {[m
     this.setState ({ refresh: true });[m
     this.renderTableData();[m
[32m+[m[32m    this.renderUserData();[m
   }[m
 [m
   render() {[m
[36m@@ -70,8 +91,29 @@[m [mclass Records extends Component {[m
       return <p>Loading ...</p>;[m
     }[m
 [m
[31m-    return ( [m
[31m-      <>[m
[32m+[m[32m    //TODO: Rewrite this hot garbage[m
[32m+[m[32m    var all_records =[m[41m [m
[32m+[m[32m      <div className = 'table-responsive' style = {{"maxHeight": "50%", "overflowY" :"auto","overflowX" :"hidden"}}>[m
[32m+[m[32m        <table id='history' className = 'table-hover table' >[m
[32m+[m[32m            <tbody>[m
[32m+[m[32m            <tr>[m
[32m+[m[32m              {/* Maybe make this dynamic? */}[m
[32m+[m[32m              <th>Platform</th>[m
[32m+[m[32m              <th>URL</th>[m
[32m+[m[32m              {/* <th>Text</th> */}[m
[32m+[m[32m              <th>By User</th>[m
[32m+[m[32m              <th>Sentiments</th>[m
[32m+[m[32m              <th>Falsehood</th>[m
[32m+[m[32m              <th>Date Added</th>[m
[32m+[m[32m            </tr>[m
[32m+[m[32m              {this.renderTableData()}[m
[32m+[m[32m            </tbody>[m
[32m+[m[32m        </table>[m
[32m+[m[32m      </div>;[m
[32m+[m
[32m+[m[32m    var user_records =[m[41m [m
[32m+[m[32m      <div className="mb-5 w-100">[m
[32m+[m[32m        <h2 className="mb-5">Your past analyses</h2>[m
         <div className = 'table-responsive' style = {{"maxHeight": "50%", "overflowY" :"auto","overflowX" :"hidden"}}>[m
           <table id='history' className = 'table-hover table' >[m
               <tbody>[m
[36m@@ -80,17 +122,29 @@[m [mclass Records extends Component {[m
                 <th>Platform</th>[m
                 <th>URL</th>[m
                 {/* <th>Text</th> */}[m
[32m+[m[32m                <th>User</th>[m
                 <th>Sentiments</th>[m
                 <th>Falsehood</th>[m
                 <th>Date Added</th>[m
               </tr>[m
[31m-                {this.renderTableData()}[m
[32m+[m[32m                {this.renderUserData()}[m
               </tbody>[m
           </table>[m
         </div>[m
[31m-        <span><button type="submit" className = "btn btn-primary" onClick = {this.refresh.bind(this)}>Refresh</button></span>[m
[31m-      </>[m
[31m-    )[m
[32m+[m[32m      </div>;[m
[32m+[m
[32m+[m[32m    if (this.state.hasValidToken) {[m
[32m+[m[32m      return ([m[41m [m
[32m+[m[32m        <>[m
[32m+[m[32m          {all_records}[m
[32m+[m[32m          <hr></hr>[m
[32m+[m[32m          {user_records}[m
[32m+[m[32m        </>[m
[32m+[m[32m      );[m
[32m+[m[32m    }[m
[32m+[m[32m    else {[m
[32m+[m[32m      return (<>{all_records}</>);[m
[32m+[m[32m    }[m
   }[m
 }[m
 [m
[1mdiff --git a/src/components/search.jsx b/src/components/search.jsx[m
[1mindex ea75782..02a2f56 100644[m
[1m--- a/src/components/search.jsx[m
[1m+++ b/src/components/search.jsx[m
[36m@@ -2,7 +2,6 @@[m [mimport React, { Component } from 'react';[m
 import Spinner from 'react-bootstrap/Spinner'[m
 import axios from 'axios';[m
 import './../App.css';[m
[31m-// import Popover from 'rea