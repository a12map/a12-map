import React, {Component} from 'react';
import update from "react-addons-update";

import './App.css';
import SimpleMap from './GoogleMapsVoronai';

import getColor from './util/colors';
const SCALE_MINUTES = [0, 10, 20, 30, 40, 50, 60];
const DAY = 'day';
const NIGHT = 'night';

class App extends Component {

  constructor() {
    super();
    this.state = {
      markers: [],
      time: DAY,
      selectedStation: '',
      travelTime: 0,
    };

    this.handleMapClickB = this.handleMapClick.bind(this);
    this.handleMarkerRightclickB = this.handleMarkerRightclick.bind(this);
    this.handleStopHoverB = this.handleStopHover.bind(this);
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

  handleStopHover(selectedStation, travelTime) {
    this.setState(Object.assign({}, this.state, { selectedStation, travelTime }))
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

  handleTimeChange(event) {
    this.setState({time: event.target.value});
  }

  formatTravelTime(travelTime) {
    return `${~~(travelTime / 60)} min.`
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>A12 Map</h2>
        </div>
        <div className="App-map-container">
          <SimpleMap
            time={this.state.time}
            markers={this.state.markers}
            onStopHover={this.handleStopHoverB}
            onMapClick={this.handleMapClickB}
            onMarkerRightclick={this.handleMarkerRightclickB}
          />
        </div>
        <div className="App-time">
          <input
            type="radio"
            value={DAY}
            checked={this.state.time === DAY}
            onChange={this.handleTimeChange.bind(this)}/>
            {DAY}
          <br/>
          <input
            type="radio"
            value={NIGHT}
            checked={this.state.time === NIGHT}
            onChange={this.handleTimeChange.bind(this)}/>
          {NIGHT}
          <br/>
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
          {this.state.selectedStation && (
            <div>
              <div>{this.state.selectedStation}</div>
              <div>{this.formatTravelTime(this.state.travelTime)}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
