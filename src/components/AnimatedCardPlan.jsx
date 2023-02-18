import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";

export const AnimatedCardPlan = ({item,index, sizeCard, styleAnimated}) => {
    return (
        <Animated.View
        key={index}
        style={[
            {
                width:sizeCard,
                height:sizeCard,
                backgroundColor:'black',
                borderRadius:10,
                justifyContent:'flex-end',
                paddingVertical:20,
                paddingHorizontal:20,
                marginVertical:20,
            },
            styleAnimated
        ]}
        >
            <FontAwesome5
                style={{
                    position:'absolute',
                    top:20,
                    left:20,
                    transform:[{rotateZ:'-30deg'}]
                }}
                size={22.5}
                color='white'
                name={item.icon}
            />
            <View>
                <Text style={{color:'white', paddingVertical:10, fontSize:16, fontWeight:'bold'}} >{item.namePlan}</Text>
                <Text style={{color:'white'}} >{item.days.length} Días</Text>
            </View>
        </Animated.View>
    )
}