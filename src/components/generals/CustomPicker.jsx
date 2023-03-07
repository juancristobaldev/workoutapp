import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Dimensions, View } from "react-native";

export const CustomPicker = ({value, onValueChange, items}) => {

    const {width,height} = Dimensions.get('screen')


    
    return (
        <View
        style={{
          position: "absolute",
          zIndex: 2,
          top: height / 2 - 100,
          left: width * 0.05,
          backgroundColor: "white",
          width: width * 0.9,
          height: 200,
          borderRadius: 10,
          shadowColor: "black",
          shadowRadius: 5,
          shadowOpacity: 0.25,
          shadowOffset: { width: 2, height: 2 },
        }}
      >
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
        >
          {items.map((item, index) => (
            <Picker.Item key={index} value={item.value ? item.value : item.text} label={item.text} />
          ))}
        </Picker>
      </View>
    )
}