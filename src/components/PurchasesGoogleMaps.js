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
        defaultCenter={{ lat: 49.561150, lng: 16.958839 }}
        onClick={props.onMapClick}
      >
        {Object.keys(props.purchases).map((key, index)=> {
          const purchase = props.purchases[key];
          return (
            <Polyline
              key={index}
              path={purchase.route.path}
              options={{
                strokeOpacity: .5,
                strokeWeight: 10,
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
