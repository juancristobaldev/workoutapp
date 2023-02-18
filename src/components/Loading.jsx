import React from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";


export const Loading = () => {
    return (
        <View style={{
            position:'absolute',
            backgroundColor:'rgba(255, 255, 255, .9)',
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