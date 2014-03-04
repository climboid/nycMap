'use strict';

nycMapApp.controller('MainCtrl', function($scope) {

 // map reduce function to examine the array of features and find
 // the bounded box for the set. Used to find the geographic center
 // to autmatically zoom the entire map based on height/width
  var featuresBounds = function(path, features) {
    return _.reduce(features, function(memo, feature) {
      var b = path.bounds(feature);

      if (memo[0][0] > b[0][0])
        memo[0][0] = b[0][0]
      if (memo[0][1] > b[0][1])
        memo[0][1] = b[0][1]
      if (memo[1][0] < b[1][0])
        memo[1][0] = b[1][0]
      if (memo[1][1] < b[1][1])
        memo[1][1] = b[1][1]

      return memo;
    }, path.bounds(features[0]));
  }


 function makeNY(){
    var width = 960,
        height = 500,
        zoomToFit = 0.95, // zoom in 95% of the height/width
        active,
        projection = d3.geo.mercator(),
        path = d3.geo.path().projection(projection);

    var click = function (d) {
      if (active === d) return reset();
      g.selectAll(".active").classed("active", false);
      d3.select(this).classed("active", active = d);

      var b = path.bounds(d);
      var box = [(b[1][0]+b[0][0])/2, (b[1][1]+b[0][1])/2];
      var s = zoomToFit / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
      var t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

      g.transition().duration(750).attr("transform",
          "translate(" + box + ")"
          + "scale(" + s + ")"
          + "translate(" + -box[0] + "," + -(b[1][1] + b[0][1]) / 2 + ")");
    }

    var reset = function() {
      g.selectAll(".active").classed("active", active = false);
      g.transition().duration(750).attr("transform", "");
    }

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    var g = svg.append("g");

    d3.json("data/nycGeoJson2.geojson", function(json) {
      projection.scale(1).translate([0, 0]);

      var b = featuresBounds(path, json.features),
        s = zoomToFit / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
        t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

      projection.scale(s).translate(t);

      g.selectAll("path")
        .data(json.features).enter()
        .append("svg:path")
        .attr("d", path)
        .attr("class","feature")
        .on("click", click);
    });
  }

  makeNY();
});
