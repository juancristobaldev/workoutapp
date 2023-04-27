import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import * as themes from "../constants/theme";

export const TabIcon = ({ style, styleIcon, size, name, onPress, outline }) => {
  const sizeIcon = useSharedValue(1);

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <View>
        <Ionicons style={styleIcon} size={size} name={outline ? `${name}-outline` : name} />
      </View>
    </TouchableOpacity>
  );
};
