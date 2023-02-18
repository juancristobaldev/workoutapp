import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { TouchableOpacity, Text } from "react-native";

import * as theme from "../../constants/theme";
import * as sizes from "../../constants/sizes";

export const ButtonGeneral = ({
  text,
  onPress,
  styleButton,
  styleText,
  isLoading,
  outlined,
  disabled,
  leadingIcon,
  trailedIcon,
  colorIcon,
}) => {
  const stylesButton = {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.THEME_COLOR,
    height: 50,
  };

  const stylesText = {
    color: "black",
    fontSize: sizes.smallFont,
    fontWeight: "bold",
  };

  if (outlined) {
    stylesButton.backgroundColor = "transparent";
    stylesButton.borderColor = theme.THEME_COLOR;
    stylesButton.borderWidth = 2;
    stylesText.color = theme.THEME_COLOR;
  }

  return (
    <TouchableOpacity
      style={[
        { ...stylesButton, ...styleButton },
        disabled && { opacity: 0.5 },
        leadingIcon && { display: "flex", flexDirection: "row" },
      ]}
      onPress={() => onPress()}
      disabled={disabled}
    >
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={outlined ? theme.THEME_COLOR : "white"}
        />
      ) : (
        <>
          {leadingIcon && (
            <MaterialIcons
              color={colorIcon ? colorIcon : "black"}
              size={25}
              name={leadingIcon}
            />
          )}
          <Text style={{ ...stylesText, ...styleText }}>{text}</Text>
          {trailedIcon && (
            <MaterialIcons
              color={colorIcon ? colorIcon : "black"}
              name={trailedIcon}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};
