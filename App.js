import React, { Component } from 'react';
import { Text, StyleSheet, View,TouchableWithoutFeedback ,Keyboard} from 'react-native';
import MapScreen from "./MapScreen";
import PlaceInput from "./component/PlaceInput";
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';


export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
       userLatitude: 0 ,
       userLongitude: 0
    };
    this.locationWatchId =null;
    this.showDirectionsOnMap=this.showDirectionsOnMap.bind(this);
  }

componentDidMount(){
  this.requestFineLocation();
}


UNSAFE_componentWillMount(){
    Geolocation.clearWatch(this.locationWatchId);
}


async showDirectionsOnMap(placeId){
  const{userLatitude,userLongitude} =this.state;
try{
  const result = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${userLatitude},${userLongitude}&destination=place_id:${placeId}&key="API KEY"`);
console.log(result.data);
}catch(err){
  console.error(err);
}
}

hideKeyboard(){
  Keyboard.dismiss();
}

getUserPosition(){
  this.locationId = Geolocation.watchPosition(
       (position) => {
           console.log(position);
       },
       (error) => {
           // See error code charts below.
           console.log(error.code, error.message);
       },
       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
   );
}

async requestFineLocation(){
  this.getUserPosition();
}



  render() {
    return(
     <TouchableWithoutFeedback onPress ={this.hideKeyboard}>
    <View style={styles.container}>
    <MapScreen
    userLatitude= {this.state.userLatitude}
    userLongitude={this.state.userLongitude}
    />
    <PlaceInput
    showDirectionsOnMap={this.showDirectionsOnMap}
    userLatitude= {this.state.userLatitude}
    userLongitude={this.state.userLongitude}/>
    </View>
   </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1

  },})
