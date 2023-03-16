import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { Dimensions, SafeAreaView, Text, TextInput } from "react-native";
import { StatusBar } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Exercise } from "../../components/exercises/Exercise";
import { TypeSerie } from "../../components/exercises/TypeSerie";
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

export const CreateRoutine = () => {
  const { width: widthScreen } = Dimensions.get("screen");

  const [createRoutine] = useMutation(CREATE_ROUTINE)

  const [state, setState] = useState({
    dataFormCreate: {
      name: "",
      timeRecord:'',
      dones:0,
      flow: [],
    },
    modals: {
      flow: { isOpen: false, superSet: false, indexs: null },
      createExercise: false,
    },
  });

  const { addSerie, deleteSeries } = useSeries({
    state: state,
    setState: setState,
  });

  const { dataFormCreate, modals } = state;

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

  const handleSubmit = async () => {
    const dataForm = {...state.dataFormCreate}


    if(dataForm.name.length){
      if(dataForm.flow.length){
        dataForm.flow = JSON.stringify(dataForm.flow)

        await createRoutine({
          variables:{
            input:{
              ...dataForm
            }
          }
        }).then(({data}) => {
          console.log(data)
        })
      }else{
        console.log('Error')
      }
    }else{
      console.log('Nombre obligatorio')
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar />
      <View style={styles.mainContainer}>
        <HeaderWithBackButton
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
                    {exercise.cycle.map((item, indexItem) => (
                      <>
                        <Exercise
                          objState={{ state, setState }}
                          key={indexItem}
                          exercise={item}
                          indexExercise={indexExercise}
                          indexCycle={indexItem}
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
                    ))}
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
