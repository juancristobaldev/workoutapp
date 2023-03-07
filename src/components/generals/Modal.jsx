import React from "react";
import { Dimensions, StatusBar, TouchableOpacity, View } from "react-native";
import { BlurView } from "@react-native-community/blur";

export const CustomModal = ({ children, onPress }) => {
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
          zIndex: 0,
        }}
      >
        <BlurView
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
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
