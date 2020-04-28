(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav' 
  });

})(jQuery); // End of use strict



document.addEventListener('DOMContentLoaded', function () {
  
  Highcharts.setOptions
  ({
    chart: 
    {
      style:
      {
        fontSize: '18px',
      }
    }
  });

  Highcharts.chart('chart', {
  chart: { type: 'column' },
  title: { text: null },
  xAxis: { categories: ['Twitter', 'Facebook', 'Instagram'] },
  yAxis: { min: 0, max: 100, title: { text: 'Percentage of Fake/Real News' }, labels: { formatter: function() { return this.value + '%'; } }},
  credits: { enabled: false },
  plotOptions: { 
	column: { 
		dataLabels: { enabled: true, style: { textOutline: false }, formatter: function() { return this.y + '%'; } },
	        stacking: 'normal',
	} 
  },
  series: [
	{ name: 'Fake', color: '#FB9039', data: [30, 40, 20] },
	{ name: 'Real', color: '#1F3044', data: [70, 60, 80] }],
  
  tooltip: { formatter: function() { return this.series.name + ": " + this.y + "%"; }},
})
});