import React from "react";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";

import * as sizes from "../constants/sizes";
import { ButtonGeneral } from "./generals/CustomButton";
import { CustomModal } from "./generals/Modal";

export const Range = ({ item, setModalRange,modalRange, index }) => {
  return (
    <TouchableOpacity
      onPress={() => setModalRange({ ...modalRange, delete:{
        isOpen:true,
        value:index
      }})}
      style={styles.containerRange}
    >
      <Text style={styles.title}>Rango:</Text>
      <Text style={styles.range}>
        {item.start} - {item.end}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerRange: {
    marginHorizontal: 20,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
  title: {
    color: "white",
    fontSize: sizes.smallFont,
    fontWeight: "bold",
  },
  range: {
    color: "white",
    fontSize: sizes.smallFont,
    fontWeight: "300",
  },
});
