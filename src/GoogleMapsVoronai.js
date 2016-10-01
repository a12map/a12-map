import React, { Component } from "react";
import {
  GoogleMapLoader,
  GoogleMap,
} from "react-google-maps";

import { computeVoronoi } from './util/compute-voronoi';

const pragueLoc = { lat: 50.070569, lng: 14.419172 };

export default class SimpleMap extends Component {

  constructor(props) {
    super(props);

    this.handleMapClickB = this.handleMapClick.bind(this)
  }

  handleMapClick(event) {
    this.updateMap(this.gmapRef, event.latLng.lat(),event.latLng.lng())
  }

  updateMap(map, lat = 50.089511, lng = 14.435188) {
    fetch(`http://10.2.23.6:5000/accessibility?lat=${lat}&lng=${lng}`)
      .then(response => response.json())
      .then(data => {
        computeVoronoi(data.stations, map)
      })
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
        ref={(mapWrapper) => {
          this.gmapRef = mapWrapper.props.map;
          this.updateMap(mapWrapper.props.map);
        }}
        defaultZoom={12}
        defaultCenter={pragueLoc}
        onClick={this.handleMapClickB}
      />
    );

    return (
      <section style={{ height: `90%` }}>
        <GoogleMapLoader
          containerElement={containerElement}
          googleMapElement={googleMapElement}
        />
      </section>
    )
  }
}
