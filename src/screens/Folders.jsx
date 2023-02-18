import React, { useContext } from "react";
import { Text, View, SafeAreaView, StatusBar } from "react-native";

import { Loading } from "../components/Loading";
import { DataContext } from "../context/DataProvider";



export const Folders = ({navigation}) => {

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
                    <Text>Folders {me.first_name}</Text>
                </View>
            </SafeAreaView>
        )
    }
}