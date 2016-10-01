import React, { Component } from "react";
import {
  GoogleMapLoader,
  GoogleMap,
} from "react-google-maps";

import getColor from './colors';

import { computeVoronoi } from './util/compute-voronoi'

const getData = () => {
  return fetch('http://10.2.23.6:5000/accessibility?lat=50.089511&lng=14.435188')
    .then(response => response.json())
};

export default class SimpleMap extends Component {

  updateMap(map) {
    getData()
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
        ref={(mapWrapper) => this.updateMap(mapWrapper.props.map)}
        defaultZoom={12}
        defaultCenter={{ lat: 50.070569, lng: 14.419172 }}
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
