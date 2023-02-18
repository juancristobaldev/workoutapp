import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LABEL_DATE } from "../../../constants/texts";

import * as sizes from "../../../constants/sizes";
import DatePicker from "react-native-date-picker";

export const CalendarField = ({
  title,
  value,
  setOpenDatePicker,
  label,
  styleContainer,
  sizeIcon,
  height,
  fontSize,
  fontWeight,
  open,
  onConfirm,
  onCancel,
  minDate = null,
  maxDate = null,
  error = false,
  disabled
}) => {
  const originalFormat = "dd-mm-yyyy";

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
        onPress={setOpenDatePicker}
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
            { color: "gray", opacity: 0.8, fontSize: sizes.smallFont },
            value !== originalFormat && { opacity: 1, color: "black" },
          ]}
        >
          {value}
        </Text>
        <Ionicons style={{ color: "gray" }} name="calendar" size={sizeIcon} />
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
        <DatePicker
          modal
          mode="date"
          style={{ alignSelf: "center" }}
          title={title}
          date={new Date()}
          open={open}
          onConfirm={onConfirm}
          onCancel={onCancel}
          minimumDate={minDate}
          maximumDate={maxDate}
        />
      )}
    </View>
  );
};
