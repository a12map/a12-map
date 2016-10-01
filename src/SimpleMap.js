import React from "react";
import {
  GoogleMapLoader,
  GoogleMap,
} from "react-google-maps";

const generateData = (dataPointsCount) => {
  let result = [];

  for (let i = 0; i < dataPointsCount; i++) {
    const lat = 50 + Math.random();
    const lng = 14 + Math.random();
    result[i] = {
      lat, lng, count: Math.random() * 10
    }
  }
  return result
};

const updateHeatMap = (map) => {
  const heatmap = new window.HeatmapOverlay(map,
    {
      // radius should be small ONLY if scaleRadius is true (or small radius is intended)
      "radius": 30,
      "maxOpacity": 1,
      // scales the radius based on map zoom
      "scaleRadius": false,
      // if set to false the heatmap uses the global maximum for colorization
      // if activated: uses the data maximum within the current map boundaries
      //   (there will always be a red spot with useLocalExtremas true)
      "useLocalExtrema": false,
      // which field name in your data represents the latitude - default "lat"
      latField: 'lat',
      // which field name in your data represents the longitude - default "lng"
      lngField: 'lng',
      // which field name in your data represents the data value - default "value"
      valueField: 'count'
    }
  );

  var testData = {
    max: 10,
    data: generateData(100)
  };

  console.log('testData', testData)

  heatmap.setData(testData);
};

const SimpleMap = props => {
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
      ref={(map) => map ? updateHeatMap(map.props.map) : undefined}
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
};

export default SimpleMap;
