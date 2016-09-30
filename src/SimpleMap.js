import React from "react";
import {
  GoogleMapLoader,
  GoogleMap,
  Marker,
} from "react-google-maps";

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
      ref={(map) => console.log(map)}
      defaultZoom={3}
      defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
      onClick={props.onMapClick}
    >
      {props.markers.map((marker, index) => (
        <Marker
          {...marker}
          onRightclick={() => props.onMarkerRightclick(index)}
        />
      ))}
    </GoogleMap>
  );

  return (
    <section style={{ height: `100%` }}>
      <GoogleMapLoader
        containerElement={containerElement}
        googleMapElement={googleMapElement}
      />
    </section>
  )
};

export default SimpleMap;
