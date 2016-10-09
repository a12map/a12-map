/* global REACT_APP_MAP_KEY */
import React, {Component} from 'react';

import './App.css';
import GoogleMapsVoronai from './GoogleMapsVoronai';

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

    this.handleStopHoverB = this.handleStopHover.bind(this);
  }

  handleStopHover(selectedStation, travelTime) {
    this.setState(Object.assign({}, this.state, { selectedStation, travelTime }));
  }

  handleTimeChange(event) {
    this.setState({time: event.target.value});
  }

  formatTravelTime(travelTime) {
    return `${~~(travelTime / 60)} min`;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>A12 Map</h2>
          <span className="App-header-button">
            <a className="github-button" href="https://github.com/vire/a12-map/" aria-label="View a12-map on GitHub">
              Github
            </a>
          </span>
        </div>
        <div className="App-map-container">
          <GoogleMapsVoronai
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
        {this.state.selectedStation && (
          <div className="App-infobox-stops">
            <div>{this.state.selectedStation}</div>
            <div>{this.formatTravelTime(this.state.travelTime)}</div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
