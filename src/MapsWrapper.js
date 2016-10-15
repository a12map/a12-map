import React, { Component } from 'react';
import {
  GoogleMap,
  OverlayView,
  withGoogleMap,
} from 'react-google-maps';

import VoronoOverlay from './VoronoiOverlay';
import { computeVoronoi } from './util/compute-voronoi';
import { customizeMap } from './util/customize-map';
import { fetchData } from './services/api';

const MAP_ACCESSOR= '__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED';
const pragueLoc = { lat: 50.070569, lng: 14.419172 };

export class MapsWrapper extends Component {

  static propTypes = {
    onStationHover: React.PropTypes.func,
    time: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.setupMapB = this.setupMap.bind(this);
    this.handleMapClickB = this.handleMapClick.bind(this);
    this.handleHoverB = this.handleHover.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.time !== nextProps.time) {
      this.updateMap(this.gmapRef, this.lastLat, this.lastLng, nextProps.time);
    }
  }

  handleMapClick(event) {
    this.updateMap(this.gmapRef, event.latLng.lat(), event.latLng.lng());
  }

  handleHover(stationName, travelTime) {
    this.props.onStationHover(stationName, travelTime);
  }

  updateMap(map, lat = pragueLoc.lat, lng = pragueLoc.lng, time = 'day') {
    this.lastLat = lat;
    this.lastLng = lng;
    fetchData(process.REACT_APP_BACKEND_URL, {lat, lng, time})
      .then(data => {
        computeVoronoi(data.stations, map, this.handleHoverB);
        this.gmapRef.setMapTypeId(time);
      });
  }

  setupMap({ context }) {
    const map = context[MAP_ACCESSOR];
    this.gmapRef = map;
    this.updateMap(map);
    customizeMap(map);
  }

  render() {
    console.log('render in MapsWrapper');
    return (
      <GoogleMap
        time={this.props.time}
        ref={this.setupMapB}
        defaultZoom={12}
        defaultCenter={pragueLoc}
        defaultOptions={{
          streetViewControl: false,
          mapTypeControl: false,
        }}
        mapTypeControl={false}
        onClick={this.handleMapClickB}
      >
        <OverlayView
          position={pragueLoc}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <VoronoOverlay/>
        </OverlayView>
      </GoogleMap>
    );
  }
}

export default withGoogleMap(MapsWrapper);
