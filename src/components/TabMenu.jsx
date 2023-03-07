import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { TabIcon } from "./TabIcon";

export const TabMenu = ({ navigation, routeName }) => {
  const { width, height } = Dimensions.get("screen");

  const widthIcon = width * 0.075;

  return (
    <View
      style={{
        ...styles.container,
        width: width * 0.9,
        height: height * 0.075,
        borderRadius: (height * 0.075) / 5,
      }}
    >
      <TabIcon
        size={widthIcon}
        name={"home"}
        outline={routeName === "main" ? false : true}
        onPress={() => navigation.navigate("home")}
      />
      <TabIcon
        size={widthIcon}
        name={"folder"}
        outline={routeName === "folders" ? false : true}
        onPress={() => navigation.navigate("folders")}
      />
      {(routeName === "main" ||
        routeName === "folders" ||
        routeName === "routines") && (
        <TouchableOpacity
          style={{
              position:'relative',
              top:-10,
            backgroundColor: "black",
            width: widthIcon * 2,
            height: widthIcon * 2,
            justifyContent: "center",
            borderRadius: 50,
          }}
        >
          <Ionicons
            name="add"
            color={"white"}
            style={{
              alignSelf: "center",
            }}
            size={widthIcon * 1.25}
          />
        </TouchableOpacity>
      )}
      <TabIcon
        size={widthIcon}
        name={"document-text"}
        outline={routeName === "routines" ? false : true}
        onPress={() => navigation.navigate("routines")}
      />
      <TabIcon
        size={widthIcon}
        name={"person"}
        outline={routeName === "profile" ? false : true}
        onPress={() => navigation.navigate("profile")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
  },
  icon: {
    width: 0,
  },
});
