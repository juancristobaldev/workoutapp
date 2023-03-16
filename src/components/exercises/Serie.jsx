import React from "react";
import { Text, View } from "react-native";
import { TypeSerie } from "./TypeSerie";
import * as sizes from "../../constants/sizes";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { useRef } from "react";

export const Serie = ({
  exercise,
  serie,
  indexExercise,
  indexSerie,
  setDataRoutine,
  deleteSeries,
  indexCycle
}) => {
  const swipeableRef = useRef(null);

  const DeleteComponent = () => (
    <View
      style={{
        backgroundColor: "#FF4646",
        width: 60,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons color={"white"} size={30} name="close-circle-outline" />
    </View>
  );

  return (
    <Swipeable
      ref={swipeableRef}
      onSwipeableOpen={async () => {
        deleteSeries(indexSerie, indexExercise, indexCycle)
        swipeableRef.current.close();
      }}
      renderRightActions={DeleteComponent}
    >
      <View
        key={indexSerie}
        style={{
          backgroundColor: "black",
          margin: 0,
          flexDirection: "row",
          paddingVertical: 5,
        }}
      >
        <View style={{ width: "20%" }}>
          <View
            style={{
              width: 10 + sizes.verySmallFont + 10,
              padding: 10,
              backgroundColor: "#2C2C2C",
              justifyContent: "center",
              borderRadius: 5,
              marginLeft: 15,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: sizes.verySmallFont,
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              {indexSerie + 1}
            </Text>
          </View>
        </View>
        <View style={{ width: "30%", justifyContent: "center" }}>
          <Text style={{ color: "white", alignSelf: "center" }}>
            {exercise.name}
          </Text>
        </View>
        <TypeSerie
          indexCycle={indexCycle}
          setDataRoutine={setDataRoutine}
          indexExercise={indexExercise}
          indexSerie={indexSerie}
          exercise={exercise}
          serie={serie}
        />
      </View>
    </Swipeable>
  );
};
