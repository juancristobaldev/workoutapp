import React from "react";
import { useContext } from "react";
import { Text } from "react-native";
import { Image, View } from "react-native";
import { DataContext } from "../context/DataProvider";

import * as sizes from "../constants/sizes";

export const UserHeader = () => {
  const { me } = useContext(DataContext);

  const date = new Date();
  const days = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  console.log(me)

  return (
    <View
      style={{
        backgroundColor: "#EDEDED",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginVertical: 30,
        width: "55%",
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
      }}
    >
      <Image
        style={{
          width: 50,
          height: 50,
        }}
        source={{
          uri: "https://www.linkpicture.com/q/PikPng.com_profile-icon-png_805068.png",
        }}
      />
      <View style={{}}>
        <Text
          style={{
            marginHorizontal: 10,
            fontWeight: "300",
            fontSize: sizes.smallFont,
          }}
        >{`Hola ${me.first_name}`}</Text>
        <Text
          style={{
            marginHorizontal: 10,
            fontWeight: "bold",
            fontSize: sizes.smallFont,
          }}
        >{`${
          days[(date.getDay() == 0) ? 6 : (date.getDay() == 6) ? date.getDay() - 1 : date.getDay() + 1]
        } ${date.getDate()} ${months[date.getMonth() - 1]}`}</Text>
      </View>
    </View>
  );
};
