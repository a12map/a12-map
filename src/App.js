import React, { Component } from 'react';
import update from "react-addons-update";

import './App.css';
import SimpleMap from './SimpleMap';

class App extends Component {

  constructor() {
    super();
    this.state = {
      markers: [{
        position: {
          lat: 25.0112183,
          lng: 121.52067570000001,
        },
        key: `Taiwan`,
        defaultAnimation: 2,
      }],
    };

    this.handleMapClickB = this.handleMapClick.bind(this);
    this.handleMarkerRightclickB = this.handleMarkerRightclick.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      let { markers } = this.state;
      markers = update(markers, {
        $push: [
          {
            position: {
              lat: 25.99,
              lng: 122.9,
            },
            defaultAnimation: 2,
            key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
          },
        ],
      });
      this.setState({ markers });
    }, 2000);
  }

  handleMapClick(event) {
    let { markers } = this.state;
    markers = update(markers, {
      $push: [
        {
          position: event.latLng,
          defaultAnimation: 2,
          key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
        },
      ],
    });
    this.setState({ markers });
  }

  handleMarkerRightclick(index, event) {
    let { markers } = this.state;
    markers = update(markers, {
      $splice: [
        [index, 1],
      ],
    });
    this.setState({ markers });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>A12 Map</h2>
        </div>
        <div className="App-map-container">
          <SimpleMap
            markers={this.state.markers}
            onMapClick={this.handleMapClickB}
            onMarkerRightclick={this.handleMarkerRightclickB}
          />
        </div>

      </div>
    );
  }
}

export default App;
