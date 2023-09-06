import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import MainScreen from "./src/screens/MainScreen";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
      <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Main Screen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
