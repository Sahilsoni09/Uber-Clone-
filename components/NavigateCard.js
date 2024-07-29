import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAPS_APIKEY} from '@env'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrigin, setDestination } from '../slices/navSlices'
import { useNavigation } from '@react-navigation/native'
import RideOptionsCard from './RideOptionsCard'
import NavFavourites from './NavFavourites'
import { Icon } from '@rneui/base'



const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);
    console.log("origin hui set: ", origin);
    
  return (
    <SafeAreaView style ={tw`bg-white flex-1`}>
    
    <View>
      <Text style ={tw`text-center py-1 text-xl`}>Where You want to GO!!</Text>
      <View style = {tw`border-t border-gray-200 flex-shrink`}>
        <View>
            <GooglePlacesAutocomplete
                placeholder='where to '
                styles ={toInputBoxStyles}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
                fetchDetails ={true}
                // styles={toInputBoxStyles}
                returnKeyType ={'search'}
                minLength={2}
                enablePoweredByContainer={false}
                onPress={(data, details=null)=>{
                    console.log(data); // imformation like longitude and latitude
                    console.log(details); // one of the best place in earth
                    dispatch(setDestination({
                        location: details.geometry.location,
                        description: data.description
                    }))
                    navigation.navigate(RideOptionsCard);
                }}
                query={
                    {
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                    }
                }   
            />
        </View>
      </View>
      <NavFavourites/>
    </View>
      <View style ={tw`flex-row bg-white justify-evenly py-1 border-t border-gray-100`}>
        <TouchableOpacity 
        onPress={()=> navigation.navigate(RideOptionsCard)}
        style ={tw`flex  flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
            <Icon name ="car" type ="font-awesome" color ="white" size={16}/>
            <Text style ={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity style ={tw`flex  flex-row justify-between bg-white w-24 px-4 py-3 rounded-full`}>
            <Icon name ="fast-food-outline" type ="ionicon" color ="black" size={16}/>
            <Text style ={tw`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#dddddf",
        borderRadius: 0,
        fontSize: 12,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
});