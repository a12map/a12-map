/* global d3, google */
import { voronoi } from 'd3-voronoi';
import { select } from 'd3';

import getColor from './colors';

let selected;

const draw = function (data, handleHover) {
  // http://stackoverflow.com/questions/13852065/custom-mouse-interaction-for-svg-layer-in-google-maps
  const svgWrapper = select('.svgWrapper');
  svgWrapper.html(''); // TODO this is a dirty solution how to empty

  const bounds = this.map.getBounds();
  const { x } = this.getProjection().fromLatLngToDivPixel(bounds.getSouthWest()); // bottomLeft
  const { y } = this.getProjection().fromLatLngToDivPixel(bounds.getNorthEast()); // topRight

  const svg = svgWrapper
    .append('svg')
    .style('width', window.innerWidth + 'px')
    .style('height', window.innerHeight + 'px')
    .style('margin-left', x + 'px')
    .style('margin-top', y + 'px');

  const g = svg.append('g')
    .attr('transform', `translate(${-x},${-y})`);
  
  const googleMapProjection = (lat, lng) => {
    const pixelCoordinates = this.getProjection().fromLatLngToDivPixel(new google.maps.LatLng(lat, lng));
    return [pixelCoordinates.x, pixelCoordinates.y];
  };

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

  const pointGroup = g.attr('class', 'points')
    .selectAll('g')
    .data(v2.polygons(positions))
    .enter()
    .append('g')
    .attr('class', 'point');

  pointGroup.append('path')
    .attr('d', d => 'M' + d.join('L') + 'Z')
    .attr('fill', (d, i) => getColor((d.data.travelTime / 60)))
    .attr('class', 'cell')
    .on('mouseover', ({ data }) => {
      handleHover(data.name, data.travelTime);
    })
    .on('click', (data) => {
      selected = data.data.latLng.toString();
    })
    .classed('selected', data => data.data.latLng.toString() === selected);

  pointGroup.append('circle')
    .attr('transform', ({ data }) => `translate(${data.latLng[0]},${data.latLng[1]})`)
    .attr('r', 1)
    .attr('fill', 'black');
};

export function computeVoronoi(data, map, handleHover) {
  const overlay = new google.maps.OverlayView();

  overlay.setMap(map);
  overlay.onAdd = function() {
    const overlayTarget = this.getPanes().overlayMouseTarget;
    overlayTarget.className = 'svgWrapper';
    overlay.draw = draw.bind(overlay, data, handleHover);
  };

  google.maps.event.clearListeners(map, 'dragend');
  map.addListener('dragend', draw.bind(overlay, data, handleHover));
}
