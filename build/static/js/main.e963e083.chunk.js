(this["webpackJsonpreact-flask-app"]=this["webpackJsonpreact-flask-app"]||[]).push([[0],{10:function(e,a,t){},27:function(e,a,t){e.exports=t(51)},32:function(e,a,t){},51:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),s=t(19),r=t.n(s),c=(t(32),t(10),t(8)),i=t.n(c),o=t(20),m=t(2),u=t(3),d=t(6),h=t(5),p=t(7),f=t.n(p),E=t(21),v=t.n(E),b=t(4),g=t.n(b),N=function(e){Object(d.a)(t,e);var a=Object(h.a)(t);function t(e){var n;return Object(m.a)(this,t),(n=a.call(this,e)).state={data:[],isLoading:!1,error:null},n}return Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=Object(o.a)(i.a.mark((function e(){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({isLoading:!0}),e.prev=1,e.next=4,g.a.get("/api/results");case 4:a=e.sent,this.setState({data:a.data.results,isLoading:!1}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),this.setState({error:e.t0,isLoading:!1});case 11:case"end":return e.stop()}}),e,this,[[1,8]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,a=e.data,t=e.isLoading,n=e.error;if(n)return l.a.createElement("p",null,n.message);if(t)return l.a.createElement("p",null,"Loading ...");var s=[],r=[],c=[];Object.keys(a).forEach((function(e){s.push(a[e].platform),r.push(a[e].fake_news),c.push(a[e].real_news)}));var i={title:{text:"Number of falsehoods in the various social media platforms"},chart:{type:"column"},series:[{name:"Fake News",color:"#FB9039",data:r},{name:"Real News",color:"#1F3044",data:c}],credits:!1,xAxis:{categories:s},yAxis:{min:0,max:100,title:{text:"Percentage of Fake/Real News"},labels:{formatter:function(){return this.value+"%"}}},plotOptions:{column:{dataLabels:{enabled:!0,style:{textOutline:!1},formatter:function(){return this.y+"%"}},stacking:"normal"}},tooltip:{formatter:function(){return this.series.name+": "+this.y+"%"}}};return l.a.createElement(v.a,{highcharts:f.a,options:i})}}]),t}(n.Component),y=t(26),k=function(e){Object(d.a)(t,e);var a=Object(h.a)(t);function t(e){var n;return Object(m.a)(this,t),(n=a.call(this,e)).state={search:"",results:"",url:"",percentage:0,loading:!1},n}return Object(u.a)(t,[{key:"inputChangeHandler",value:function(e){this.setState({search:e.target.value})}},{key:"formHandler",value:function(e){var a=this;a.setState({loading:!0}),e.preventDefault();var t=this.state;g.a.post("/api/evaluate",t).then((function(e){var t=e.data;a.setState({loading:!1}),a.setState({results:t.results}),a.setState({url:t.url})})).catch((function(e){a.setState({loading:!1}),a.setState({results:e})}))}},{key:"render",value:function(){var e,a=this;return""==!this.state.results&&(e=l.a.createElement("div",null,l.a.createElement("hr",{className:"mb-3"}),l.a.createElement("h3",{className:"mb-2"},"Your result "),l.a.createElement("h4",null,"Link Entered: "),l.a.createElement("p",null,this.state.url),l.a.createElement("h4",null,"Text: "),l.a.createElement("p",null,this.state.results),l.a.createElement("h4",null,"Falsehood Probability: "),l.a.createElement("p",null,this.state.percentage,"%"))),this.state.loading&&(e=l.a.createElement("div",null,l.a.createElement("hr",{className:"mb-3"}),l.a.createElement("h3",{className:"mb-2"},"Your result "),l.a.createElement(y.a,{animation:"grow",variant:"dark"},l.a.createElement("span",{className:"sr-only"},"Loading...")))),l.a.createElement("div",null,l.a.createElement("div",{className:"input-group"},l.a.createElement("input",{type:"text",name:"search",className:"form-control",placeholder:"Validate your results today!",onChange:function(e){return a.inputChangeHandler.call(a,e)},value:this.state.search}),l.a.createElement("span",null,l.a.createElement("button",{type:"submit",className:"btn btn-primary",onClick:this.formHandler.bind(this)},l.a.createElement("i",{className:"fa fa-search"})))),e)}}]),t}(n.Component),w=t(24),x=t.n(w),S=t(25),O=t.n(S);var j=function(){return l.a.createElement("div",{className:"App"},l.a.createElement("div",{className:"container-fluid p-0"},l.a.createElement("section",{className:"resume-section p-3 p-lg-5 d-flex align-items-center",id:"about"},l.a.createElement("div",{className:"w-100"},l.a.createElement("h1",{className:"mb-0"},"POFMA",l.a.createElement("span",{className:"text-primary"}," Checker")),l.a.createElement("div",{className:"subheading mb-5"},"A rumour detection platform which seeks to identify falsehoods that are widely witnessed in social media."),l.a.createElement("div",{className:"subheading mb-5"},l.a.createElement("p",{className:"lead mb-5"},"With online falsehood creating distrust and unnecessary panic in our society, a social media rumour detection platform is needed to steer users away from the dissemination of fake news. As such, a rumour detection platform is created in hopes to address these concerns, and reduce the number of falsehood being perpetuated in the world today.")),l.a.createElement("p",{className:"subheading mb-5"}),l.a.createElement(k,null),l.a.createElement("hr",{className:"mb-2"}),l.a.createElement("div",{className:"social-icons"},l.a.createElement("a",{href:"mailto:hello@lesliecallum.com"},l.a.createElement("i",{className:"fa fa-envelope"})))))),l.a.createElement("hr",{className:"m-0"}),l.a.createElement("section",{className:"resume-section p-3 p-lg-5 d-flex justify-content-center",id:"methodology"},l.a.createElement("div",{className:"w-100"},l.a.createElement("h2",{className:"mb-5"},"Methodology"),l.a.createElement("div",{className:"resume-item d-flex flex-column flex-md-row justify-content-between mb-5"},l.a.createElement("div",{className:"resume-content"},l.a.createElement("h3",{className:"mb-0"},"A React and Flask Framework"),l.a.createElement("img",{src:"img/concept.png",alt:"framework",className:"responsive"}),l.a.createElement("div",{className:"subheading m-1"},"The Process"),l.a.createElement("hr",null),l.a.createElement("ol",null,l.a.createElement("li",null," The web application first sends a request to Flask. "),l.a.createElement("li",null," Flask then communicates with the backend python modules with the parameters of the request. "),l.a.createElement("li",null," The backend modules then process the requests, and if necessary, pulls the data from the database.  "),l.a.createElement("li",null," If data is needed from the database, the data will be returned to the backend python modules. "),l.a.createElement("li",null," The backend modules then return the results to flask. "),l.a.createElement("li",null," Flask then returns the results in a JSON payload. "),l.a.createElement("li",null," The web application will then proceed to parse the JSON string, and visualise the results. ")),l.a.createElement("div",{className:"subheading m-1"},"Current Limitations"),l.a.createElement("hr",null),l.a.createElement("ol",null,l.a.createElement("li",null,"The current supported social media platforms as of now are: Facebook, Instagram, and Twitter."),l.a.createElement("li",null,"The machine learning model are not updated on the fly but rather periodically due to the overheads and the ambiguity involved.")))))),l.a.createElement(O.a,{scrollTargetIds:["about","methodology","statistics"],activeNavClass:"active",offset:0}),l.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark bg-primary fixed-top",id:"sideNav"},l.a.createElement("a",{className:"navbar-brand",href:"#page-top"},l.a.createElement("span",{className:"d-block d-lg-none"},"pofma checker"),l.a.createElement("span",{className:"d-none d-lg-block"},l.a.createElement("img",{className:"img-fluid img-profile rounded-circle mx-auto mb-2",src:"img/logo.png"}))),l.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},l.a.createElement("span",{className:"navbar-toggler-icon"})),l.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent"},l.a.createElement("ul",{className:"navbar-nav"},l.a.createElement("li",{className:"nav-item"},l.a.createElement("a",{className:"nav-link active",href:"#about"},"About")),l.a.createElement("li",{className:"nav-item"},l.a.createElement("a",{className:"nav-link",href:"#methodology"},"Methodology")),l.a.createElement("li",{className:"nav-item"},l.a.createElement("a",{className:"nav-link",href:"#statistics"},"Statistics"))))),l.a.createElement("hr",{className:"m-0"}),l.a.createElement("section",{className:"resume-section p-3 p-lg-5 d-flex align-items-left",id:"statistics"},l.a.createElement("div",{className:"w-100"},l.a.createElement("h2",{className:"mb-5"},"Statistics"),l.a.createElement(N,{highcharts:x.a}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[27,1,2]]]);
//# sourceMappingURL=main.e963e083.chunk.js.map