import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CreateAPlan } from "../screens/home/CreatePlan";
import { Main } from "../screens/home/Main";
import { Folders } from "../screens/folders/Folders";
import { CreateFolder } from "../screens/folders/CreateFolder";
import { tabBarStyle } from "../constants/styles";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export const FoldersStack = ({ navigation, route }) => {
  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === "create-folders")
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
      <Stack.Screen
        name="folders-main"
        initialParams={{ create: "create-folders" }}
        component={Folders}
      />
      <Stack.Screen name="create-folders" component={CreateFolder} />
    </Stack.Navigator>
  );
};
