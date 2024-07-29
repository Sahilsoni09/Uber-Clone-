import { View, Text, SafeAreaView, StyleSheet, Image} from 'react-native'
import React from 'react'
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux';
import {setDestination, setOrigin} from '../slices/navSlices'
import NavFavourites from '../components/NavFavourites';


const HomeScreen = () => {
  const dispatch = useDispatch();
  
  return (
    <SafeAreaView>
      <View style ={tw`p-5`}>
         <Image 
            style = {{
                width: 100,
                height: 100,
                resizeMode: 'contain'
            }}  
            source ={
                {
                    uri: "https://links.papareact.com/gzs"
                }
            } 
         />
         <GooglePlacesAutocomplete 
              placeholder='From where?'
              styles ={{
                container:{
                  flex:0,
                },
                textInput:{
                  fontSize: 18,
                },
              }}
              onPress={(data, details=null)=>{
                  console.log("origin description1:  ",data.description); // imformation like longitude and latitude
                // console.log(details); // one of the best place in earth
                  console.log("origin ki location ",details.geometry.location)
                dispatch(setOrigin({
                  location: details.geometry.location,
                  description: data.description
                }));

                dispatch(setDestination(null));
              }}
              fetchDetails={true}
              enablePoweredByContainer={false}// remove powered by google icon
              minLength={2}
              query={{
                key: GOOGLE_MAPS_APIKEY,
                language: 'en',
              }}
              nearbyPlacesAPI='GooglePlacesSearch'
              debounce={400}
             
         />
      </View>
      
      <NavOptions/>
      <NavFavourites/>
    </SafeAreaView>
  )
}

export default HomeScreen



