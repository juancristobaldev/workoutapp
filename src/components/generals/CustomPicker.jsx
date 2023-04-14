import { Picker } from "@react-native-picker/picker";
import React from "react";
import { useState } from "react";
import { Dimensions, View } from "react-native";

export const CustomPicker = ({ value, onValueChange, items, style }) => {
  const { width, height } = Dimensions.get("screen");

  const [layoutView, setLayoutView] = useState({
    height: 0,
  });

  const onLayout = (event) => {
    const {height: heightLayout } = event.nativeEvent.layout;
    setLayoutView({
      height: heightLayout,
    });
  };

  return (
    <View
      onLayout={onLayout}
      style={{
        position: "absolute",
        zIndex: 2,
        top: height / 3 - layoutView.height,
        left: 0,
        backgroundColor: "white",
        width: width * 0.9,
        height: 200,
        borderRadius: 10,
        shadowColor: "black",
        shadowRadius: 5,
        shadowOpacity: 0.25,
        shadowOffset: { width: 2, height: 2 },
        ...style,
      }}
    >
      <Picker selectedValue={value} onValueChange={onValueChange}>
        {items.map((item, index) => (
          <Picker.Item
            key={index}
            value={item.value ? item.value : item.text}
            label={item.text}
          />
        ))}
      </Picker>
    </View>
  );
};
