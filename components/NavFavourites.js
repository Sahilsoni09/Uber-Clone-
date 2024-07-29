import { FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {Icon} from '@rneui/themed'
import tw from 'twrnc'
const data = [
    {
        id: '123',
        icon: 'home',
        description: 'Home',
        location: 'Code Street, London, UK',
    },
    {
        id: '456',
        icon: 'briefcase',
        description: 'Work',
        location: 'The Shard, London Bridge Street, London, UK',
    },
    // {
    //     id: '789',
    //     icon: 'heart',
    //     description: 'Bambi\'s House',
    //     location: '15 Sakuru Road, Sagamu, Nigeria',
    // },
];

const NavFavourites = () => {
  return (
    <FlatList
        data = {data}
        keyExtractor={(item)=> item.id}
        ItemSeparatorComponent={()=>{
            return(<View
            style ={[tw`bg-gray-200`, {height:0.5}]}
            />)
        }}
        renderItem={
            ({item: {icon,location, description}})=>(
                <TouchableOpacity style={tw`flex-row items-center p-5`}>
                    <Icon
                    style ={tw`mr-4 rounded-full bg-gray-300 p-3`}
                    name = {icon}
                    type ="ionicon"
                    color = 'white'
                    size={18}
                    />
                    <View>
                        <Text style ={tw`font-semibold `}>{location}</Text>
                        <Text style ={tw`text-gray-500`}>{description}</Text>
                    </View>
                </TouchableOpacity>
                
            )
        }
    />
  )
}

export default NavFavourites

const styles = StyleSheet.create({})