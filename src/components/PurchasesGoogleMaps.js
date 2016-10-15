import React, { Component } from 'react';
import {
  GoogleMap,
  Polyline,
  withGoogleMap } from 'react-google-maps';

import getColor from '../util/colors';
import { customizeMap } from '../util/customize-map';

const MAP_ACCESSOR= '__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED';

class PurchasesGoogleMaps extends Component {

  setupMap({ context }) {
    const map = context[MAP_ACCESSOR];
    customizeMap(map);
  }

  render() {
    const { props } = this;
    return (
      <GoogleMap
        ref={this.setupMap}
        defaultZoom={7}
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
