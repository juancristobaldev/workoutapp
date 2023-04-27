import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import React from "react";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { TabIcon } from "./TabIcon";

const { width, height } = Dimensions.get("screen");

export const TabMenu = ({ navigation, route }) => {

  const widthIcon = width * 0.075;

  console.log(route.params);

  return (
    <View
      style={{
        ...styles.container
      }}
    >
      <TabIcon
        size={widthIcon}
        name={"home"}
        outline={route.name === "home-main" ? false : true}
        onPress={() => navigation.navigate("home-main")}
      />
      <TabIcon
        size={widthIcon}
        name={"document-text"}
        style={{
          marginLeft: 7.5,
        }}
        outline={route.name === "routines-main" ? false : true}
        onPress={() =>
          navigation.navigate("routines", {
            screen: "routines-main"
          })
        }
      />
      {(route.name === "home-main" ||
        route.name === "folders" ||
        route.name === "routines-main") && (
          <>
          <TouchableOpacity onPress={() => navigation.navigate(route.params.create)}>
            <Ionicons
              name="add-circle"
              color={"black"}
              style={{
                alignSelf: "center",
              }}
              size={widthIcon * 1.5}
            />
        </TouchableOpacity>
          </>
      )}
      <TabIcon
        style={{
          marginRight: 7.5,
        }}
        size={widthIcon}
        name={"folder"}
        outline={route.name === "folder-main" ? false : true}
        onPress={() =>
          navigation.navigate("folders", {
            screen: "folders-main"
          })
        }
      />
      <TabIcon
        size={widthIcon}
        name={"person"}
        outline={route.name === "profile" ? false : true}
        onPress={() => navigation.navigate("profile")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    width: width * 0.9,
    height: height * 0.075,
    borderRadius: (height * 0.075) / 5,
  },
  icon: {
    width: 0,
  },
});
