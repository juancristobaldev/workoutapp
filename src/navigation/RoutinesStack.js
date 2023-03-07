import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CreateAPlan } from "../screens/home/CreatePlan";
import { Main } from "../screens/home/Main";
import { Routines } from "../screens/routines/Routines";
import { CreateRoutine } from "../screens/routines/CreateRoutine";
import { tabBarStyle } from "../constants/styles";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export const RoutinesStack = ({ navigation, route }) => {
  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === "create-routines")
      navigation.setOptions({
        tabBarStyle: { ...tabBarStyle, display: "none" },
      });
    else
      navigation.setOptions({
        tabBarStyle: { ...tabBarStyle, display: "flex" },
      });
  }, [navigation, route]);

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="routines-main" component={Routines} />
      <Stack.Screen name="create-routines" component={CreateRoutine} />
    </Stack.Navigator>
  );
};