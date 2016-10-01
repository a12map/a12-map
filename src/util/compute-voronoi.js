/* global d3, google */

export function computeVoronoi(data, gmap) {
  const overlay = new google.maps.OverlayView();

  overlay.onAdd = function() {
    const layer = d3.select(this.getPanes().overlayLayer).append("div").attr("class", "SvgOverlay");
    var svg = layer.append("svg");
    var svgoverlay = svg.append("g").attr("class", "AdminDivisions");

    overlay.draw = function() {
      const markerOverlay = this;
      const overlayProjection = markerOverlay.getProjection();

      /**
       * @param {[x, y]} coordinates
       * @return {*[]}
       */
      const googleMapProjection = function (coordinates) {
        var googleCoordinates = new google.maps.LatLng(coordinates[1], coordinates[0]);
        var pixelCoordinates = overlayProjection.fromLatLngToDivPixel(googleCoordinates);
        return [pixelCoordinates.x + 4000, pixelCoordinates.y + 4000];
      };

      const positions = data.map(d => googleMapProjection([d.lat, d.lng]));
      const polygons = d3.geom.voronoi(positions);

      const pathAttr = {
        d(d, i) {
          return "M" + polygons[i].join("L") + "Z"
        },
        stroke: "red",
        fill: "none"
      };

      svgoverlay.selectAll("path")
        .data(data)
        .attr(pathAttr)
        .enter()
        .append("svg:path")
        .attr("class", "cell")
        .attr(pathAttr);

      var circleAttr = {
        "cx":function(d, i) { return positions[i][0]; },
        "cy":function(d, i) { return positions[i][1]; },
        "r":2,
        fill:"red"
      };

      svgoverlay.selectAll("circle")
        .data(data)
        .attr(circleAttr)
        .enter()
        .append("svg:circle")
        .attr(circleAttr)
    }


  };
  overlay.setMap(gmap);
}
