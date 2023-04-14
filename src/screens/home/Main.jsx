import React, { useContext } from "react";
import { Dimensions } from "react-native";
import { Text, View, SafeAreaView, StatusBar, StyleSheet } from "react-native";

import * as sizes from "../../constants/sizes";
import { AnimatedScrollView } from "../../components/AnimatedScrollView";
import { UserHeader } from "../../components/UserHeader";
import { Loading } from "../../components/Loading";
import { ButtonGeneral } from "../../components/generals/CustomButton";
import { TabMenu } from "../../components/TabMenu";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../data/query";
import { useEffect } from "react";
import { useState } from "react";
import { useMe } from "../../hooks/useMe";

const plans = [
  {
    id: 0,
    namePlan: "Personal",
    autor: "Juan Cristobal",
    icon: "dumbbell",
    days: [
      {
        day: "Lunes",
        routines: [],
      },
      {
        day: "Lunes",
        routines: [],
      },
    ],
  },
  {
    id: 0,
    namePlan: "Personal",
    autor: "Juan Cristobal",
    icon: "dumbbell",
    days: [
      {
        day: "Lunes",
        routines: [],
      },
      {
        day: "Lunes",
        routines: [],
      },
    ],
  },
];

export const Main = ({ navigation, route }) => {

  const { width } = Dimensions.get("window");

  const newData = [{ key: "spacer-left" }, ...plans, { key: "spacer-right" }];

  const {me,loading,error} = useMe()


  if (loading) {
    return <Loading />;
  } else {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "white",
        }}
      >
        <StatusBar />
        <View style={styles.mainContainer}>
          <UserHeader me={me} />
          <View
            style={{
              marginHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/*
                      <Text style={styles.titleSectionStyle}>Mis planes</Text>
          </View>
          <AnimatedScrollView data={newData} />
          <Text style={styles.titleSectionStyle}>Mi actividad</Text>
          
          */}
          </View>
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
  titleSectionStyle: {
    fontWeight: "bold",
    fontSize: sizes.mediumFont,
  },
});
