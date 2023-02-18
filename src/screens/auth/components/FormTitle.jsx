import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import * as texts from "../../../constants/texts";
import * as sizes from "../../../constants/sizes"

export const FormTitle = ({form,subtitle,marginTop}) => {
    return (
        <View style={{height:125,marginTop:marginTop, justifyContent:'center'}}>
            <Text style={{ fontSize:sizes.veryLargeFont, fontWeight:'bold', paddingVertical:5 }}>
                {form === "register" ? (
                    texts.SIGN_UP
                ):(
                    texts.SIGN_IN
                )}
            </Text>
            <Text style={{ fontSize:sizes.smallFont, fontWeight:'300', paddingVertical:5 }}>
                {subtitle === 'about u' ? 
                    texts.ABOUT_U_SUBTITLE
                : subtitle === 'auth' ? (
                    texts.AUTH_SUBTITLE
                ) : (
                    texts.SUB_TITLE_FORM
                )}  
            </Text>
        </View>
    )
}