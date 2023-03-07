import React from "react";
import { useState } from "react";
import { SafeAreaView, Text, TextInput } from "react-native";
import { StatusBar } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { ButtonGeneral } from "../../components/generals/CustomButton";
import { HeaderWithBackButton } from "../../components/generals/HeaderWithBackButton";
import { CustomModal } from "../../components/generals/Modal";
import { ListExercises } from "../../components/lists/ListExercises";
import { TextField } from "../auth/components/TextField";

export const CreateRoutine = () => {
  const [state, setState] = useState({
    dataFormCreate: {
      name: "",
      exercises: [],
    },
    modals: {
      exercises: false,
      createExercise: false,
    },
  });

  const { routine, modals } = state;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar />
      <View style={styles.mainContainer}>
        <HeaderWithBackButton
          leadingComponent={
            <>
              <Text>Nuevo</Text>
              <TextInput
                onChangeText={(text) =>
                  setState({ ...state, routine: { ...routine, name: text } })
                }
                placeholder="Nombre de tu rutina"
              />
            </>
          }
        />
        <Text style={{ marginLeft: 20 }}>Flujo de tu rutina</Text>
        <ButtonGeneral
          outlined={true}
          onPress={() =>
            setState({ ...state, modals: { ...modals, exercises: true } })
          }
          styleButton={{ height: 40, marginHorizontal: 20, borderRadius: 20 }}
          text={"+ Ejercicio"}
        />
      </View>
      {modals.exercises && (
        <CustomModal
          onPress={
            !modals.createExercise
              ? () =>
                  setState({
                    ...state,
                    modals: { ...modals, exercises: false },
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
            closeModal={() =>
              setState({ ...state, modals: { ...modals, exercises: false } })
            }
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
