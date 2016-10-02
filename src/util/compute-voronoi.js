/* global d3, google */
import getColor from './colors';

export function computeVoronoi(data, map, handleHover) {
  const overlay = new google.maps.OverlayView();

  overlay.onAdd = function () {
    // http://stackoverflow.com/questions/13852065/custom-mouse-interaction-for-svg-layer-in-google-maps
    const select = d3.select(this.getPanes().overlayMouseTarget);
    select.html(''); // TODO this is a dirty solution how to empty
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

      const positions = data.map(d => {
        return {
          travelTime: d.value,
          name: d.name,
          latLng: googleMapProjection(d.lat, d.lng)
        }
      });

      const voronoiInit = d3.geom.voronoi()
        .x(function(d) { return d.latLng[0]; })
        .y(function(d) { return d.latLng[1]; });

      const polygons = voronoiInit(positions);

      const pathAttr = {
        d(d, i) {
          return 'M' + polygons[i].join('L') + 'Z'
        },
        stroke: 'darkgrey',
        fill(d, i) {
          return getColor((data[i].value / 60))
        },
        opacity: 0.4
      };

      svgoverlay.selectAll('path')
        .data(positions)
        .attr(pathAttr)
        .enter()
        .append('svg:path')
        .attr('class', 'cell')
        .attr(pathAttr)
        .on('mouseover', ({ name, travelTime }) => handleHover(name, travelTime));

      const circleAttr = {
        cx(d, i) { return positions[i].latLng[0]; },
        cy(d, i) { return positions[i].latLng[1]; },
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
