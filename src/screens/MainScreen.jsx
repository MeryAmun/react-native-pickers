import { StyleSheet } from "react-native";
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MediaScreen from "../subscreens/MediaScreen";
import CalendarPicker from "../subscreens/DateTime";
import Audios from '../subscreens/Audios'
import Videos from "../subscreens/Videos";
import SingleVideo from "../subscreens/SingleVideo";

const Tab = createMaterialBottomTabNavigator();
const EmptyComponent = () => {
  return null;
};
const MainScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Date Picker"
      labeled={false}
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tab.Screen
        name="Media Screen"
        component={MediaScreen}
        options={{
          tabBarLabel: "Media",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color="black" size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Date Picker"
        component={CalendarPicker}
        options={{
          tabBarLabel: "Date Picker",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-sharp" color="black" size={25} />
          ),
        }}
      />
      <Tab.Screen name="Audio Player" component={Audios}  
   options={{
    tabBarLabel: 'Audio',
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="music" color='black' size={25} />
    ),
  }}
  />
      <Tab.Screen
        name="Single Video"
        component={SingleVideo}
        options={{
          tabBarLabel: "Video",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="video-box" color="black" size={25} />
          ),
        }}
      />

      <Tab.Screen
        name="Video Player"
        component={Videos}
        options={{
          tabBarLabel: "Videos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="video-plus" color="black" size={25} />
          ),
        }}
        listeners={({ navigation }) => ({})}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
