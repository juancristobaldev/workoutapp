import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator, DrawerContent, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Home, HomeStack } from "./HomeStack";
import { Folders } from "../screens/Folders";
import { Routines } from "../screens/Routines";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Profile } from "../screens/Profile";
import { Button } from "react-native";
import { Switch } from "@react-native-material/core"; 
import { View } from "react-native";
import { ButtonGeneral } from "../components/generals/CustomButton";
import RNRestart from 'react-native-restart'; // Import package from node modules
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TabLoggedin = () => {
    const [valueSwitch,setValueSwitch] = useState(false)

    const Drawer = createDrawerNavigator();

    

    return (

            <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => {
                return(
                    <DrawerContentScrollView {...props}>
                        <DrawerItemList {...props}/>
                        <DrawerItem
                        label={'Cerrar sesion'}
                        icon={ ({size,color}) => <MaterialIcons size={size} color={color} name="meeting-room"/>}
                        onPress={ async () => {
                            await AsyncStorage.removeItem('@token');
                            RNRestart.Restart();
                        }}
                        />
                        <View style={{height:'175%',justifyContent:'flex-end'}}>
                            <View style={{justifyContent:'center',flexDirection:'row', alignItems:'center'}}>
                                <Ionicons
                                size={20}
                                name={'moon'}
                                />
                                <Switch 
                                style={{marginHorizontal:15}}
                                value={valueSwitch}
                                onChange={() => setValueSwitch(!valueSwitch)}
                                />
                                <Ionicons
                                size={20}
                                name={'sunny'}
                                />
                            </View>
                        </View>
                    </DrawerContentScrollView>
                )
            }}>
                <Drawer.Screen
                name={'Principal'}
                component={HomeStack}
                options={{
                    headerShown:false,
                    drawerIcon:({color,size}) => <Ionicons color={color} size={size} name={'home'} />
                }}
                />
                <Drawer.Screen
                name={'Carpetas'}
                component={Folders}
                options={{
                    drawerIcon:({color,size}) => <Ionicons color={color} size={size} name={'folder'} />
                }}
                />
                <Drawer.Screen
                name={'Rutinas'}
                component={Routines}
                options={{
                    drawerIcon:({color,size}) => <Ionicons color={color} size={size} name={'document-text'} />
                }}
                />
                <Drawer.Screen
                name={'Tu perfil'}
                component={Profile}
                options={{
                    drawerIcon:({color,size}) => <Ionicons color={color} size={size} name={'person'} />
                }}
                />
            </Drawer.Navigator>

    )
}