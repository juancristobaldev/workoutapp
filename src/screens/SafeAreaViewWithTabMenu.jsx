import React from "react";
import { SafeAreaView } from "react-native";
import { TabMenu } from "../components/TabMenu";

export const SafeAreaViewWithTabMenu = ({ children, navigation, route }) => {
  return (
    <SafeAreaView style={{
        backgroundColor:'white'
    }}>
      {children}
      <TabMenu navigation={navigation} route={route} />
    </SafeAreaView>
  );
};
