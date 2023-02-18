import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { DataProvider } from './src/context/DataProvider';
import { StackUnLoggedin } from './src/navigation/StackUnLoggedin';
import { TabLoggedin } from './src/navigation/TabLoggedin';


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

  useEffect(() => {
    getTokenStore()
  },[])
  
  const Stack = createNativeStackNavigator();


  return (
      <NavigationContainer>
        {!isLoggedin ?
          <StackUnLoggedin/>
          :
          <DataProvider>
            <TabLoggedin/>
          </DataProvider>
        }
      </NavigationContainer>
  );
}