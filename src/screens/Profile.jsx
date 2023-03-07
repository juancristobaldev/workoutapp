import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native";
import RNRestart from "react-native-restart"; // Import package from node modules
import { Loading } from "../components/Loading";
import { TabMenu } from "../components/TabMenu";
import { tabBarStyle } from "../constants/styles";
import { DataContext } from "../context/DataProvider";

export const Profile = ({ navigation, route }) => {
  const { me, loading } = useContext(DataContext);

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === "create-routines")
      navigation.setOptions({
        tabBarStyle: { ...tabBarStyle, display: "none" },
      });
    else
      navigation.setOptions({
        tabBarStyle: { ...tabBarStyle, display: "flex" },
      });
  }, [navigation, route]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar />
        <View style={styles.mainContainer}>
          <Text>Tu perfil {me.first_name}</Text>
          <TextInput value={me.email} />
          <Button
            title={"Sign out"}
            onPress={async () => {
              await AsyncStorage.removeItem("@token");
              RNRestart.Restart();
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
  },
  mainContainer: {
    backgroundColor: "white",
    height: "100%",
  },
});
