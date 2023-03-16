import React, { useState, useEffect } from "react";
import { Dimensions, Text } from "react-native";
import { View } from "react-native";
import { CustomCheckBox } from "./generals/CheckBox";

export const DayPicker = ({ setOptionPicker, optionPicker, plan, setPlan }) => {
  const { width, height } = Dimensions.get("screen");

  const [daysImplicated, setDaysImplicated] = useState([
    {
      name: "L",
      implicated: false,
      ranges: [],
      value: "Lunes",
      selectPosition: undefined,
    },
    {
      name: "M",
      implicated: false,
      ranges: [],
      value: "Martes",
      selectPosition: undefined,
    },
    {
      name: "Mi",
      implicated: false,
      ranges: [],
      value: "Miercoles",
      selectPosition: undefined,
    },
    {
      name: "J",
      implicated: false,
      ranges: [],
      value: "Jueves",
      selectPosition: undefined,
    },
    {
      name: "V",
      implicated: false,
      ranges: [],
      value: "Viernes",
      selectPosition: undefined,
    },
    {
      name: "S",
      implicated: false,
      ranges: [],
      value: "Sabado",
      selectPosition: undefined,
    },
    {
      name: "D",
      implicated: false,
      ranges: [],
      value: "Domingo",
      selectPosition: undefined,
    },
  ]);

  const checkoutHandle = (index) => {
    const newDaysImplicated = [...daysImplicated];
    const selected = newDaysImplicated.filter(
      (item) => item.implicated === true
    ).length;

    if (newDaysImplicated[index].implicated) {
      delete newDaysImplicated[index].selectPosition;
    } else {
      if (!selected) newDaysImplicated[index].selectPosition = 0;
      else newDaysImplicated[index].selectPosition = selected;
    }

    const newPlan = { ...plan };

    const dayOfPlanIndex = newPlan.daysImplicated.findIndex(
      (item) => item.name === newDaysImplicated[index].name
    );

    if (dayOfPlanIndex < 0) {
      const item = { ...newDaysImplicated[index] };
      delete item.implicated;
      delete item.selectPosition;
      newPlan.daysImplicated.push(item);
    } else {
      newPlan.daysImplicated.splice(dayOfPlanIndex, 1);
    }

    setPlan(newPlan);

    newDaysImplicated[index].implicated = !newDaysImplicated[index].implicated;

    return newDaysImplicated;
  };

  useEffect(() => {
    setOptionPicker({
      ...optionPicker,
      items: daysImplicated
        .filter((item) => item.selectPosition !== undefined)
        .sort((a, b) => a.selectPosition - b.selectPosition)
        .map((item) => ({
          value: item.value,
          text: item.value,
        })),
    });
  }, [daysImplicated]);

  return (
    <View
      style={{
        flexDirection: "row",
        maxWidth: width,
        marginVertical: 20,
      }}
    >
      {daysImplicated.map((item, index) => (
        <View
          style={{
            width: width / 7,
            height: 60,
          }}
          key={index}
        >
          <Text
            style={{
              alignSelf: "center",
            }}
          >
            {item.name}
          </Text>
          <CustomCheckBox
            style={{ alignSelf: "center" }}
            checked={daysImplicated[index].implicated}
            onPress={() => setDaysImplicated(checkoutHandle(index))}
            size={20}
          />
        </View>
      ))}
    </View>
  );
};
