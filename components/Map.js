import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlices';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;

    // Zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      },
    });
  }, [origin, destination]);

  // Fetch travel time
  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      try {
        console.log('origin ka description map component' , origin.description);
        // const originDescription = encodeURIComponent(origin.description);
        // const destinationDescription = encodeURIComponent(destination.description);

        // console.log("Origin Description: ", originDescription);
        // console.log("Destination Description: ", destinationDescription);

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.description}&destinations=${destination.description}&units=imperial&key=${GOOGLE_MAPS_APIKEY}`
        );
        const data = await response.json();
        
        if (data.rows && data.rows[0].elements && data.rows[0].elements[0]) {
          console.log("getTravelTime: ", data);
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        } else {
          console.error('Invalid response from Distance Matrix API:', data);
        }
      } catch (error) {
        console.error('Error fetching travel time:', error);
      }
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY, dispatch]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      initialRegion={{
        latitude: origin?.location?.lat || 0,
        longitude: origin?.location?.lng || 0,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          destination={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
