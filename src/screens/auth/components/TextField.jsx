import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import * as theme from "../../../constants/theme";
import * as sizes from "../../../constants/sizes";

export const TextField = ({
  disabled,
  value = null,
  label,
  placeholder,
  leadingIcon,
  trailedIcon,
  errorFromBackend,
  textErrorFromBackend,
  functionTrailedIcon = null,
  onChangeText,
  stylesContainer,
  stylesContainerInput,
  stylesInput,
  secureTextEntry = false,
  onBlur,
  onFocus,
  error = false,
  errorText,
  maxLength = null,
  onChange = null,
}) => {
  const errorTextStyle = {
    color: "red",
    fontSize: 15,
  };

  const styleContainerText = {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 15,
  };

  return (
    <View style={{ ...stylesContainer }}>
      {label && (
        <Text
          style={{
            paddingVertical: 10,
            fontSize: sizes.smallFont,
            fontWeight: "bold",
          }}
        >
          {label}
        </Text>
      )}
      <View style={{ ...styleContainerText, ...stylesContainerInput }}>
        {leadingIcon && (
          <Ionicons color={"gray"} size={20} name={leadingIcon} />
        )}
        <TextInput
          onChange={onChange}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          onBlur={onBlur}
          onFocus={onFocus}
          style={{ ...stylesInput, fontSize: sizes.smallFont, width: "90%" }}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
        />
        {trailedIcon && (
          <Ionicons
            onPress={functionTrailedIcon}
            color={"gray"}
            size={20}
            name={trailedIcon}
          />
        )}
      </View>
      {(error || errorFromBackend) && (
        <Text style={{ ...errorTextStyle }}>
          {errorText ? errorText : textErrorFromBackend}
        </Text>
      )}
    </View>
  );
};
