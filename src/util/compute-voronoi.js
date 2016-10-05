/* global d3, google */
import { voronoi } from 'd3-voronoi';
import { throttle } from 'lodash';

import getColor from './colors';

const draw = function (data, handleHover) {
  // http://stackoverflow.com/questions/13852065/custom-mouse-interaction-for-svg-layer-in-google-maps
  const mapOverlay = d3.select(this.getPanes().overlayMouseTarget);
  mapOverlay.html(''); // TODO this is a dirty solution how to empty

  const svg = mapOverlay
    .append('div')
    .attr('class', 'SvgOverlay') // parent elem of SVG
    .append('svg');

  const googleMapProjection = (lat, lng) => {
    const pixelCoordinates = this.getProjection().fromLatLngToDivPixel(new google.maps.LatLng(lat, lng));
    return [pixelCoordinates.x + 1000, pixelCoordinates.y + 1000];
  };

  const bounds = this.map.getBounds();

  const positions = data
    .filter(d => bounds.contains(new google.maps.LatLng(d.lat, d.lng)))
    .map(d => ({
      travelTime: d.value,
      name: d.name,
      latLng: googleMapProjection(d.lat, d.lng)
    }));
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

  svg.selectAll('path')
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

  svg.selectAll('circle')
    .data(positions)
    .attr(circleAttr)
    .enter()
    .append('svg:circle')
    .attr(circleAttr)
};

export function computeVoronoi(data, map, handleHover) {
  const overlay = new google.maps.OverlayView();

  overlay.draw = draw.bind(overlay, data, handleHover);
  overlay.setMap(map);

  google.maps.event.clearListeners(map, 'bounds_changed');
  map.addListener('bounds_changed', () => {
    throttle(overlay.draw, 1000)(data, map, handleHover)
  });
}
