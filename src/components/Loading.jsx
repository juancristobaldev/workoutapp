import React from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";


export const Loading = () => {
    return (
        <View style={{
            position:'absolute',
            zIndex:5,
            backgroundColor:'rgba(255, 255, 255, .9)',
            top:0,
            width:'100%',
            height:Dimensions.get('screen').height,
            justifyContent:'center'
          }}>
            <ActivityIndicator
            color={'black'}
            size={'large'}
            />
          </View>
    )
}