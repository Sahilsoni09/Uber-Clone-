import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import Map from '../components/Map';
import { createStackNavigator } from '@react-navigation/stack';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  return (
    <View>
       <View>
        <TouchableOpacity 
        onPress ={()=> navigation.navigate('HomeScreen')}
        style ={tw`bg-gray-200 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}>
            <Icon name = 'menu' />
        </TouchableOpacity>
       </View>
       
      <View style={tw`h-1/2`}>
        <Map/>
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name ="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name ="RideOptionsCard"
            component={RideOptionsCard}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({})