import React, { useEffect, useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CreateAPlan } from "../screens/home/CreatePlan";
import { Main } from "../screens/home/Main";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { tabBarStyle } from "../constants/styles";
import { useState } from "react";

export const HomeStack = ({ navigation, route, style }) => {
  const Stack = createStackNavigator();

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    navigation.setOptions({
      tabBarStyle: {
        ...tabBarStyle,
        display: routeName === "create-main" ? "none" : "flex",
      },
    });
  }, [route]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="home-main"
        initialParams={{ create: "create-main" }}
        component={Main}
      />
      <Stack.Screen name="create-main" component={CreateAPlan} />
    </Stack.Navigator>
  );
};
