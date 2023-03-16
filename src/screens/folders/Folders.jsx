import React, { useContext } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet } from "react-native";

import { Loading } from "../../components/Loading";
import { TabMenu } from "../../components/TabMenu";
import { DataContext } from "../../context/DataProvider";

export const Folders = ({ navigation, route }) => {
  const { me, loading } = useContext(DataContext);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar />
        <View style={styles.mainContainer}>
          <Text>Folders {me.first_name}</Text>

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
