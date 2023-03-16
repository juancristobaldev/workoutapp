import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
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
    stylesButton.borderColor = "black";
    stylesButton.borderWidth = 2;
    stylesText.color = "black";
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
            <>
              {leadingIcon.substring(0, 3) === "fa-" ? (
                <FontAwesome5
                  name={leadingIcon.substring(3, leadingIcon.length)}
                />
              ) : (
                <MaterialIcons color={"gray"} size={20} name={leadingIcon} />
              )}
            </>
          )}
          <Text style={{ ...stylesText, ...styleText }}>{text}</Text>
          {trailedIcon && (
            <>
              {trailedIcon.substring(0, 3) === "fa-" ? (
                <FontAwesome5
                  size={20}
                  name={trailedIcon.substring(3, trailedIcon.length)}
                />
              ) : (
                <Ionicons color={"gray"} size={20} name={trailedIcon} />
              )}
            </>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};
