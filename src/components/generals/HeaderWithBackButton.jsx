import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Dimensions, View } from "react-native";
import { TouchableOpacity } from "react-native";

import * as theme from '../../constants/theme'

export const HeaderWithBackButton = ({leadingComponent,onPressBack}) => {

    const {width} = Dimensions.get('window')


     return (
        <View style={{
            display:'flex',
            justifyContent:'space-between',
            flexDirection:'row',
            marginVertical:30,
            }}>
                <View style={{
                    marginLeft:20
                }}>
                    {leadingComponent}
                </View>
                <TouchableOpacity
                onPress={onPressBack}
                style={{
                    width:width*.20,
                    backgroundColor:theme.THEME_SILVER,
                    paddingVertical:15,
                    paddingHorizontal:20,
                    borderTopLeftRadius:30,
                    borderBottomLeftRadius:30,
                    justifyContent:'center',
                    alignItems:'center'
                }}
                >
                    <FontAwesome5
                    name={'arrow-left'}
                    />
                </TouchableOpacity>
            </View>
     )
}