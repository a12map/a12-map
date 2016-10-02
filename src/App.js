import React, {Component} from 'react';
import update from "react-addons-update";

import './App.css';
import SimpleMap from './GoogleMapsVoronai';

import getColor from './util/colors';
const SCALE_MINUTES = [0, 10, 20, 30, 40, 50, 60];

class App extends Component {

  constructor() {
    super();
    this.state = {
      markers: [],
    };

    this.handleMapClickB = this.handleMapClick.bind(this);
    this.handleMarkerRightclickB = this.handleMarkerRightclick.bind(this);
  }

  handleMapClick(event) {
    let {markers} = this.state;
    markers = update(markers, {
      $push: [
        {
          position: event.latLng,
          defaultAnimation: 2,
          key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
        },
      ],
    });
    this.setState({markers});
  }

  handleMarkerRightclick(index, event) {
    let {markers} = this.state;
    markers = update(markers, {
      $splice: [
        [index, 1],
      ],
    });
    this.setState({markers});
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
        <div className="App-infobox">
          <div>
            {SCALE_MINUTES.map((minute, index) => (
              <div key={index} style={{backgroundColor: getColor(minute)}} className="Scale-rectangle"/>
            ))}
          </div>
          <div>
            {SCALE_MINUTES.map((minute, index) => (
              <div key={index} className="Scale-label">{minute}</div>
            ))}
          </div>
        </div>
        <div className="App-infobox-stops">
          ?
        </div>
      </div>
    );
  }
}

export default App;
