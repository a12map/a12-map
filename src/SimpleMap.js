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
      defaultZoom={12}
      defaultCenter={{ lat: 50.070569, lng: 14.419172 }}
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
