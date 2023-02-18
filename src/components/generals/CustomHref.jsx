import React from "react";
import { Text, TouchableOpacity } from "react-native";

export const CustomHref = ({
    text,
    onPress,
    touchableStyle,
    textStyle
}) => {
    return (
        <TouchableOpacity 
            style={touchableStyle} 
            onPress={onPress}
        >
            <Text style={textStyle}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}