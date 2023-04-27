import React from "react";
import { HomeStack } from "./HomeStack";
import { Profile } from "../screens/Profile";
import { StyleSheet } from "react-native";

import { RoutinesStack } from "./RoutinesStack";
import { createStackNavigator } from "@react-navigation/stack";

export const LoggedinStack = (props) => {


  const Stack = createStackNavigator();

  const tabRoutes = [
    {
      route: "main",
      icon: "home",
      component: HomeStack,
    },
    {
      route: "routines",
      icon: "document-text",
      component: RoutinesStack,
    },
    {
      route: "profile",
      icon: "person",
      component: Profile,
    },
  ];


  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        gestureEnabled: false,
      }}
    >
      {tabRoutes.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.route}
            component={item.component}
          />
        );
      })}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 100,
    flex: 1,
    justifyContent: "center",
  },
});
