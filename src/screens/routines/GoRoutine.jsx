import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { ButtonGeneral } from "../../components/generals/CustomButton";
import { HeaderWithBackButton } from "../../components/generals/HeaderWithBackButton";
import { Loading } from "../../components/Loading";
import { GET_ROUTINE_BY_ID } from "../../data/query";
import { useProgressiveCount } from "../../hooks/useProgressiveCount";

import * as sizes from "../../constants/sizes";

const { height } = Dimensions.get("screen");

export const GoRoutine = ({ route, navigation, hiddeTab }) => {
  // const { seg, min, hour } = useProgressiveCount();

  const { data, loading, error } = useQuery(GET_ROUTINE_BY_ID, {
    variables: {
      id: route.params.routineId,
    },
  });

  const [state, setState] = useState({
    routine: false,
    actualExercise: 0,
    actualSerie: 0,
    flow: [],
    readyExercises: [],
    restantExercises: [],
  });

  const {
    routine,
    actualExercise,
    actualSerie,
    flow,
    readyExercises,
    restantExercises,
  } = state;

  useEffect(() => {
    hiddeTab.f({
      tabBarStyle: { display: "none" },
    })
    if (!loading && data) {
      const parsedFlow = JSON.parse(data.getRoutineById.flow);

      if (!state.flow.length)
        setState({
          ...state,
          flow: parsedFlow,
          restantExercises: parsedFlow,
          routine: data.getRoutineById,
        });
    }
  }, [data, loading]);

  const doneSerie = () => {
    const newActualSerie = actualSerie + 1;

    if (newActualSerie < state.flow[actualExercise].series.length)
      setState({ ...state, actualSerie: newActualSerie });
  };

  const doneExercise = () => {
    const newIndex = actualExercise + 1;

    const newRestantExercises = [...restantExercises];
    newRestantExercises.splice(0, 1);

    const newReadyExercises = [...readyExercises];
    newReadyExercises.push(flow[actualExercise]);

    setState({
      ...state,
      actualSerie: 0,
      restantExercises: newRestantExercises,
      readyExercises: newReadyExercises,
      actualExercise: newIndex,
    });
  };

  if (loading || !data) return <Loading />;
  else if (data) {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "white",
        }}
      >
        <StatusBar />
        {state.flow.length > 0 && (
          <View style={styles.main}>
            {/*             <View>
              <Text>
                {hour}:{min}:{seg}
              </Text>
            </View> */}
            <HeaderWithBackButton
              leadingComponent={
                <View>
                  <Text
                    style={{
                      fontWeight: "300",
                      fontSize: sizes.mediumFont,
                    }}
                  >
                    Rutina
                  </Text>
                  <Text
                    style={{
                      fontSize: sizes.mediumFont,
                      fontWeight: "bold",
                    }}
                  >
                    {routine.name}
                  </Text>
                </View>
              }
            />
            <View
              style={{
                backgroundColor: "black",
                marginHorizontal: 20,
                padding: 20,
                borderRadius: 7.5,
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
                    style={{ color: "white", fontSize: sizes.verySmallFont }}
                  >
                    Ejercicio actual:
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: sizes.largeFont,
                      marginVertical:5,
                      fontWeight: "900",
                    }}
                  >
                    {flow[actualExercise].name}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{ color: "white", fontSize: sizes.verySmallFont }}
                  >
                    Serie
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      marginVertical:5,
                      fontSize: sizes.largeFont,
                      fontWeight: "900",
                    }}
                  >
                    {`${actualSerie + 1}/${flow[actualExercise].series.length}`}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop:12.5
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: sizes.veryLargeFont,
                    fontWeight: "900",
                  }}
                >
                  {flow[actualExercise].series[actualSerie].reps} Reps
                </Text>
                {(flow[actualExercise].type === "Peso asistido" ||
                  flow[actualExercise].type === "Peso adicional") && (
                  <Text
                    style={{
                      color: "white",
                      fontSize: sizes.veryLargeFont,
                      fontWeight: "900",
                    }}
                  >
                    {flow[actualExercise].type === "Peso asistido" ? "-" : "+"}
                    {flow[actualExercise].series[actualSerie].other} KG
                  </Text>
                )}
              </View>
            </View>
            {actualSerie + 1 === flow[actualExercise].series.length ? (
              <ButtonGeneral
              styleButton={{
                height: 45,
                marginVertical: 20,
                marginHorizontal: 20,
                borderRadius: 7.5,
              }}
                onPress={() => doneExercise()}
                text={"Terminar ejercicio"}
              />
            ) : (
              <ButtonGeneral
                styleButton={{
                  height: 45,
                  marginVertical: 20,
                  marginHorizontal: 20,
                  borderRadius: 7.5,
                }}
                onPress={() => doneSerie()}
                text={"Terminar serie"}
              />
            )}
            <View>
              <Text>Ejercicios restantes:</Text>
              {restantExercises.map((item, index) => (
                <View>
                  <Text>{item.name}</Text>
                  {index === 0 && (
                     <Text>en proceso</Text>
                    
                  )}
                </View>
              ))}
            </View>
            <View>
              <Text>Ejercicios completados:</Text>
              {readyExercises.map((item) => (
                <Text>{item.name}</Text>
              ))}
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  main: {
    height: height,
  },
});
