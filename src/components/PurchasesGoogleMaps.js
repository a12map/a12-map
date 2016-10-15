import React, { Component } from 'react';
import {
  GoogleMap,
  Polyline,
  withGoogleMap } from 'react-google-maps';

import getColor from '../util/colors';


class PurchasesGoogleMaps extends Component {
  render() {
    const { props } = this;
    return (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={8}
        defaultCenter={{ lat: 49.832317, lng: 15.5075141 }}
        onClick={props.onMapClick}
      >
        {Object.keys(props.purchases).map((key, index)=> {
          const purchase = props.purchases[key];
          return (
            <Polyline
              key={index}
              path={purchase.route.path}
              options={{
                strokeOpacity: .8,
                strokeWeight: 3,
                strokeColor: getColor(purchase.power)
              }}
            />
          );
        })}
      </GoogleMap>
    );
  }
}

export default withGoogleMap(PurchasesGoogleMaps);
