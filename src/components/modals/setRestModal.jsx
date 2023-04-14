import React from "react";
import { useState } from "react";
import { Dimensions } from "react-native";
import { Text, View } from "react-native";
import { ButtonGeneral } from "../generals/CustomButton";
import { CustomModal } from "../generals/Modal";
import * as sizes from "../../constants/sizes";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export const SetRestModal = ({ objState }) => {
  const { state, setState } = objState;

  const { dataFormCreate, rest } = state;

  const { height, width } = Dimensions.get("screen");

  const [timePicker, setTimePicker] = useState({
    isOpen: false,
    time: null,
  });

  const [layoutView, setLayoutView] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const onLayout = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setLayoutView({
      x: x,
      y: y,
      width: width,
      height: height,
    });
  };

  const paddingText = {
    paddingHorizontal: 20,
  };

  const widthContainer = width * 0.85;

  return (
    <CustomModal
      onPress={() =>
        setState({
          ...state,
          rest: {
            isOpen: false,
            idList: false,
            rest: null,
          },
        })
      }
    >
      <View
        onLayout={onLayout}
        style={{
          borderRadius: 7.5,
          position: "absolute",
          zIndex: 2,
          top: height / 2 - layoutView.height / 2,
          width: widthContainer - 40,
          left: (width - widthContainer) / 1.1,
          backgroundColor: "white",
          shadowColor: "black",
          shadowRadius: 2,
          shadowOpacity: 0.5,
          shadowOffset: {
            height: 1,
            width: 1,
          },
        }}
      >
        <View>
          <Text
            style={{
              ...paddingText,
              paddingTop: 20,
              fontSize: sizes.mediumFont,
              fontWeight: "bold",
            }}
          >
            {dataFormCreate.flow[rest.idList].name}
          </Text>
          <Text
            style={{
              ...paddingText,
              paddingVertical: 10,
              fontSize: sizes.smallFont,
              fontWeight: "300",
              marginBottom: 10,
            }}
          >
            Ajusta el descanso entre series
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <View
            style={{
              width: "47.5%",
            }}
          >
            <Text>Minutos</Text>
            <View
              style={{
                marginTop: 10,
                backgroundColor: "#F7F7F7",
                padding: 10,
                width: "100%",
              }}
            >
              <TextInput />
            </View>
          </View>
          <View
            style={{
              width: "47.5%",
            }}
          >
            <Text>Segundos</Text>
            <View
              style={{
                marginTop: 10,
                backgroundColor: "#F7F7F7",
                padding: 10,
                width: "100%",
              }}
            >
              <TextInput />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginHorizontal: 20,
            marginVertical: 20,
          }}
        >
          <ButtonGeneral
            text={"Hecho"}
            styleText={{ color: "white", fontWeight: "400" }}
            styleButton={{
              width: "50%",
              height: 35,
              borderRadius: 17.5,
              backgroundColor: "black",
            }}
          />
        </View>
      </View>
    </CustomModal>
  );
};
