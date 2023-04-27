import React, { useEffect } from "react";
import { useState } from "react";
import { Dimensions, SafeAreaView, Text, TextInput } from "react-native";
import { StatusBar } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Exercise } from "../../components/exercises/Exercise";
import { ButtonGeneral } from "../../components/generals/CustomButton";
import { HeaderWithBackButton } from "../../components/generals/HeaderWithBackButton";
import { CustomModal } from "../../components/generals/Modal";
import { List } from "../../components/lists/List";
import { ListExercises } from "../../components/lists/ListExercises";
import {
  FIRST_SERIE,
  PLACEHOLDER_NAME_ROUTINE,
  ROUTINE_FLOW,
} from "../../constants/texts";
import { useSeries } from "../../hooks/useSeries";

import * as sizes from "../../constants/sizes";
import { Serie } from "../../components/exercises/Serie";
import { ScrollView } from "react-native-gesture-handler";

import * as themes from "../../constants/theme";
import { useMutation } from "@apollo/client";
import { CREATE_ROUTINE } from "../../data/mutations";
import { Loading } from "../../components/Loading";
import { GET_ROUTINES } from "../../data/query";
import {
  SetRestModal,
  setRestModal,
} from "../../components/modals/setRestModal";
import { interpolateNode } from "react-native-reanimated";

export const CreateRoutine = ({ navigation }) => {
  const { width: widthScreen, height: heightScreen } = Dimensions.get("screen");

  const [createRoutine, { loading: isLoading }] = useMutation(CREATE_ROUTINE, {
    update(cache, { data: { createRoutine } }) {
      const { getRoutines } = cache.readQuery({ query: GET_ROUTINES });

      cache.writeQuery({
        query: GET_ROUTINES,
        data: { getRoutines: [...getRoutines, createRoutine.routine] },
      });
    },
    async onCompleted() {},
    onError(error) {
      console.log(error);
    },
  });

  const [state, setState] = useState({
    dataFormCreate: {
      name: "",
      timeRecord: "",
      dones: 0,
      flow: [],
    },
    modals: {
      flow: { isOpen: false, superSet: false, indexs: null },
      createExercise: false,
    },
    rest: {
      isOpen: false,
      idList: false,
      idExerciseSuperSet: false,
      minutes: false,
      seconds: false,
    },
    errors: [],
    loading: false,
  });

  const { addSerie, deleteSeries } = useSeries({
    state: state,
    setState: setState,
  });

  const { dataFormCreate, modals, rest } = state;

  const setDataRoutine = async (text, objEx) => {
    const newData = { ...dataFormCreate };
    const newList = [...dataFormCreate.flow];

    const { nameInput, idList, serie, indexCycle } = objEx;

    if (indexCycle >= 0)
      newList[idList].cycle[indexCycle].series[serie][nameInput] = text;
    else newList[idList].series[serie][nameInput] = text;

    newData.flow = newList;

    setState({ ...state, dataFormCreate: newData });
  };

  const setRest = async () => {
    const { idList, idExerciseSuperSet, minutes, seconds } = rest,
      errors = [];

    const newData = { ...dataFormCreate },
      newList = newData.flow;

    if (parseInt(minutes) > 59 || parseInt(seconds) > 59)
      errors.push("El valor maximo de minutos y segundos es 59");
    if (!minutes || !seconds) errors.push("Minutos y segundos obligatorios");

    if (!errors.length) {
      const timerFormat = {
        minutes: `${minutes <= 9 ? `0${minutes}` : `${minutes}`}`,
        seconds: `${seconds <= 9 ? `0${seconds}` : `${seconds}`}`,
      };

      if (idExerciseSuperSet >= 0)
        newList[idList].cycle[idExerciseSuperSet].rest = timerFormat;
      else newList[idList].rest = timerFormat;

      await setState({
        ...state,
        dataFormCreate: newData,
        rest: {
          isOpen: false,
          idList: false,
          idExerciseSuperSet: false,
          minutes: false,
          seconds: false,
        },
      });
    } else {
      setState({ ...state, errors: errors });
    }
  };

  const handleSubmit = async () => {
    const dataForm = { ...state.dataFormCreate };
    const errors = [];

    if (dataForm.name.length) {
      if (dataForm.flow.length) {
        dataForm.flow.forEach((item, indexList) => {
          if (item.rest) item.rest = JSON.stringify(item.rest);
          if (item.type === "superSet") {
            item.cycle.forEach((exCycle, indexExercise) => {
              if (exCycle.rest) exCycle.rest = JSON.stringify(exCycle.rest);

              if (!exCycle.series.length) {
                const index = errors.findIndex(
                  (item) => item.index === indexList
                );
                if (index >= 0) {
                  errors[index].errors.push({
                    indexExercise: indexExercise,
                  });
                } else {
                  errors.push({
                    index: indexList,
                    errors: [
                      {
                        indexExercise: indexExercise,
                      },
                    ],
                  });
                }
              }
            });
          } else if (!item.series.length)
            errors.push({
              index: indexList,
            });
        });

        if (!errors.length) {
          dataForm.flow = JSON.stringify(dataForm.flow);

          console.log(dataForm);

          await createRoutine({
            variables: {
              input: {
                ...dataForm,
              },
            },
          }); 
        } else setState({ ...state, errors: errors });
      } else {
        console.log("No has agregado ningun ejercicio");
      }
    } else {
      console.log("Nombre obligatorio");
    }
  };

  useEffect(() => {
    if (state.errors.length) {
      setState({ ...state, errors: [] });
    }
  }, [state.dataFormCreate.flow]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar />
      <View style={styles.mainContainer}>
        {isLoading || (state.loading && <Loading />)}
        <HeaderWithBackButton
          onPressBack={() => navigation.navigate("routines-main")}
          leadingComponent={
            <>
              <Text style={{ fontSize: sizes.mediumFont }}>Nuevo</Text>
              <TextInput
                style={{ fontSize: sizes.mediumFont, fontWeight: "bold" }}
                onChangeText={(text) =>
                  setState({
                    ...state,
                    dataFormCreate: { ...dataFormCreate, name: text },
                  })
                }
                placeholder={PLACEHOLDER_NAME_ROUTINE}
              />
            </>
          }
        />
        <Text
          style={{
            marginLeft: 20,
            fontSize: sizes.smallFont,
            fontWeight: "bold",
            paddingBottom: 20,
          }}
        >
          {ROUTINE_FLOW}
        </Text>
        <ScrollView>
          {dataFormCreate.flow.map((exercise, indexExercise) => {
            const { type } = exercise;
            let noSeries;

            if (state.errors.length)
              noSeries = state.errors.find(
                (item) => item.index === indexExercise
              );

            if (type === "superSet") {
              return (
                <View style={{ flexDirection: "row", marginBottom: 15 }}>
                  <View
                    style={{
                      height: "100%",
                      marginLeft: 20,
                      width: 5,
                      borderRadius: 2.5,
                      marginVertical: 5,
                      backgroundColor: themes.THEME_COLOR,
                    }}
                  />
                  <View>
                    {exercise.cycle.map((item, indexItem) => {
                      let errorNoSerie;

                      if (noSeries)
                        errorNoSerie = noSeries.errors.find(
                          (item) => item.indexExercise === indexItem
                        );

                      return (
                        <>
                          <Exercise
                            objState={{ state, setState }}
                            key={indexItem}
                            exercise={item}
                            indexExercise={indexExercise}
                            indexCycle={indexItem}
                            errorNoSerie={errorNoSerie}
                          >
                            <List
                              data={item.series}
                              onEmpty={() => (
                                <Text
                                  numberOfLines={2}
                                  style={{
                                    color: "white",
                                    padding: 15,
                                    fontSize: sizes.verySmallFont,
                                    justifyContent: "center",
                                    alignSelf: "center",
                                    opacity: 0.75,
                                  }}
                                >
                                  {FIRST_SERIE}
                                  🏋
                                </Text>
                              )}
                              render={(serie, indexSerie) => (
                                <Serie
                                  key={indexSerie}
                                  deleteSeries={deleteSeries}
                                  serie={serie}
                                  indexSerie={indexSerie}
                                  exercise={item}
                                  indexCycle={indexItem}
                                  indexExercise={indexExercise}
                                  setDataRoutine={setDataRoutine}
                                />
                              )}
                            />
                            <ButtonGeneral
                              styleButton={{
                                height: 30,
                                borderRadius: 15,
                                marginHorizontal: 10,
                                marginVertical: 10,
                                backgroundColor: "white",
                              }}
                              styleText={{
                                fontSize: sizes.verySmallFont,
                                fontWeight: "500",
                              }}
                              onPress={() => addSerie(indexExercise, indexItem)}
                              text={"+ Serie"}
                            />
                          </Exercise>
                          {indexItem + 1 === exercise.cycle.length && (
                            <ButtonGeneral
                              outlined={true}
                              onPress={() =>
                                setState({
                                  ...state,
                                  modals: {
                                    ...modals,
                                    flow: {
                                      isOpen: true,
                                      superSet: true,
                                      indexs: {
                                        indexExercise: indexExercise,
                                        indexCycle: indexItem,
                                      },
                                    },
                                  },
                                })
                              }
                              styleButton={{
                                height: 30,
                                marginLeft: 5,
                                borderRadius: 20,
                                marginTop: 5,
                              }}
                              styleText={{ fontSize: sizes.verySmallFont }}
                              text={"+ Ejercicio"}
                            />
                          )}
                        </>
                      );
                    })}
                  </View>
                </View>
              );
            } else
              return (
                <Exercise
                  objState={{ state, setState }}
                  key={indexExercise}
                  exercise={exercise}
                  indexExercise={indexExercise}
                  errorNoSerie={noSeries}
                >
                  <List
                    onEmpty={() => (
                      <Text
                        style={{
                          color: "white",
                          padding: 15,
                          fontSize: sizes.verySmallFont,
                          justifyContent: "center",
                          alignSelf: "center",
                          opacity: 0.75,
                        }}
                      >
                        {FIRST_SERIE}
                        🏋
                      </Text>
                    )}
                    data={exercise.series}
                    render={(serie, indexSerie) => (
                      <Serie
                        key={indexSerie}
                        deleteSeries={deleteSeries}
                        serie={serie}
                        indexSerie={indexSerie}
                        exercise={exercise}
                        indexExercise={indexExercise}
                        setDataRoutine={setDataRoutine}
                      />
                    )}
                  />
                  <ButtonGeneral
                    styleButton={{
                      height: 30,
                      borderRadius: 15,
                      marginHorizontal: 10,
                      marginVertical: 10,
                      backgroundColor: "white",
                    }}
                    styleText={{
                      fontSize: sizes.verySmallFont,
                      fontWeight: "500",
                    }}
                    onPress={() => addSerie(indexExercise)}
                    text={"+ Serie"}
                  />
                </Exercise>
              );
          })}
          <ButtonGeneral
            outlined={true}
            onPress={() =>
              setState({
                ...state,
                modals: {
                  ...modals,
                  flow: { isOpen: true, superSet: false, indexs: null },
                },
              })
            }
            styleButton={{
              height: 40,
              marginHorizontal: 20,
              borderRadius: 20,
              marginTop: 15,
            }}
            styleText={{ fontSize: sizes.verySmallFont }}
            text={"+ Ejercicio"}
          />
        </ScrollView>
        <View
          style={{
            paddingTop: 20,
            marginHorizontal: 20,
            alignSelf: "flex-end",
          }}
        >
          <ButtonGeneral
            onPress={() => handleSubmit()}
            styleButton={{
              flexDirection: "row",
              height: 40,
              borderRadius: 20,
              width: widthScreen / 2.5,
            }}
            styleText={{
              paddingHorizontal: 10,
              fontWeight: "500",
              fontSize: sizes.verySmallFont,
            }}
            text={"Hecho"}
            trailedIcon={"fa-arrow-right"}
          />
        </View>
      </View>
      {modals.flow.isOpen && (
        <CustomModal
          onPress={
            !modals.createExercise
              ? () =>
                  setState({
                    ...state,
                    modals: {
                      ...modals,
                      flow: { isOpen: false, superSet: false, indexs: null },
                    },
                  })
              : () =>
                  setState({
                    ...state,
                    modals: { ...modals, createExercise: false },
                  })
          }
        >
          <ListExercises
            nameList={"exercises"}
            closeModal={() => console.log("click")}
            stateComponent={{ state: state, setState: setState }}
          />
        </CustomModal>
      )}
      {rest.isOpen && (
        <SetRestModal setRest={setRest} objState={{ state, setState }} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
  },
  mainContainer: {
    backgroundColor: "white",
    height: "100%",
  },
});
