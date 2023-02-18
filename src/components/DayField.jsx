import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";

export const DayField = ({
  optionPicker,
  setOptionPicker,
  plan,setPlan
}) => {
  const { items, value } = optionPicker;

  const indexValue = items.findIndex((item) => item.text === value);

  useEffect(() => {
    if (indexValue < 0) setOptionPicker({ ...optionPicker, value: null });

    setPlan({
      ...plan,
      positionDay: value
        ? value
        : items.length <= 1 || value === null
        ? items[0].text
        : value,
    });

  }, [items,value]);

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
      disabled={items.length > 1 ? false : true}
      onPress={() => setOptionPicker({ ...optionPicker, isOpen: true })}
    >
      <Text
        style={{
          paddingHorizontal: 10,
        }}
      >
        { plan.positionDay }
      </Text>
      {items.length > 1 && <FontAwesome5 name={"caret-down"} />}
    </TouchableOpacity>
  );
};
