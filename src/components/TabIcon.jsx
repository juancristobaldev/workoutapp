import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import * as themes from "../constants/theme";

export const TabIcon = ({ style, styleIcon, size, name, onPress, focused }) => {
  const sizeIcon = useSharedValue(1);

  useEffect(() => {
    if (focused) {
      sizeIcon.value = withSpring(1.25);
    } else {
      sizeIcon.value = withSpring(1);
    }
  }, [focused]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: sizeIcon.value }],
    };
  });

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Animated.View style={[animatedStyles]}>
        <Ionicons style={styleIcon} size={size} name={!focused ? `${name}-outline` : name} />
      </Animated.View>
    </TouchableOpacity>
  );
};
