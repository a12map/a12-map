import React, { Component } from "react";

import {
  GoogleMapLoader,
  GoogleMap,
} from "react-google-maps";

import { computeVoronoi } from './util/compute-voronoi';
import { customizeMap } from './util/customize-map';

const pragueLoc = { lat: 50.070569, lng: 14.419172 };

export default class SimpleMap extends Component {

  constructor(props) {
    super(props);
    this.setupMapB = this.setupMap.bind(this);
    this.handleMapClickB = this.handleMapClick.bind(this);
    this.handleHoverB = this.handleHover.bind(this);
  }

  handleMapClick(event) {
    this.updateMap(this.gmapRef, event.latLng.lat(),event.latLng.lng())
  }

  handleHover(stationName, travelTime) {
    this.props.onStopHover(stationName, travelTime)
  }

  updateMap(map, lat = 50.089511, lng = 14.435188) {
    fetch(`http://10.2.23.6:5000/accessibility?lat=${lat}&lng=${lng}`)
      .then(response => response.json())
      .then(data => {
        computeVoronoi(data.stations, map, this.handleHoverB)
      })
  }

  setupMap(ref) {
    const {map} = ref.props;
    this.gmapRef = map;
    this.updateMap(map);
    customizeMap(map);
  }

  render() {
    const props = this.props;
    const containerElement =(
      <div
        {...props.containerElementProps}
        style={{
          height: `100%`,
        }}
      />
    );

    const googleMapElement = (
      <GoogleMap
        ref={this.setupMapB}
        defaultZoom={12}
        defaultCenter={pragueLoc}
        onClick={this.handleMapClickB}
      />
    );

    return (
      <GoogleMapLoader
        containerElement={containerElement}
        googleMapElement={googleMapElement}
      />
    )
  }
}
