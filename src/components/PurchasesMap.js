import React, { Component } from 'react';
import io from 'socket.io-client';

import PurchasesGoogleMaps from './PurchasesGoogleMaps';
const noop = () => ({});

class PurchasesMap extends Component {

  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

  componentWillMount() {
    const socket = io.connect('http://thawing-atoll-35104.herokuapp.com');
    socket.emit('ready');
    socket.on('message', (msg) => {
      const { data } = this.state;
      const payload = JSON.parse(msg);
      var route = {
        path: Object.keys(payload).filter(key => payload[key].length > 0).map(key => {
          return {
            lat: payload[key][1],
            lng: payload[key][0]
          };
        })
      };

      const a = route.path[0];
      const b = route.path[route.path.length - 1];
      const key = `${a.lat}${a.lng}${b.lat}${b.lng}`;

      if (data[key]) {
        data[key].power += 1;
        data[key].alive += 1;
      } else {
        data[key] = {
          alive: 100,
          power: 1,
          route,
        };
      }
      Object.keys(data).forEach(k => {
        data[k].alive -= 1;
      });
      Object.keys(data).forEach(k => {
        if (data[k].alive === 0) {
          delete data[k];
        }
      });
      this.setState({
        data,
        purchases: [route],
      });
    });
  }

  render() {
    return (
      <PurchasesGoogleMaps
        containerElement={
          <div style={{ height: '100%' }}/>
        }
        mapElement={
          <div style={{ height: '100%' }}/>
        }
        purchases={this.state.data}
        onMapClick={noop}
        onMapLoad={noop}/>
    );
  }
}

export default PurchasesMap;
