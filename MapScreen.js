import React, {Component} from 'react';
import {View,StyleSheet,Keyboard} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';


export default class MapScreen extends Component {
render() {
  return (
    <MapView
        showsUserLocation
        followsUserLocation
        style={styles.map}
        region={{
          latitude:this.props.userLatitude,
          longitude: this.props.userLongitude,
           latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
   container: {
      ...StyleSheet.absoluteFillObject,
      flex:1,
      justifyContent: 'flex-end',
      alignItems: 'center',
  },
    map: {
        ...StyleSheet.absoluteFillObject
    }
});
