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

  componentWillReceiveProps(nextProps) {
    if (this.props.time !== nextProps.time) {
      this.updateMap(this.gmapRef, this.lastLat, this.lastLng);
      this.gmapRef.setMapTypeId(nextProps.time);
    }
  }

  handleMapClick(event) {
    this.updateMap(this.gmapRef, event.latLng.lat(), event.latLng.lng())
  }

  handleHover(stationName, travelTime) {
    this.props.onStopHover(stationName, travelTime)
  }

  updateMap(map, lat = pragueLoc.lat, lng = pragueLoc.lng) {
    this.lastLat = lat;
    this.lastLng = lng;
    fetch(`https://ph2016a12api.herokuapp.com/accessibility?lat=${lat}&lng=${lng}&time=${this.props.time}`)
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
        time={props.time}
        ref={this.setupMapB}
        defaultZoom={12}
        defaultCenter={pragueLoc}
        defaultOptions={{
          streetViewControl: false,
          mapTypeControl: false,
        }}
        mapTypeControl={false}
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
