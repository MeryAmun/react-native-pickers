import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MediaScreen from '../subscreens/MediaScreen'

const Tab = createMaterialBottomTabNavigator();
const EmptyComponent = () => {
    return  (null)
}
const MainScreen = () => {
  return (
    <Tab.Navigator 
    initialRouteName='Media Screen'
     labeled={false}
     screenOptions={{
        headerShown: true,
      }}
     >
  <Tab.Screen name="Media Screen" component={MediaScreen}  
   options={{
    tabBarLabel: 'Media',
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="home" color={color} size={26} />
    ),
  }}
  />
 
  
  <Tab.Screen name="Main Create" component={EmptyComponent}
  listeners={({navigation}) => ({
    tabPress: event => {
        event.preventDefault();
        navigation.navigate("Create")
    }
  })}  
   options={{
    tabBarLabel: 'Create',
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="camera-plus" color={color} size={26} />
    ),
  }}
  />
</Tab.Navigator>
  )
}

export default MainScreen

const styles = StyleSheet.create({

})