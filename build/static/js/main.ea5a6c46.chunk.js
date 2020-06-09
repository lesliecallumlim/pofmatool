(this["webpackJsonpreact-flask-app"]=this["webpackJsonpreact-flask-app"]||[]).push([[0],{11:function(e,t,a){},28:function(e,t,a){e.exports=a(52)},33:function(e,t,a){},52:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(20),s=a.n(r),c=(a(33),a(11),a(7)),i=a.n(c),o=a(8),m=a(2),u=a(3),d=a(6),h=a(5),p=a(9),E=a.n(p),f=a(21),b=a.n(f),v=a(4),g=a.n(v),y=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).state={data:[],isLoading:!1,error:null},n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=Object(o.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({isLoading:!0}),e.prev=1,e.next=4,g.a.get("/api/results");case 4:t=e.sent,this.setState({data:t.data.results,isLoading:!1}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),this.setState({error:e.t0,isLoading:!1});case 11:case"end":return e.stop()}}),e,this,[[1,8]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.data,a=e.isLoading,n=e.error;if(n)return l.a.createElement("p",null,n.message);if(a)return l.a.createElement("p",null,"Loading ...");var r=[],s=[],c=[];Object.keys(t).forEach((function(e){r.push(t[e].platform),s.push(t[e].fake_news),c.push(t[e].real_news)}));var i={title:{text:"Number of falsehoods in the various social media platforms"},chart:{type:"column"},series:[{name:"Fake News",color:"#FB9039",data:s},{name:"Real News",color:"#1F3044",data:c}],credits:!1,xAxis:{categories:r},yAxis:{min:0,max:100,title:{text:"Percentage of Fake/Real News"},labels:{formatter:function(){return this.value+"%"}}},plotOptions:{column:{dataLabels:{enabled:!0,style:{textOutline:!1},formatter:function(){return this.y+"%"}},stacking:"normal"}},tooltip:{formatter:function(){return this.series.name+": "+this.y+"%"}}};return l.a.createElement(b.a,{highcharts:E.a,options:i})}}]),a}(n.Component),N=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).state={data:[],isLoading:!1,error:null,refresh:!1},n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=Object(o.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({isLoading:!0}),e.prev=1,e.next=4,g.a.get("/api/history");case 4:t=e.sent,console.log(t),this.setState({data:t.data,isLoading:!1}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),this.setState({error:e.t0,isLoading:!1});case 12:case"end":return e.stop()}}),e,this,[[1,9]])})));return function(){return e.apply(this,arguments)}}()},{key:"renderTableData",value:function(){return this.state.data.map((function(e,t){var a=e.date_added,n=e.fraud,r=e.id,s=e.platform,c=e.sentiment,i=(e.text,e.url);return l.a.createElement("tr",{key:r},l.a.createElement("td",null,s),l.a.createElement("td",null,i),l.a.createElement("td",null,c),l.a.createElement("td",{style:{textTransform:"capitalize"}},n+""),l.a.createElement("td",null,a))}))}},{key:"refresh",value:function(){this.setState({refresh:!0}),this.renderTableData()}},{key:"render",value:function(){var e=this.state,t=(e.data,e.isLoading),a=e.error;return a?l.a.createElement("p",null,a.message):t?l.a.createElement("p",null,"Loading ..."):l.a.createElement("div",{className:"table-responsive"},l.a.createElement("table",{id:"history",className:"table-hover table"},l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Platform"),l.a.createElement("th",null,"URL"),l.a.createElement("th",null,"Sentiments"),l.a.createElement("th",null,"Falsehood"),l.a.createElement("th",null,"Date Added")),this.renderTableData())),l.a.createElement("span",null,l.a.createElement("button",{type:"submit",className:"btn btn-primary",onClick:this.refresh.bind(this)},"Refresh")))}}]),a}(n.Component),k=a(27),w=a(22),x=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).state={search:"",results:"",url:"",fraud:!1,loading:!1,sentiment:"",dialog:!1},n}return Object(u.a)(a,[{key:"inputChangeHandler",value:function(e){this.setState({search:e.target.value})}},{key:"handleClose",value:function(e){this.setState({dialog:!1})}},{key:"formHandler",value:function(e){var t=this;t.setState({loading:!0}),t.setState({dialog:!0}),e.preventDefault();var a=this.state;g.a.post("/api/evaluate",a).then((function(e){var a=e.data;t.setState({loading:!1}),t.setState({results:a.results}),t.setState({url:a.url}),t.setState({sentiment:a.sentiment}),t.setState({fraud:a.fraud})})).catch((function(e){t.setState({loading:!1}),t.setState({results:e})}))}},{key:"render",value:function(){var e,t,a,n=this;""==!this.state.results&&(t="Positive"==this.state.sentiment?"success":"danger",a=this.state.fraud?"danger":"success",e=""==!this.state.sentiment?l.a.createElement("div",null,l.a.createElement("hr",null),l.a.createElement("h3",null,"Your result"),l.a.createElement("hr",{style:{"margin-top":"-0.1em"}}),l.a.createElement("h4",null,"Link Entered: "),l.a.createElement("p",null,this.state.url),l.a.createElement("h4",null,"Keywords: "),l.a.createElement("p",null,this.state.results),l.a.createElement("h4",null,"Falsehood:"),l.a.createElement("span",{style:{textTransform:"capitalize"},className:"badge p-2 mr-1 mb-3 badge-"+a},this.state.fraud+""),l.a.createElement("h4",null,"Sentiments: "),l.a.createElement("span",{className:"badge p-2 mr-1 mb-3 badge-"+t},this.state.sentiment),l.a.createElement("h4",null,"What do you think?"),l.a.createElement("button",{className:"btn badge badge-success p-2 mr-1 mb-3"},"Excellent!"),l.a.createElement("button",{className:"btn badge badge-warning p-2 mr-1 mb-3"},"More work to be done!"),l.a.createElement("button",{className:"btn badge badge-dark p-2 mr-1 mb-3"},"Terrible!")):l.a.createElement("div",null,l.a.createElement("hr",null),l.a.createElement("h3",null,"Your result"),l.a.createElement("hr",{style:{"margin-top":"-0.1em"}}),l.a.createElement("h4",null,"Link Entered: "),l.a.createElement("p",null,this.state.url),l.a.createElement("h4",null,"Error: "),l.a.createElement("p",null,this.state.results)));return this.state.loading&&(e=l.a.createElement("div",null,l.a.createElement("hr",{className:"mb-3"}),l.a.createElement("h3",{className:"mb-2"},"Your result "),l.a.createElement(k.a,{animation:"grow",variant:"dark"},l.a.createElement("span",{className:"sr-only"},"Loading...")))),l.a.createElement("div",null,l.a.createElement("div",{className:"input-group"},l.a.createElement("input",{type:"text",name:"search",className:"form-control",placeholder:"Validate your results today!",onChange:function(e){return n.inputChangeHandler.call(n,e)},value:this.state.search}),l.a.createElement("div",null,l.a.createElement(w.a,{modal:!0,contentStyle:{maxWidth:"500px",width:"70%","text-align":"center","border-radius":"20px"},trigger:l.a.createElement("span",null,l.a.createElement("button",{type:"submit",className:"btn btn-primary",onClick:this.formHandler.bind(this)},l.a.createElement("i",{className:"fa fa-search"})))},e))))}}]),a}(n.Component),S=a(25),O=a.n(S),L=a(26),T=a.n(L);var j=function(){return l.a.createElement("div",{className:"App"},l.a.createElement("div",{className:"container-fluid p-0"},l.a.createElement("section",{className:"site-section p-3 p-lg-5 d-flex align-items-center",id:"about"},l.a.createElement("div",{className:"w-100"},l.a.createElement("div",{className:"mb-5"}),l.a.createElement("h1",{className:"mb-3"},"pofma.",l.a.createElement("span",{className:"text-primary"},"me")),l.a.createElement("div",{className:"subheading mb-5"},"a rumour detection platform which seeks to identify falsehoods that are widely witnessed in social media."),l.a.createElement("div",{className:"subheading mb-5"},l.a.createElement("p",{className:"lead mb-5"},"With online falsehood creating distrust and unnecessary panic in our society, a social media rumour detection platform is needed to steer users away from the dissemination of fake news. As a result, a rumour detection platform is created in hopes to address these concerns and reduce the amount of falsehood perpetuated in the world today.")),l.a.createElement("p",{className:"subheading mb-5"}),l.a.createElement(x,null),l.a.createElement("hr",{className:"mb-2"}),l.a.createElement("div",{className:"social-icons"},l.a.createElement("a",{href:"mailto:hello@lesliecallum.com"},l.a.createElement("i",{className:"fa fa-envelope"})))))),l.a.createElement("hr",{className:"m-0"}),l.a.createElement("section",{className:"site-section p-3 p-lg-5 d-flex justify-content-center",id:"methodology"},l.a.createElement("div",{className:"w-100"},l.a.createElement("h2",{className:"mb-5"},"methodology"),l.a.createElement("div",{className:"site-item d-flex flex-column flex-md-row justify-content-between mb-5"},l.a.createElement("div",{className:"site-content"},l.a.createElement("img",{src:"img/concept.png",alt:"framework",className:"responsive mb-4"}),l.a.createElement("h4",{className:"mb-4 center"},"A React and Flask Framework"),l.a.createElement("div",{className:"subheading m-3"},l.a.createElement("h3",null,"the process")),l.a.createElement("hr",null),l.a.createElement("ol",{className:"mb-4"},l.a.createElement("li",null,"The web application first sends a request to Flask. "),l.a.createElement("li",null,"Flask then communicates with the backend python modules with the parameters of the request. "),l.a.createElement("li",null,"The backend modules then process the requests, and if necessary, pulls the data from the database.  "),l.a.createElement("li",null,"If data is needed from the database, the data will be returned to the backend python modules. "),l.a.createElement("li",null,"The backend modules then return the results to flask. "),l.a.createElement("li",null,"Flask then returns the results in a JSON payload. "),l.a.createElement("li",null,"The web application proceeds to parse the JSON string and visualise the results. ")),l.a.createElement("div",{className:"subheading m-3"},l.a.createElement("h3",null,"current limitations")),l.a.createElement("hr",null),l.a.createElement("ol",null,l.a.createElement("li",null,"Only supported social media sites will be scraped and analysed. This is due to the inherent differences when it comes to the web structure. Users, however, can alternatively submit content to be analysed through the same search functionality.  "),l.a.createElement("li",null,"TThe machine learning algorithm will not be updated on the fly. This is due to the overheads involved when it comes to model generation, and issues with model accuracy would be prevalent should the model be continuously reinforced with its own results. "),l.a.createElement("li",null,"The platform will only support URL(s) that are linked directly to the content. This means that the platform will not scrape for all posts made by a user.  ")))))),l.a.createElement("hr",{className:"m-0"}),l.a.createElement("section",{className:"site-section p-3 p-lg-5 d-flex align-items-left",id:"statistics"},l.a.createElement("div",{className:"w-100"},l.a.createElement("h2",{className:"mb-5"},"Statistics"),l.a.createElement(y,{highcharts:O.a}),l.a.createElement("i",null,"Only news that are classified with 70% probability threshold are part of the tabulation for fake news. "))),l.a.createElement("hr",{className:"m-0"}),l.a.createElement("section",{className:"site-section p-3 p-lg-5 d-flex align-items-left",id:"records"},l.a.createElement("div",{className:"w-100"},l.a.createElement("h2",{className:"mb-5"},"Past Analyses"),l.a.createElement(N,null))),l.a.createElement(T.a,{scrollTargetIds:["about","methodology","statistics","records"],activeNavClass:"active",offset:0}),l.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark bg-primary fixed-top",id:"sideNav"},l.a.createElement("a",{className:"navbar-brand",href:"#"},l.a.createElement("span",{className:"d-block d-lg-none"},"pofma checker"),l.a.createElement("span",{className:"d-none d-lg-block"},l.a.createElement("img",{className:"img-fluid img-profile rounded-circle mx-auto mb-2",alt:"Logo",src:"img/logo.png"}))),l.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},l.a.createElement("span",{className:"navbar-toggler-icon"})),l.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent"},l.a.createElement("ul",{className:"navbar-nav"},l.a.createElement("li",{className:"nav-item"},l.a.createElement("a",{className:"nav-link active",href:"#about"},"About")),l.a.createElement("li",{className:"nav-item"},l.a.createElement("a",{className:"nav-link",href:"#methodology"},"Methodology")),l.a.createElement("li",{className:"nav-item"},l.a.createElement("a",{className:"nav-link",href:"#statistics"},"Statistics")),l.a.createElement("li",{className:"nav-item"},l.a.createElement("a",{className:"nav-link",href:"#records"},"History"))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[28,1,2]]]);
//# sourceMappingURL=main.ea5a6c46.chunk.js.map