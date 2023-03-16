import React from "react";
import { Text, View } from "react-native";

import * as sizes from "../../constants/sizes";

export const StatsSerie = ({ type }) => {
  const styleText = {
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: sizes.verySmallFont,
  };

  return (
    <View style={{ flexDirection: "row", paddingVertical: 10 }}>
      <View style={{ width: "20%" }}>
        <Text
          style={{
            color: "white",
            fontSize: sizes.verySmallFont,
            fontWeight: "bold",
            paddingLeft: 15,
          }}
        >
          Serie
        </Text>
      </View>
      <View style={{ width: "30%" }}>
        <Text style={styleText}>Nombre</Text>
      </View>
      {type !== "Duracion" ? (
        <>
          {type !== "Solo rep" && (
            <View style={{ width: "25%" }}>
              <Text style={styleText}>
                {type === "Peso adicional" ? "+" : "-"} Kg
              </Text>
            </View>
          )}

          <View style={{ width: type !== "Solo rep" ? "25%" : "50%" }}>
            <Text style={styleText}>Reps</Text>
          </View>
        </>
      ) : (
        <View style={{ width:'50%' }}>
          <Text style={styleText}>Tiempo</Text>
        </View>
      )}
    </View>
  );
};
