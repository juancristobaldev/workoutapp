import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { useState } from "react";
import { Dimensions, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import * as sizes from "../../constants/sizes";
import { StatsSerie } from "./StatsSerie";

import Popover, { PopoverPlacement } from "react-native-popover-view";
import { useRef } from "react";
import { useList } from "../../hooks/useListToSelect";
import { GET_EXERCISES } from "../../data/query";
import { THEME_COLOR } from "../../constants/theme";

export const Exercise = ({
  exercise,
  children,
  objState,
  indexExercise,
  indexCycle,
}) => {

  const {state,setState} = objState

  const [showSeries, setShowSeries] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const { deleteItem } = useList(
    "flow",
    true,
    { nameGql: "getExercises", gql: GET_EXERCISES },
    objState
  );

  const { width } = Dimensions.get("screen");

  const { type } = exercise;

  let styles = {};

  if (exercise.isSuperSet) {
    styles.width = width - 40 - 10;
    styles.marginLeft = 5;
  } else {
    styles.width = width - 40;
    styles.marginHorizontal = 20;
  }

  return (
    <>
      <View
        style={{
          ...styles,
          backgroundColor: "black",
          justifyContent: "flex-start",
          borderRadius: 7.5,
          marginVertical: 5,
        }}
      >
        <TouchableOpacity
          style={{ paddingVertical: 10, paddingHorizontal: 15 }}
          onPress={() => setShowSeries(!showSeries)}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: sizes.largeFont,
                fontWeight: "bold",
              }}
            >
              {exercise.name}
            </Text>

            <Popover
              isVisible={showMenu}
              placement={PopoverPlacement.BOTTOM}
              onRequestClose={() => setShowMenu(false)}
              from={
                <TouchableOpacity
                  onPress={() => setShowMenu(true)}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    color={"white"}
                    size={25}
                    name="reorder-three-outline"
                  />
                </TouchableOpacity>
              }
            >
              <Text
                style={{
                  padding: 10,
                  fontWeight: "bold",
                }}
              >
                Menu
              </Text>
              <TouchableOpacity onPress={() => {
                setShowMenu(false)
                setState({...state, rest:{
                  isOpen:true,
                  idList:indexExercise,
                  rest:null
                }})
              }} style={{ padding: 10 }}>
                <Text>Ajustar descanso entre series</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                  setShowMenu(false);
                  deleteItem(indexExercise, indexCycle);
                }}
              >
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  Eliminar
                </Text>
              </TouchableOpacity>
            </Popover>
          </View>
          <View style={{ flexDirection: "row", paddingTop: 5 }}>
            {exercise.isSuperSet && (
              <Text style={{ color: THEME_COLOR, fontWeight: "bold" }}>
                Super set
              </Text>
            )}
            <Text
              style={{
                color: "white",
                paddingLeft: exercise.isSuperSet ? 20 : 0,
              }}
            >
              {exercise.type}
            </Text>
            <Text style={{ color: "white", paddingLeft: 20 }}>
              {exercise.muscle}
            </Text>
          </View>
        </TouchableOpacity>
        {showSeries && (
          <LinearGradient
            style={{
              borderBottomRightRadius: 7.5,
              borderBottomLeftRadius: 7.5,
            }}
            colors={["#1F1F1F", "#000000"]}
          >
            <StatsSerie type={type} />
            {children}
          </LinearGradient>
        )}
      </View>
    </>
  );
};
