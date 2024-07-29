import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image,SafeAreaView} from 'react-native'
import React, { useState } from 'react'

import tw from 'twrnc'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'

import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlices'

const data = [
    {
        id: "Uber-X-123",
        title: "Uber X",
        multiplier: 1,
        image: "https://links.papareact.com/3pn",
    },
    {
        id: "Uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8",
    },
    {
        id: "Uber-LUX-789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf",
    },
];

const SURGE_PRICE_RATE =1;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected,setSelected] = useState();
    const travelTimeInformation = useSelector(selectTravelTimeInformation)
    console.log(travelTimeInformation);
  return (
    <SafeAreaView style ={tw`bg-white`}>
        <View>
            <TouchableOpacity 
                onPress={()=>navigation.navigate("NavigateCard")}
                style={tw`absolute top--1 left-5 z-50 p-3 rounded-full`}>
                <Icon name="chevron-left" type="fontawesome"/>
            </TouchableOpacity>
            <Text style ={tw`text-center  text-xl`}>
                Select a Ride -{travelTimeInformation?.distance?.text}
            </Text>
        </View>
        <FlatList
            data ={data}
            keyExtractor={(item)=> item.id}
            renderItem ={({item:{id,title,multiplier,image}, item})=>(
                <TouchableOpacity 
                onPress={()=> setSelected(item)}
                style ={tw`flex-row justify-between items-center px-10 ${
                    id=== selected?.id&& "bg-gray-200"
                }`}>
                    <Image
                        style={{
                            width:100,
                            height:100,
                            resizeMode:"contain",
                        }}
                        source={{uri: image}}
                    />
                    <View style ={tw`-ml-6`}>
                        <Text style ={tw`text-xl font-semibold`}>{title}</Text>
                        <Text>{travelTimeInformation?.duration.text}Travel time</Text>
                    </View>
                    <Text style ={tw`text-xl`}>

                        {
                            new Intl.NumberFormat("en-gb",{
                                style: "currency",
                                currency: "INR",
                            }).format(
                                (travelTimeInformation?.duration?.value* SURGE_PRICE_RATE*multiplier)/100
                            )
                        }
                    </Text>
                </TouchableOpacity>
            )}
        />
        <View>
            <TouchableOpacity 
                disabled={!selected}
                style ={tw`bg-black py-0.5 m-3`}>
                <Text style ={tw` text-center text-white text-xl ${!selected&&"bg-gray-500"}`} >
                    Choose{selected?.title}
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})