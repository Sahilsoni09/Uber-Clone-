import { StatusBar } from 'expo-status-bar';
import { StyleSheet, KeyboardAvoidingView, Text, View, Platform } from 'react-native';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './screens/MapScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
        <NavigationContainer>
          <SafeAreaProvider>
            <KeyboardAvoidingView 
            behavior={Platform.OS==='ios'?"padding":'height'}
            style ={{flex:1}}>
            <Stack.Navigator>
              <Stack.Screen name ="HomeScreen" component={HomeScreen} options={
                {
                  headerShown: false,
                }
              }/>
              <Stack.Screen name ="MapScreen" component={MapScreen} options={
                {
                  headerShown: false,
                }
              }/>
            </Stack.Navigator>
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </NavigationContainer>
      
      
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
