import React from "react";
import { View } from "react-native";


export const List = ({style,children,render,data,onEmpty}) => {
  return (
    <View
      style={style}
    >
      {!data.length && onEmpty()}
      {data.map(render)}
      {children}
    </View>
  );
};

