import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import * as sizes from "../constants/sizes";

import DatePicker from "react-native-date-picker";
import { CustomModal } from "./generals/Modal";
import { CustomPicker } from "./generals/CustomPicker";
import { useState } from "react";

export const OptionsPicker = ({
  items,
  onValueChange,
  value,
  label,
  styleContainer,
  sizeIcon,
  height,
  fontSize,
  fontWeight,
  placeholder,
  error = false,
  disabled,
}) => {
  const [open, setOpen] = useState(false);

  const stylesText = {
    paddingVertical: 10,
    fontSize: sizes.smallFont,
    fontWeight: "bold",
  };

  if (fontSize) stylesText.fontSize = fontSize;
  if (fontWeight) stylesText.fontWeight = fontWeight;

  return (
    <View
      style={{
        ...styleContainer,
      }}
    >
      <Text style={stylesText}>{label}</Text>
      <TouchableOpacity
        disabled={disabled}
        onPress={() => setOpen(true)}
        style={{
          height: height,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#F7F7F7",
          paddingHorizontal: 15,
          borderRadius: 5,
        }}
      >
        <Text
          style={[
            { opacity: 1, color: "black" , fontSize: sizes.smallFont },
          ]}
        >
          {value ? value : placeholder}
        </Text>
        <FontAwesome5 size={sizeIcon} name="caret-down" />
      </TouchableOpacity>
      {error && (
        <Text
          style={{
            color: "red",
            fontSize: sizes.verySmallFont,
          }}
        >
          {error}
        </Text>
      )}
      {open && (
        <CustomModal onPress={() => setOpen(false)}>
          <CustomPicker value={value} items={items} onValueChange={onValueChange} />
        </CustomModal>
      )}
    </View>
  );
};
