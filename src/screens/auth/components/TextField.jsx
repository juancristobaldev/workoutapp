import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 15,
  };

  console.log()

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
          <>
            {leadingIcon.substring(0, 3) === "fa-" ? (
              <FontAwesome5
                name={leadingIcon.substring(3, leadingIcon.length)}
              />
            ) : (
              <Ionicons color={"gray"} size={20} name={leadingIcon} />
            )}
          </>
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
          <>
          {trailedIcon.substring(0, 3) === "fa-" ? (
            <FontAwesome5
              name={trailedIcon.substring(3, trailedIcon.length)}
            />
          ) : (
            <Ionicons color={"gray"} size={20} name={trailedIcon} />
          )}
        </>
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
