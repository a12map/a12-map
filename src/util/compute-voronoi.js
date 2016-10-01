/* global d3, google */
import getColor from './../colors';

export function computeVoronoi(data, map) {
  const overlay = new google.maps.OverlayView();

  overlay.onAdd = function () {
    var select = d3.select(this.getPanes().overlayLayer);
    select.html("");
    const layer = select
      .append('div').attr('class', 'SvgOverlay');

    const svg = layer.append('svg');
    const svgoverlay = svg.append('g').attr('class', 'AdminDivisions');

    overlay.draw = function () {
      const markerOverlay = this;
      const overlayProjection = markerOverlay.getProjection();

      const googleMapProjection = function (lat, lng) {
        const googleCoordinates = new google.maps.LatLng(lat, lng);
        const pixelCoordinates = overlayProjection.fromLatLngToDivPixel(googleCoordinates);
        return [pixelCoordinates.x + 4000, pixelCoordinates.y + 4000];
      };

      const positions = data.map(d => googleMapProjection(d.lat, d.lng));

      const polygons = d3.geom.voronoi(positions);

      const pathAttr = {
        d(d, i) {
          return 'M' + polygons[i].join('L') + 'Z'
        },
        stroke: 'darkgrey',
        fill(d, i) {
          return getColor((data[i].value / 60) * 5)
        },
        opacity: 0.3
      };

      svgoverlay.selectAll('path')
        .data(positions)
        .attr(pathAttr)
        .enter()
        .append('svg:path')
        .attr('class', 'cell')
        .attr(pathAttr);

      const circleAttr = {
        cx(d, i) { return positions[i][0]; },
        cy(d, i) { return positions[i][1]; },
        r: 1,
        fill:'black'
      };

      svgoverlay.selectAll('circle')
        .data(positions)
        .attr(circleAttr)
        .enter()
        .append('svg:circle')
        .attr(circleAttr)
    };
  };

  overlay.setMap(map);
}
