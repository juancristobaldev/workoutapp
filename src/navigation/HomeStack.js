import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Main } from "../screens/home/Main";
import { CreateAPlan } from "../screens/home/CreateAPlan";

export const HomeStack = () => {

    const Stack = createStackNavigator()

    return (

            <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            >
                <Stack.Screen
                name="main"
                component={Main}
                />
                <Stack.Screen
                name="create"
                component={CreateAPlan}
                />
            </Stack.Navigator>

    )
}
