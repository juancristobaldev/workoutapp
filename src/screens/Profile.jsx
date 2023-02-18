import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import { Text, View, Button, TextInput, ActivityIndicator, SafeAreaView, StatusBar } from "react-native";
import RNRestart from 'react-native-restart'; // Import package from node modules
import { Loading } from "../components/Loading";
import { DataContext } from "../context/DataProvider";



export const Profile = ({navigation}) => {

    const {me,loading} = useContext(DataContext)

    console.log(me)

    if(loading){
        return (
           <Loading/>
        )
    }else{
        return (
            <SafeAreaView>
                <StatusBar/>
                <View>
                    <Text>Tu perfil {me.first_name}</Text>
                    <TextInput value={me.email}/>
                    <Button  title={'Sign out'} onPress={async () => {
                        await AsyncStorage.removeItem('@token')
                        RNRestart.Restart();
                    }}/>
                </View>
            </SafeAreaView>
        )
    }
}