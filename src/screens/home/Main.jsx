import React, { useContext } from "react";
import { Dimensions } from "react-native";
import { Text, View, SafeAreaView, StatusBar, StyleSheet } from "react-native";

import * as sizes from "../../constants/sizes";
import { AnimatedScrollView } from "../../components/AnimatedScrollView";
import { UserHeader } from "../../components/UserHeader";
import { Loading } from "../../components/Loading";
import { ButtonGeneral } from "../../components/generals/CustomButton";
import { DataContext } from "../../context/DataProvider";
import { TabMenu } from "../../components/TabMenu";

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

  const { me, loading } = useContext(DataContext);

  const newData = [{ key: "spacer-left" }, ...plans, { key: "spacer-right" }];

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
          <UserHeader />
          <View
            style={{
              marginHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.titleSectionStyle}>Mis planes</Text>
            <ButtonGeneral
              onPress={() => navigation.navigate("create")}
              text={"Nuevo"}
              styleButton={{
                height: 30,
                width: width * 0.4,
                borderRadius: 15,
              }}
              styleText={{
                fontWeight: "400",
              }}
            />
          </View>
          <AnimatedScrollView data={newData} />
          <Text style={styles.titleSectionStyle}>Mi actividad</Text>

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
    fontSize: sizes.smallFont,
  },
});
