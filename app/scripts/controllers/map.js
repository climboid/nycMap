'use strict';

nycMapApp.controller('MapCtrl', function($scope) {

 function makeJapanAll(){
  	var path, vis, xy;

		// xy = d3.geo.mercator().scale(16000).translate([-5600,2200]);

		xy = d3.geo.mercator().scale(13000).translate([3000,2000]);

		path = d3.geo.path().projection(xy);

		vis = d3.select("#mapNyc").append("svg:svg").attr("width", 1024).attr("height", 700);



		d3.json("data/nycGeoJson2.geojson", function(json) {
		  return vis.append("svg:g")
			  .attr("class", "tracts")
			  .selectAll("path")
			  .data(json.features).enter()
			  .append("svg:path")
			  .attr("d", path)
			  .attr("fill",function(d,i){ return d.properties.color || "transparent"})
			  .attr("id",function(d,i){ return d.id})
			  .attr("stroke", "#222")
			  .on("click", function(d,i) {
			  	var x = event.clientX;
			  	var y = event.clientY;
			  	var self = this.id;
			  	var el = _.find(glb.japanMapData,function(num){return num.id == self});
			  	$("#popUp").animate({
			  		'left':x+'px',
			  		'top':y-55+'px'
			  	},500,function(){
			  		$(this).css('display','block').find("h3").text(el.region);
			  		$(this).find("#twelve").text(el.sales2012);
			  		$(this).find("#eleven").text(el.sales2011);
			  	});
			  })

		});


  }


  makeJapanAll();
});
