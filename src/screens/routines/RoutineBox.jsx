import { useMutation } from "@apollo/client";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { State } from "react-native-gesture-handler";
import { ButtonGeneral } from "../../components/generals/CustomButton";
import { Loading } from "../../components/Loading";

import * as sizes from "../../constants/sizes";
import { DELETE_ROUTINE } from "../../data/mutations";
import { GET_ROUTINES } from "../../data/query";
import { useMe } from "../../hooks/useMe";

export const RoutineBox = ({ object, index, item, navigation }) => {

  const [deleteRoutine, { loading: loadingDelete }] = useMutation(
    DELETE_ROUTINE,
    {
      update(cache) {
        const { getRoutines } = cache.readQuery({ query: GET_ROUTINES });

        const actualList = getRoutines.filter(
          (routine) => routine.id !== item.id
        );

        cache.writeQuery({
          query: GET_ROUTINES,
          data: { getRoutines: actualList },
        });
      },
      async onCompleted() {},
      onError(error) {
        console.log(error);
      },
    }
  );

  const nExercises = [],
    nCycles = [],
    flow = JSON.parse(item.flow);

  const { me, loading, error } = useMe();

  flow.forEach((exercise) => {
    if (exercise.type === "superSet") nCycles.push(exercise);
    else nExercises.push(exercise.id);
  });

  const deleteItem = async () => {
    await deleteRoutine({
      variables: {
        input: {
          id: item.id,
        },
      },
    }).catch((err) => {
      console.log(err);
    });
  };

  if (loading || loadingDelete) {
    return <Loading />;
  } else {
    return (
      <View
        key={index}
        style={{
          backgroundColor: "black",
          marginHorizontal: 20,
          padding: 10,
          borderRadius: 7.5,
          marginVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: sizes.smallFont,
                marginVertical: 2.5,
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                color: "white",
                fontWeight: "700",
                fontSize: 13.5,
                marginVertical: 2.5,
              }}
            >
              Por: {me.first_name}
            </Text>
          </View>
          <TouchableOpacity onPress={() => deleteItem()}>
            <Ionicons name="settings" color={"white"} size={25} />
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 2.5,
            }}
          >
            <View>
              <FontAwesome5 color={"white"} name={"dumbbell"} />
            </View>
            <Text
              style={{
                color: "white",
                marginLeft: 5,
              }}
            >
              {nExercises.length} Ejercicios
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 2.5,
            }}
          >
            <View>
              <FontAwesome5 color={"white"} name={"circle"} />
            </View>
            <Text
              style={{
                color: "white",
                marginLeft: 5,
              }}
            >
              {nCycles.length} Super set
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <ButtonGeneral
            styleButton={{
              height: 30,
              width: 120,
              borderRadius: 15,
            }}
            styleText={{
              fontWeight: "400",
            }}
            onPress={() => {
              navigation.navigate("go-routine", {
                routineId: item.id,
              });
            }}
            text={"Comenzar"}
          />
        </View>
      </View>
    );
  }
};
