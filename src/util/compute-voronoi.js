/* global d3, google */
import { voronoi } from 'd3-voronoi';

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
        const pixelCoordinates = overlayProjection.fromLatLngToDivPixel(new google.maps.LatLng(lat, lng));
        return [pixelCoordinates.x + 1000, pixelCoordinates.y + 1000];
      };

      const positions = data.map(d => {
        return {
          travelTime: d.value,
          name: d.name,
          latLng: googleMapProjection(d.lat, d.lng)
        }
      });
      const infinity = 1e6;
      const v2 = voronoi()
        .x(function(d) { return d.latLng[0]; })
        .y(function(d) { return d.latLng[1]; })
        .extent([[-infinity, -infinity], [infinity, infinity]]);

      const pathAttr = {
        d(d) {
          return 'M' + d.join('L') + 'Z'
        },
        stroke: 'darkgrey',
        fill(d, i) {
          return getColor((d.data.travelTime / 60))
        },
        opacity: 0.4
      };

      svgoverlay.selectAll('path')
        .data(v2.polygons(positions))
        .attr(pathAttr)
        .enter()
        .append('svg:path')
        .attr('class', 'cell')
        .attr(pathAttr)
        .on('mouseover', ({ data }) => {
          handleHover(data.name, data.travelTime)
        });

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
