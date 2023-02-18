import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";

import * as themes from "../../constants/theme";

export const CheckBox = ({ onPress, checked, size, style }) => {
  const styleCheckbox = {
    width: size,
    height: size,
    borderRadius: 5,
    backgroundColor: themes.THEME_SILVER,
    alignItems:'center',
    justifyContent:'center',
    marginVertical:10
  };

  if (checked) {
    styleCheckbox.backgroundColor = themes.THEME_COLOR;
  }

  return (
    <TouchableOpacity onPress={onPress} style={{ ...styleCheckbox, ...style }}>
      {checked && <FontAwesome5 name={"check"} size={size / 2} />}
    </TouchableOpacity>
  );
};
