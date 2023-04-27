import React from "react";
import { View, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { UserHeader } from "../../components/UserHeader";
import { Loading } from "../../components/Loading";
import { useEffect } from "react";
import { useMe } from "../../hooks/useMe";

import * as sizes from "../../constants/sizes";
import { tabBarStyle } from "../../constants/styles";

import { ButtonGeneral } from "../../components/generals/CustomButton";
import { SafeAreaViewWithTabMenu } from "../SafeAreaViewWithTabMenu";

/* const plans = [
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
]; */

export const Main = ({ navigation, route, hiddeTab }) => {
  const { me, loading, error } = useMe();

  console.log(route)

  if (loading) return <Loading />;
  else {
    return (
      <SafeAreaViewWithTabMenu
        navigation={navigation}
        route={route}
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
      </SafeAreaViewWithTabMenu>
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
