import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SignInScreen } from "../screens/auth/SignInScreen";
import { SignUpScreen } from "../screens/auth/SignUpScreen";

export const StackUnLoggedin = (props ) => {

  console.log(props)
    
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
          <Stack.Screen 
          name='SignIn' 
          component={SignInScreen} 
          options={{
            headerShown:false,
          }}
          />
          <Stack.Screen 
          name='SignUp' 
          component={SignUpScreen}
          options={{
            headerShown:false,
          }}
          />
      </Stack.Navigator>
    )
}