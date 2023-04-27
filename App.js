import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { UnLoggedinStack } from "./src/navigation/UnLoggedinStack";
import { LoggedinStack } from "./src/navigation/LoggedinStack";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [item, setItem] = useState({
    name: "stackUnloggedin",
    component: UnLoggedinStack,
  });

  const getTokenStore = async () => {
    try {
      const tokenStore = await AsyncStorage.getItem("@token");
      if (tokenStore !== null) setIsLoggedin(true);
    } catch (e) {
      console.log(e);
    }
  };

  const Stack = createStackNavigator();

  useEffect(() => {
    getTokenStore();
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      setItem({ name: "tabLoggedin", component: LoggedinStack });
    } else {
      setItem({ name: "stackUnloggedin", component: UnLoggedinStack });
    }
  }, [isLoggedin]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={item.name} component={item.component} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
