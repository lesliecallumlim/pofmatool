(this["webpackJsonpreact-flask-app"]=this["webpackJsonpreact-flask-app"]||[]).push([[0],{162:function(e,t,a){},372:function(e,t,a){e.exports=a(456)},377:function(e,t,a){},456:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(15),s=a.n(l),i=(a(377),a(55)),c=a(56),o=a(98),m=a(58),u=a(57),d=(a(162),a(31)),h=a.n(d),p=a(70),f=a(240),g=a.n(f),b=a(356),E=a.n(b),v=a(45),y=a.n(v),k=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={data:[],isLoading:!1,error:null},n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=Object(p.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({isLoading:!0}),e.prev=1,e.next=4,y.a.get("/api/results");case 4:t=e.sent,this.setState({data:t.data.results,isLoading:!1}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),this.setState({error:e.t0,isLoading:!1});case 11:case"end":return e.stop()}}),e,this,[[1,8]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.data,a=e.isLoading,n=e.error;if(n)return r.a.createElement("p",null,n.message);if(a)return r.a.createElement("p",null,"Loading ...");var l=[],s=[],i=[];Object.keys(t).forEach((function(e){l.push(t[e].platform),s.push(t[e].fake_news),i.push(t[e].real_news)}));var c={title:{text:"Number of falsehoods in the various social media platforms"},chart:{type:"column"},series:[{name:"Fake News",color:"#FB9039",data:s},{name:"Real News",color:"#1F3044",data:i}],credits:!1,xAxis:{categories:l},yAxis:{min:0,max:100,title:{text:"Percentage of Fake/Real News"},labels:{formatter:function(){return this.value+"%"}}},plotOptions:{column:{dataLabels:{enabled:!0,style:{textOutline:!1},formatter:function(){return this.y}},stacking:"percent"}},tooltip:{pointFormat:"({point.percentage:.0f}%)"}};return r.a.createElement(E.a,{highcharts:g.a,options:c})}}]),a}(n.Component),N=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={trending_data:[],isLoading:!1,error:null,refresh:!1},n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=Object(p.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({isLoading:!0}),e.prev=1,e.next=4,y.a.get("/api/trending");case 4:t=e.sent,this.setState({trending_data:t.data.results,isLoading:!1}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),this.setState({error:e.t0,isLoading:!1});case 11:case"end":return e.stop()}}),e,this,[[1,8]])})));return function(){return e.apply(this,arguments)}}()},{key:"renderTableData",value:function(){return this.state.trending_data.map((function(e){var t=e.id,a=e.platform,n=e.url,l=e.sentiment,s=e.fraud,i=e.fraud_probability,c=e.date_added,o=e.count,m=Math.round(100*i);return r.a.createElement("tr",{key:t},r.a.createElement("td",null,a),r.a.createElement("td",null,n),r.a.createElement("td",null,l),r.a.createElement("td",null,s," - ",m,"%"),r.a.createElement("td",null,c),r.a.createElement("td",null,o))}))}},{key:"refresh",value:function(){this.setState({refresh:!0}),this.renderTableData()}},{key:"render",value:function(){var e=this.state,t=e.isLoading,a=e.error;if(a)return r.a.createElement("p",null,a.message);if(t)return r.a.createElement("p",null,"Loading ...");var n=r.a.createElement("div",{className:"table-responsive history",style:{maxHeight:"100%",overflowY:"auto",overflowX:"hidden"}},r.a.createElement("table",{id:"history",className:"table-hover table"},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Platform"),r.a.createElement("th",null,"URL"),r.a.createElement("th",null,"Sentiments"),r.a.createElement("th",null,"Falsehood (%)"),r.a.createElement("th",null,"Date Added"),r.a.createElement("th",null,"Hits")),this.renderTableData())));return r.a.createElement(r.a.Fragment,null,n)}}]),a}(n.Component),w=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).onNext=function(e){e.target.classList.contains("allRecords")?n.setState({startPage:e.target.value}):n.setState({startPageForUserSubmitted:e.target.value})},n.state={all_data:[],user_data:[],isLoading:!1,error:null,refresh:!1,hasValidToken:!1,startPage:1,lastPage:!1,startPageForUserSubmitted:1,lastPageForUserSubmitted:!1},n}return Object(c.a)(a,[{key:"loadRecords",value:function(){var e=Object(p.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({isLoading:!0}),e.prev=1,e.next=4,y.a.get("/api/history",{params:{start:this.state.startPage}});case 4:t=e.sent,this.setState({all_data:t.data.results,isLoading:!1,startPage:this.state.startPage}),void 0===this.state.all_data||0===this.state.all_data.length?this.setState({lastPage:!0}):this.setState({lastPage:!1}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),this.setState({error:e.t0,isLoading:!1});case 12:case"end":return e.stop()}}),e,this,[[1,9]])})));return function(){return e.apply(this,arguments)}}()},{key:"loadUserRecords",value:function(){var e=Object(p.a)(h.a.mark((function e(){var t,a,n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=localStorage.getItem("token"),this.setState({isLoading:!0}),e.prev=2,null===t){e.next=11;break}return a={headers:{Authorization:"Bearer ".concat(t)},params:{start:this.state.startPageForUserSubmitted}},e.next=7,y.a.get("/api/submitted",a);case 7:n=e.sent,this.setState({user_data:n.data.past_submissions,isLoading:!1,startPageForUserSubmitted:this.state.startPageForUserSubmitted}),this.setState({hasValidToken:!0}),void 0===this.state.user_data||0===this.state.user_data.length?this.setState({lastPageForUserSubmitted:!0}):this.setState({lastPageForUserSubmitted:!1});case 11:e.next=16;break;case 13:e.prev=13,e.t0=e.catch(2),this.setState({error:e.t0,isLoading:!1});case 16:case"end":return e.stop()}}),e,this,[[2,13]])})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){this.loadRecords(),this.loadUserRecords()}},{key:"componentDidUpdate",value:function(){var e=Object(p.a)(h.a.mark((function e(t,a){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.state.startPage!==a.startPage?this.loadRecords():this.state.startPageForUserSubmitted!==a.startPageForUserSubmitted&&this.loadUserRecords();case 1:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"renderTableData",value:function(){return this.state.all_data.map((function(e){var t=e.date_added,a=e.fraud,n=e.id,l=e.platform,s=e.sentiment,i=e.fraud_probability,c=e.url,o=e.username_submitted,m=Math.round(100*i);return r.a.createElement("tr",{key:n},r.a.createElement("td",null,l),r.a.createElement("td",null,c),r.a.createElement("td",null,o),r.a.createElement("td",null,s),r.a.createElement("td",null,a," - ",m,"%"),r.a.createElement("td",null,t))}))}},{key:"renderUserData",value:function(){return this.state.user_data.map((function(e){var t=e.date_added,a=e.fraud,n=e.id,l=e.platform,s=e.sentiment,i=e.fraud_probability,c=e.url,o=e.username_submitted,m=Math.round(100*i);return r.a.createElement("tr",{key:n},r.a.createElement("td",null,l),r.a.createElement("td",null,c),r.a.createElement("td",null,o),r.a.createElement("td",null,s),r.a.createElement("td",null,a," - ",m,"%"),r.a.createElement("td",null,t))}))}},{key:"render",value:function(){var e=this.state,t=e.isLoading,a=e.error;if(a)return r.a.createElement("p",null,a.message);if(t)return r.a.createElement("p",null,"Loading ...");var n,l,s=r.a.createElement("div",{className:"table-responsive",style:{maxHeight:"50%",overflowY:"auto",overflowX:"hidden"}},r.a.createElement("table",{className:"table-hover table history"},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Platform"),r.a.createElement("th",null,"URL"),r.a.createElement("th",null,"User"),r.a.createElement("th",null,"Sentiments"),r.a.createElement("th",null,"Falsehood (%)"),r.a.createElement("th",null,"Date Added")),this.renderTableData()))),i=r.a.createElement("div",null,r.a.createElement("h2",{className:"mb-5"},"Your past analyses"),r.a.createElement("div",{className:"table-responsive history",style:{maxHeight:"25%",overflowY:"visible",overflowX:"hidden"}},r.a.createElement("table",{className:"table-hover table history"},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Platform"),r.a.createElement("th",null,"URL"),r.a.createElement("th",null,"User"),r.a.createElement("th",null,"Sentiments"),r.a.createElement("th",null,"Falsehood"),r.a.createElement("th",null,"Date Added")),this.renderUserData()))));return n=1===this.state.startPage?r.a.createElement("button",{type:"submit",className:"btn btn-primary allRecords",value:parseInt(this.state.startPage)+1,onClick:this.onNext},"Next"):1!==this.state.startPage&&!0===this.state.lastPage?r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{type:"submit",className:"btn btn-primary allRecords",value:parseInt(this.state.startPage)-1,onClick:this.onNext},"Back")):r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{type:"submit",className:"btn btn-primary allRecords",value:parseInt(this.state.startPage)+1,style:{margin:"1px"},onClick:this.onNext},"Next"),r.a.createElement("button",{type:"submit",className:"btn btn-primary allRecords",value:parseInt(this.state.startPage)-1,onClick:this.onNext},"Back")),l=1===this.state.startPageForUserSubmitted?r.a.createElement("button",{type:"submit",className:"btn btn-primary",value:parseInt(this.state.startPageForUserSubmitted)+1,onClick:this.onNext},"Next"):1!==this.state.startPageForUserSubmitted&&!0===this.state.lastPageForUserSubmitted?r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{type:"submit",className:"btn btn-primary",value:parseInt(this.state.startPageForUserSubmitted)-1,onClick:this.onNext},"Back")):r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{type:"submit",className:"btn btn-primary",value:parseInt(this.state.startPageForUserSubmitted)+1,style:{margin:"1px"},onClick:this.onNext},"Next"),r.a.createElement("button",{type:"submit",className:"btn btn-primary",value:parseInt(this.state.startPageForUserSubmitted)-1,onClick:this.onNext},"Back")),this.state.hasValidToken?r.a.createElement(r.a.Fragment,null,s,r.a.createElement("hr",null),n,r.a.createElement("hr",null),i,r.a.createElement("hr",null),l):r.a.createElement(r.a.Fragment,null,s,n)}}]),a}(n.Component),x=a(212),S=a(72),C=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).onPlatformSelect=function(e){n.setState({platform:e.target.value})},n.onBtnClick=n.onBtnClick.bind(Object(o.a)(n)),n.state={searchString:"",results:[],platform:"All",loading:!1,sentiment:"",modalClosed:!1},n}return Object(c.a)(a,[{key:"inputChangeHandler",value:function(e){this.setState({searchString:e.target.value})}},{key:"onBtnClick",value:function(){this.setState({modalClosed:!0}),this.props.rerenderParentCallback()}},{key:"formHandler",value:function(e){var t=this;t.setState({loading:!0});var a=this.state.platform,n=this.state.searchString;y.a.get("/api/searchRecords",{params:{platform:a,search_string:n}}).then((function(e){var a=e.data.results;t.setState({loading:!1}),t.setState({results:a})})).catch((function(e){t.setState({loading:!1}),t.setState({results:e.response.data})}))}},{key:"renderTableData",value:function(){return this.state.results.map((function(e){var t=e.date_added,a=e.fraud,n=e.id,l=e.platform,s=e.sentiment,i=e.fraud_probability,c=e.text,o=e.url,m=e.username_submitted,u=Math.round(100*i);return r.a.createElement("tr",{key:n},r.a.createElement("td",null,l),r.a.createElement("td",null,o),r.a.createElement("td",null,m),r.a.createElement("td",null,s),r.a.createElement("td",{className:"truncate"},c),r.a.createElement("td",null,a," - ",u,"%"),r.a.createElement("td",null,t))}))}},{key:"render",value:function(){var e=this;if(""==!this.state.results)var t=r.a.createElement(r.a.Fragment,null,r.a.createElement("hr",null),r.a.createElement("h3",null,"Your results"),r.a.createElement("hr",{style:{"margin-top":"-0.1em"}}),r.a.createElement("div",{className:"table-responsive history",style:{maxHeight:"30%",overflowY:"auto",overflowX:"hidden"}},r.a.createElement("table",{id:"history",className:"table-hover table"},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Platform"),r.a.createElement("th",null,"URL"),r.a.createElement("th",null,"User"),r.a.createElement("th",null,"Sentiments"),r.a.createElement("th",null,"Text"),r.a.createElement("th",null,"Falsehood (%)"),r.a.createElement("th",null,"Date Added")),this.renderTableData()))));return this.state.loading&&r.a.createElement("div",null,r.a.createElement("hr",{className:"mb-3"}),r.a.createElement("h3",{className:"mb-2"},"Your result "),r.a.createElement("hr",{style:{marginTop:"-0.1em"}}),r.a.createElement(x.a,{animation:"grow",variant:"dark"},r.a.createElement("span",{className:"sr-only"},"Loading..."))),r.a.createElement("div",null,r.a.createElement("div",{className:"input-group"},r.a.createElement("input",{type:"text",name:"search",className:"form-control",placeholder:"Search for past analysed records!",onChange:function(t){return e.inputChangeHandler.call(e,t)},value:this.state.search}),r.a.createElement("select",{className:"form-control",style:{maxWidth:"20%"},id:"dropDown",onClick:this.onPlatformSelect},r.a.createElement("option",{className:"dropdown-item",value:"All",onChange:function(t){return e.inputChangeHandler.call(e,t)}},"All"),r.a.createElement("option",{className:"dropdown-item",value:"Facebook",onChange:function(t){return e.inputChangeHandler.call(e,t)}},"Facebook"),r.a.createElement("option",{className:"dropdown-item",value:"Twitter",onChange:function(t){return e.inputChangeHandler.call(e,t)}},"Twitter"),r.a.createElement("option",{className:"dropdown-item",value:"Instagram",onChange:function(t){return e.inputChangeHandler.call(e,t)}},"Instagram"),r.a.createElement("option",{className:"dropdown-item",value:"LinkedIn",onChange:function(t){return e.inputChangeHandler.call(e,t)}},"LinkedIn"),r.a.createElement("option",{className:"dropdown-item",value:"User",onChange:function(t){return e.inputChangeHandler.call(e,t)}},"User")),r.a.createElement("div",null,r.a.createElement(S.a,{modal:!0,contentStyle:{maxWidth:"70%",maxHeight:"80%",overflowY:"auto",overflowX:"hidden",width:"100%",textAlign:"center"},trigger:r.a.createElement("span",null,r.a.createElement("button",{type:"submit",className:"btn btn-primary",onClick:this.formHandler.bind(this)},r.a.createElement("i",{className:"fa fa-search"})))},(function(e){return r.a.createElement(r.a.Fragment,null,t,r.a.createElement("a",{className:"close",onClick:function(t){e(),window.location.reload(!1)}},"x"))})))))}}]),a}(n.Component),F=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).onBtnClick=n.onBtnClick.bind(Object(o.a)(n)),n.state={search:"",results:"",url:"",fraud:"",loading:!1,sentiment:"",modalClosed:!1,fraudProbability:"",searchID:"",token:"",feedback_data:""},n}return Object(c.a)(a,[{key:"inputChangeHandler",value:function(e){this.setState({search:e.target.value})}},{key:"onBtnClick",value:function(){this.setState({modalClosed:!0}),this.props.rerenderParentCallback()}},{key:"formHandler",value:function(e){var t=this;t.setState({loading:!0}),e.preventDefault();var a,n=localStorage.getItem("token");null==n?a="":(a="Bearer ".concat(n),t.setState({token:n}));var r={headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:"".concat(a)}},l=this.state;y.a.post("/api/evaluate",l,r).then((function(e){var a=e.data;t.setState({loading:!1}),t.setState({results:a.results}),t.setState({url:a.url}),t.setState({sentiment:a.sentiment}),t.setState({fraud:a.fraud}),t.setState({searchID:a.id}),t.setState({fraudProbability:Math.round(100*a.fraud_probability)})})).catch((function(e){t.setState({loading:!1}),t.setState({results:e.response.data.message})}))}},{key:"addFeedback",value:function(){var e=Object(p.a)(h.a.mark((function e(t){var a,n,r,l;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=this,""===this.state.token?"":"Bearer ".concat(this.state.token),n=this.state.searchID,r={headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:"Bearer ".concat(this.state.token)}},l={feedback_string:t.target.value,id:n},y.a.post("/api/provideFeedback",l,r).then((function(e){a.setState({feedback_data:e.data.message})})).catch((function(e){a.setState({feedback_data:e.response.data.message})}));case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e,t=this;if(""!==this.state.results){e=""!==this.state.sentiment?r.a.createElement("div",null,r.a.createElement("hr",null),r.a.createElement("h3",null,"Your result"),r.a.createElement("hr",{style:{marginTop:"-0.1em"}}),r.a.createElement("h4",null,"Link Entered: "),r.a.createElement("p",null,this.state.url),r.a.createElement("h4",null,"Keywords: "),r.a.createElement("p",null,this.state.results),r.a.createElement("h4",null,"Falsehood:"),r.a.createElement("span",{style:{textTransform:"capitalize"},className:"badge p-2 mr-1 mb-3 badge-"+{Real:"success",Fake:"danger"}[this.state.fraud]},this.state.fraud," - ",this.state.fraudProbability,"%"),r.a.createElement("h4",null,"Sentiments: "),r.a.createElement("span",{className:"badge p-2 mr-1 mb-3 badge-"+{Positive:"success",Negative:"danger"}[this.state.sentiment]},this.state.sentiment),r.a.createElement("h4",null,"What do you think?"),r.a.createElement(S.a,{modal:!0,contentStyle:{maxWidth:"500px",maxHeight:"80%",overflowY:"auto",overflowX:"hidden",width:"80%",textAlign:"center"},trigger:r.a.createElement("span",null,r.a.createElement("button",{className:"btn badge badge-success p-2 mr-1 mb-3",value:"Great",onClick:this.addFeedback.bind(this)},"Excellent!"))},(function(e){return r.a.createElement(r.a.Fragment,null," ",r.a.createElement("span",null,t.state.feedback_data)," ",r.a.createElement("a",{className:"close",onClick:function(t){e(),window.location.reload(!1)}},"x "))})),r.a.createElement(S.a,{modal:!0,contentStyle:{maxWidth:"500px",maxHeight:"80%",overflowY:"auto",overflowX:"hidden",width:"80%",textAlign:"center"},trigger:r.a.createElement("span",null,r.a.createElement("button",{className:"btn badge badge-warning p-2 mr-1 mb-3",value:"Neutral",onClick:this.addFeedback.bind(this)},"Neutral"))},(function(e){return r.a.createElement(r.a.Fragment,null," ",r.a.createElement("span",null,t.state.feedback_data)," ",r.a.createElement("a",{className:"close",onClick:function(t){e(),window.location.reload(!1)}},"x "))})),r.a.createElement(S.a,{modal:!0,contentStyle:{maxWidth:"500px",maxHeight:"80%",overflowY:"auto",overflowX:"hidden",width:"80%",textAlign:"center"},trigger:r.a.createElement("span",null,r.a.createElement("button",{className:"btn badge badge-dark p-2 mr-1 mb-3",value:"Poor",onClick:this.addFeedback.bind(this)},"Terrible!"))},(function(e){return r.a.createElement(r.a.Fragment,null," ",r.a.createElement("span",null,t.state.feedback_data)," ",r.a.createElement("a",{className:"close",onClick:function(t){e(),window.location.reload(!1)}},"x "))})),r.a.createElement("hr",null)):r.a.createElement("div",null,r.a.createElement("hr",null),r.a.createElement("h3",null,"Your result"),r.a.createElement("hr",{style:{marginTop:"-0.1em"}}),r.a.createElement("h4",null,"Link Entered: "),r.a.createElement("p",null,this.state.url),r.a.createElement("h4",null,"Error: "),r.a.createElement("p",null,this.state.results),r.a.createElement("hr",null))}return this.state.loading&&(e=r.a.createElement("div",null,r.a.createElement("hr",{className:"mb-3"}),r.a.createElement("h3",{className:"mb-2"},"Your result "),r.a.createElement("hr",{style:{marginTop:"-0.1em"}}),r.a.createElement(x.a,{animation:"grow",variant:"dark"},r.a.createElement("span",{className:"sr-only"},"Loading...")))),r.a.createElement("div",null,r.a.createElement("div",{className:"input-group"},r.a.createElement("input",{type:"text",name:"search",className:"form-control",placeholder:"Validate your results today!",onChange:function(e){return t.inputChangeHandler.call(t,e)},value:this.state.search}),r.a.createElement("div",null,r.a.createElement(S.a,{modal:!0,contentStyle:{maxWidth:"500px",maxHeight:"80%",overflowY:"auto",overflowX:"hidden",width:"80%",textAlign:"center"},trigger:r.a.createElement("span",null,r.a.createElement("button",{type:"submit",className:"btn btn-primary",onClick:this.formHandler.bind(this)},r.a.createElement("i",{className:"fa fa-search"})))},(function(t){return r.a.createElement(r.a.Fragment,null,e," ",r.a.createElement("a",{className:"close",onClick:function(e){t(),window.location.reload(!1)}},"x"))})))))}}]),a}(n.Component),j=a(46),P=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={results:"",loading:!1,isLoggedIn:!1},n}return Object(c.a)(a,[{key:"formHandler",value:function(){var e=Object(p.a)(h.a.mark((function e(t,a){var n,r;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=this).setState({loading:!0}),r="login"===a?"login":"register",e.next=5,y.a.post("/api/"+r,t).then((function(e){var t=e.data;n.setState({loading:!1}),n.setState({results:t.message}),"login"===r&&(localStorage.setItem("token",t.token),""!==t.token&&(localStorage.setItem("loggedIn",!0),window.location.reload(!1)))})).catch((function(e){n.setState({loading:!1}),n.setState({results:e.response.data.message})}));case 5:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){!0===("true"===localStorage.getItem("loggedIn"))?this.setState({isLoggedIn:!0}):this.setState({isLoggedIn:!1})}},{key:"logOut",value:function(){localStorage.setItem("loggedIn",!1),localStorage.removeItem("token"),window.location.reload(!1)}},{key:"render",value:function(){var e=this,t=r.a.createElement("div",null,r.a.createElement("hr",{className:"mb-3"}),r.a.createElement("h3",{className:"mb-2"},"Register"),r.a.createElement("hr",null),r.a.createElement(j.d,{initialValues:{username:"",password:"",email:""},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.email)?e.username?e.password!==e.verify_password&&(t.password="Please check your password!"):t.username="Required":t.email="Invalid email address":t.email="Required",t},onSubmit:function(t,a){var n=a.setSubmitting;setTimeout((function(){e.formHandler(t,"register"),n(!1)}),400)}},(function(t){var a=t.isValid,n=t.dirty;return r.a.createElement("div",null,r.a.createElement(j.c,{className:"registrationForm"},r.a.createElement(j.b,{type:"username",name:"username",placeHolder:"Your username.",className:"inputFields"}),r.a.createElement(j.a,{name:"username",component:"span"}),r.a.createElement(j.b,{type:"email",name:"email",placeHolder:"Your email.",className:"inputFields"}),r.a.createElement(j.a,{name:"email",component:"div"}),r.a.createElement(j.b,{type:"password",placeHolder:"Your password.",name:"password",className:"inputFields"}),r.a.createElement(j.a,{name:"password",component:"div"}),r.a.createElement(j.b,{type:"password",placeHolder:"Verify password.",name:"verify_password",className:"inputFields"}),r.a.createElement(S.a,{modal:!0,trigger:r.a.createElement("button",{type:"submit",className:"inputFields submit",disabled:!(a&&n)},"Submit")},(function(t){return r.a.createElement(r.a.Fragment,null,e.state.results," ",r.a.createElement("a",{href:!0,className:"close",onClick:t},"x"))}))))})),r.a.createElement("hr",null)),a=r.a.createElement("div",null,r.a.createElement("hr",{className:"mb-3"}),r.a.createElement("h3",{className:"mb-2"},"Login"),r.a.createElement("hr",null),r.a.createElement(j.d,{initialValues:{username:"",password:""},validate:function(e){var t={};return e.username||(t.username="Required"),e.password||(t.password="Required"),t},onSubmit:function(t,a){var n=a.setSubmitting;setTimeout((function(){e.formHandler(t,"login"),n(!1)}),700)}},(function(t){var a=t.isValid,n=t.dirty;return r.a.createElement("div",null,r.a.createElement(j.c,{className:"registrationForm"},r.a.createElement(j.b,{type:"username",name:"username",placeHolder:"Your username.",className:"inputFields"}),r.a.createElement(j.a,{name:"username",component:"div"}),r.a.createElement(j.b,{type:"password",placeHolder:"Your password.",name:"password",className:"inputFields"}),r.a.createElement(j.a,{name:"password",component:"div"}),r.a.createElement(S.a,{modal:!0,trigger:r.a.createElement("button",{type:"submit",className:"inputFields submit",disabled:!(a&&n)},"Submit")},(function(t){return r.a.createElement(r.a.Fragment,null,e.state.results," ",r.a.createElement("a",{href:!0,className:"close",onClick:t},"x"))}))))})),r.a.createElement("hr",null)),n=r.a.createElement(S.a,{modal:!0,contentStyle:{maxWidth:"500px",maxHeight:"80%",overflowY:"auto",overflowX:"hidden",width:"100%","text-align":"center"},trigger:r.a.createElement("a",{href:"#register",className:"nav-link "},"Register")},(function(e){return r.a.createElement(r.a.Fragment,null,t," ",r.a.createElement("a",{href:!0,className:"close",onClick:e},"x"))})),l=r.a.createElement(S.a,{modal:!0,contentStyle:{maxWidth:"500px",maxHeight:"80%",overflowY:"auto",overflowX:"hidden",width:"100%","text-align":"center"},trigger:r.a.createElement("a",{href:"#login",className:"nav-link "},"Login")},(function(e){return r.a.createElement(r.a.Fragment,null,a," ",r.a.createElement("a",{href:!0,className:"close",onClick:e},"x"))}));return this.state.isLoggedIn?r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:"#logout",className:"nav-link nav-link-active",onClick:this.logOut.bind(this)},"Logout")):r.a.createElement("div",{className:"dropdown"},r.a.createElement("button",{className:"dropbtn"},"User Panel"),r.a.createElement("div",{className:"dropdown-content"},n,l))}}]),a}(n.Component),O=a(150),L=a(149),_=a(242),U=a.n(_),T=y.a.create({baseURL:"/api"});var R=function(){var e=Object(n.useState)([]),t=Object(L.a)(e,2),a=t[0],l=t[1],s=Object(n.useState)(!1),i=Object(L.a)(s,2),c=i[0],o=i[1],m=Object(n.useState)(!1),u=Object(L.a)(m,2),d=(u[0],u[1]),h=Object(n.useState)([]),p=Object(L.a)(h,2),f=(p[0],p[1]),g=localStorage.getItem("token");Object(n.useEffect)((function(){g&&("admin"==function(e){if(e){var t=e.split(".")[1].replace("-","+").replace("_","/");return JSON.parse(window.atob(t))}}(g).identity.is_admin&&o(!0));T.get("/userRecords",{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(g)}}).then((function(e){l(e.data.results)})).catch((function(e){console.log("Error: ",e.message)}))}),[]);var b=function(e,t,n){var r,s=[];""!==e.email&&!1!==(r=e.email,/^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/.test(String(r).toLowerCase()))||s.push("Please enter a valid email"),s.length<1?T.post("/userRecordsUpdate",e,{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(g)}}).then((function(r){var s=Object(O.a)(a);s[t.tableData.id]=e,l(Object(O.a)(s)),n(),d(!1),f([])})).catch((function(e){f(["Update failed! Server error"]),d(!0),n()})):(f(s),d(!0),n())};return c?r.a.createElement("div",null,r.a.createElement("hr",{className:"m-0"}),r.a.createElement("section",{className:"site-section p-3 p-lg-5 d-flex align-items-left",id:"admin_panel"},r.a.createElement("div",{className:"w-100"},r.a.createElement("h2",{className:"mb-5"},"Admin Panel"),r.a.createElement(U.a,{title:"Registered Users",columns:[{title:"ID",field:"id",editable:"never"},{title:"Username",field:"username",editable:"never"},{title:"Email",field:"email"},{title:"Date Registered",field:"date_registered",editable:"never"},{title:"Admin",field:"is_admin",lookup:{false:"false",true:"true"}}],data:a,editable:{onRowUpdate:function(e,t){return new Promise((function(a){b(e,t,a)}))},onRowDelete:function(e){return new Promise((function(t){!function(e,t){T.post("/userRecordsDelete",{id:e.id},{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(g)}}).then((function(n){var r=Object(O.a)(a),s=e.tableData.id;r.splice(s,1),l(Object(O.a)(r)),t()})).catch((function(e){console.log(e),f(["Delete failed! Server error"]),d(!0),t()}))}(e,t),window.location.reload(!1)}))}}})))):r.a.createElement(r.a.Fragment,null)},A=a(362),H=a.n(A),I=a(363),D=a.n(I),Y=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).rerenderParentCallback=n.rerenderParentCallback.bind(Object(o.a)(n)),n}return Object(c.a)(a,[{key:"rerenderParentCallback",value:function(){this.forceUpdate()}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"container-fluid p-0"},r.a.createElement("section",{className:"site-section p-3 p-lg-5 d-flex align-items-center",id:"about"},r.a.createElement("div",{className:"w-100"},r.a.createElement("div",{className:"mb-5"}),r.a.createElement("h1",{className:"mb-3"},"pofma.",r.a.createElement("span",{className:"text-primary"},"me")),r.a.createElement("div",{className:"subheading mb-5"},"a rumour detection platform which seeks to identify falsehoods that are widely witnessed in social media."),r.a.createElement("div",{className:"subheading mb-5"},r.a.createElement("p",{className:"lead mb-5"},"With online falsehood creating distrust and unnecessary panic in our society, a social media rumour detection platform is needed to steer users away from the dissemination of fake news. As a result, a rumour detection platform is created in hopes to address these concerns and reduce the amount of falsehood perpetuated in the world today.")),r.a.createElement("p",{className:"subheading mb-5"}),r.a.createElement(F,{rerenderParentCallback:this.rerenderParentCallback}),r.a.createElement("hr",{className:"mb-2"}),r.a.createElement("div",{className:"social-icons"},r.a.createElement("a",{href:"mailto:hello@lesliecallum.com"},r.a.createElement("i",{className:"fa fa-envelope"})))))),r.a.createElement("hr",{className:"m-0"}),r.a.createElement("section",{className:"site-section p-3 p-lg-5 d-flex align-items-left",id:"trending"},r.a.createElement("div",{className:"w-100"},r.a.createElement("h2",{className:"mb-5"},"Trending"),r.a.createElement(N,null))),r.a.createElement("hr",{className:"m-0"}),r.a.createElement("section",{className:"site-section p-3 p-lg-5 d-flex justify-content-center",id:"methodology"},r.a.createElement("div",{className:"w-100"},r.a.createElement("h2",{className:"mb-5"},"methodology"),r.a.createElement("div",{className:"site-item d-flex flex-column flex-md-row justify-content-between mb-5"},r.a.createElement("div",{className:"site-content"},r.a.createElement("img",{src:"img/concept.png",alt:"framework",className:"responsive mb-4"}),r.a.createElement("h4",{className:"mb-4 center"},"A React and Flask Framework"),r.a.createElement("div",{className:"subheading m-3"},r.a.createElement("h3",null,"the process")),r.a.createElement("hr",null),r.a.createElement("ol",{className:"mb-4"},r.a.createElement("li",null,"The web application first sends a request to Flask. "),r.a.createElement("li",null,"Flask then communicates with the backend python modules with the parameters of the request. "),r.a.createElement("li",null,"The backend modules then process the requests, and if necessary, pulls the data from the database.  "),r.a.createElement("li",null,"If data is needed from the database, the data will be returned to the backend python modules. "),r.a.createElement("li",null,"The backend modules then return the results to flask. "),r.a.createElement("li",null,"Flask then returns the results in a JSON payload. "),r.a.createElement("li",null,"The web application proceeds to parse the JSON string and visualise the results. ")),r.a.createElement("div",{className:"subheading m-3"},r.a.createElement("h3",null,"current limitations")),r.a.createElement("hr",null),r.a.createElement("ol",null,r.a.createElement("li",null,"Only supported social media sites will be scraped and analysed. This is due to the inherent differences when it comes to the web structure. Users, however, can alternatively submit content to be analysed through the same search functionality.  "),r.a.createElement("li",null,"The machine learning algorithm will not be updated on the fly. This is due to the overheads involved when it comes to model generation, and issues with model accuracy would be prevalent should the model be continuously reinforced with its own results. "),r.a.createElement("li",null,"The platform will only support URL(s) that are linked directly to the content. This means that the platform will not scrape for all posts made by a user.  ")))))),r.a.createElement("hr",{className:"m-0"}),r.a.createElement("section",{className:"site-section p-3 p-lg-5 d-flex align-items-left",id:"statistics"},r.a.createElement("div",{className:"w-100"},r.a.createElement("h2",{className:"mb-5"},"Statistics"),r.a.createElement(k,{highcharts:H.a}))),r.a.createElement("hr",{className:"m-0"}),r.a.createElement("section",{className:"site-section p-3 p-lg-5 d-flex align-items-left",id:"records"},r.a.createElement("div",{className:"w-100"},r.a.createElement("h2",{className:"mb-5"},"Past Analyses"),r.a.createElement(w,null))),r.a.createElement("hr",{className:"m-0"}),r.a.createElement("section",{className:"site-section p-3 p-lg-5 d-flex align-items-left",id:"search"},r.a.createElement("div",{className:"w-100"},r.a.createElement("h2",{className:"mb-5"},"Search"),r.a.createElement(C,null))),r.a.createElement("hr",{className:"m-0"}),r.a.createElement(R,null),r.a.createElement(D.a,{scrollTargetIds:["about","trending","methodology","statistics","records","search"],activeNavClass:"active",offset:0}),r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark bg-primary fixed-top",id:"sideNav"},r.a.createElement("a",{className:"navbar-brand",href:"#"},r.a.createElement("span",{className:"d-block d-lg-none"},"pofma.me"),r.a.createElement("span",{className:"d-none d-lg-block"},r.a.createElement("img",{className:"img-fluid img-profile rounded-circle mx-auto mb-2",alt:"Logo",src:"img/logo.png"}))),r.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},r.a.createElement("span",{className:"navbar-toggler-icon"})),r.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent"},r.a.createElement("ul",{className:"navbar-nav"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(P,null)))),r.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent"},r.a.createElement("ul",{className:"navbar-nav"},r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link active",href:"#about"},"About")),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"#trending"},"Trending ")),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"#methodology"},"Methodology")),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"#statistics"},"Statistics")),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"#records"},"History")),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:"#search"},"Search"))))))}}]),a}(n.Component),B=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function W(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}s.a.render(r.a.createElement(Y,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL(".",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat(".","/service-worker.js");B?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):W(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):W(t,e)}))}}()}},[[372,1,2]]]);
//# sourceMappingURL=main.6cc1080e.chunk.js.map