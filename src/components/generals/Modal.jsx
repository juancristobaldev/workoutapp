import React from "react";
import { Dimensions, StatusBar, TouchableOpacity, View } from "react-native";
import { BlurView } from "@react-native-community/blur";

export const CustomModal = ({ children, onPress, styleTouchable, styleBlur }) => {
  const { width, height } = Dimensions.get("screen");

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: "rgba(255,255,255,.55)",
          width: width,
          height: height,
          position: "absolute",
          zIndex: 1,
          left:0,
          ...styleTouchable
        }}
      >
        <BlurView
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            ...styleBlur
          }}
          blurType="light"
          blurAmount={5}
          reducedTransparencyFallbackColor="white"
        />
      </TouchableOpacity>
      {children}
    </>
  );
};
