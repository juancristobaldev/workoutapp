import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { StackUnLoggedin } from './src/navigation/StackUnLoggedin';
import { AnimatedTabLoggedin, StackLoggedin } from './src/navigation/AnimatedTabLoggedin';
import { createStackNavigator } from '@react-navigation/stack';


export default function App() {
  const [isLoggedin,setIsLoggedin] = useState(false)

  const getTokenStore = async () => {
    try {
      const tokenStore = await AsyncStorage.getItem('@token')
      if(tokenStore !== null) setIsLoggedin(true)
    }
    catch (e) {
      console.log(e)
    }
  }

  const Stack = createStackNavigator();

  useEffect(() => {
    getTokenStore()
  },[])
  
  return (
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{headerShown:false}}
        >
          {!isLoggedin ?
            <Stack.Screen name='stackUnloggedin' component={StackUnLoggedin}/>
            :
            <Stack.Screen name='tabLoggedin' component={AnimatedTabLoggedin}/>
          }
        </Stack.Navigator>
      </NavigationContainer>
  );
}