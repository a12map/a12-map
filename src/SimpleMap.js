import React, { Component } from "react";
import {
  GoogleMapLoader,
  GoogleMap,
} from "react-google-maps";

const getData = () => {
  return fetch('http://localhost:3333/stops-test.json')
    .then(response => response.json())
};

export default class SimpleMap extends Component {

  gmap = null;

  componentDidMount() {
    getData()
      .then(dataPoints => {
        dataPoints.forEach(point => {
          new window.google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: this.gmap,
            center: {
              lat: point.lat,
              lng: point.lng,
            },
            radius: 10,
          });
        })
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
        ref={(mapWrapper) => this.gmap = mapWrapper.props.map}
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
