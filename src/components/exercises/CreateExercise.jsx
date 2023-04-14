import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React from "react";
import { Button, Platform, StatusBar, Text, View } from "react-native";
import { CREATE_EXERCISE } from "../../data/mutations";
import { TextField } from "../../screens/auth/components/TextField";
import { OptionsPicker } from "../OptionPicker";

import * as Yup from "yup";
import * as texts from "../../constants/texts";
import * as sizes from "../../constants/sizes";

import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { GET_EXERCISES } from "../../data/query";
import { Loading } from "../Loading";
import { ButtonGeneral } from "../generals/CustomButton";
import { useState } from "react";

export const CreateExercise = ({ stateComponent }) => {
  const { width, height } = Dimensions.get("screen");

  const [createExercise, { loading: isLoading }] = useMutation(CREATE_EXERCISE);

  const { state, setState } = stateComponent;

  const [layoutView, setLayoutView] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const onLayout = (event) => {
    const { x, y, width, height: heightV } = event.nativeEvent.layout;
    setLayoutView({
      x: x,
      y: y,
      width: width,
      height: heightV,
    });
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      name: "",
      type: "Peso adicional",
      muscle: "Espalda",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required(texts.EMPTY_NAME_EXERCISE)
        .min(6, texts.ERROR_SHORT_NAME_EXERCISE)
        .max(50, texts.ERROR_LARGE_NAME_EXERCISE),
      type: Yup.string().required(texts.ERROR_REQUIRED_TYPE_EXERCISE),
      muscle: Yup.string().required(texts.ERROR_REQUIRED_MUSCLE_EXERCISE),
    }),
    onSubmit: async (values) => {
      await createExercise({
        variables: {
          input: {
            ...values,
            series: JSON.stringify([]),
          },
        },
        refetchQueries: [{ query: GET_EXERCISES }],
      })
        .then(({ data }) => {
          if (data.createExercise.success) {
            setState({
              ...state,
              modals: { ...state.modals, createExercise: false },
            });
          }
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    },
  });

  return (
    <View
      onLayout={onLayout}
      style={{
        position: "absolute",
        top: Platform.OS === "ios" ? 35 : StatusBar.currentHeight,
        ...styles.container,
        width: width - 40,
        borderRadius: 7.5,
        paddingVertical: 15,
        top: (height - layoutView.height) / 2,
      }}
    >
      {isLoading && <Loading />}
      <Text
        style={{
          fontWeight: "bold",
          fontSize: sizes.mediumFont,
          marginHorizontal: 10,
        }}
      >
        {texts.TITLE_MODAL_CREATE_EXERCISE}
      </Text>
      <TextField
        styleLabel={{ fontWeight: "500" }}
        style={{ marginHorizontal: 10, marginVertical: 5 }}
        stylesContainerInput={{ borderRadius: 7.5 }}
        stylesInput={{ paddingVertical: 5 }}
        value={values.name}
        onBlur={() => setFieldTouched("name", true)}
        error={touched.name && Boolean(errors.name)}
        errorText={errors.name && errors.name}
        stylesContainer={{ marginHorizontal: 10 }}
        label={"Nombre del ejercicio"}
        placeholder="Ingresa un nombre"
        onChangeText={(text) => setFieldValue("name", text)}
      />
      <OptionsPicker
        stylesLabel={{ fontWeight: "500" }}
        layoutView={layoutView}
        styleField={{
          padding: 5,
        }}
        styleContainer={{ marginHorizontal: 10, marginVertical: 5 }}
        label={"Tipo de ejercicio"}
        placeholder="Peso adicional"
        onValueChange={(value) => setFieldValue("type", value)}
        value={values.type}
        items={[
          { text: "Peso adicional" },
          { text: "Peso asistido" },
          { text: "Duracion" },
          { text: "Solo rep" },
        ]}
      />
      <OptionsPicker
        stylesLabel={{ fontWeight: "500" }}
        layoutView={layoutView}
        styleField={{
          padding: 5,
        }}
        styleContainer={{ marginHorizontal: 10, marginVertical: 5 }}
        label={"Musculo implicado"}
        placeholder="Espalda"
        onValueChange={(value) => setFieldValue("muscle", value)}
        value={values.muscle}
        items={[
          { text: "Espalda" },
          { text: "Pectoral" },
          { text: "Hombros" },
          { text: "Trapecio" },
          { text: "Biceps" },
          { text: "Triceps" },
          { text: "Compuesto" },
        ]}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 15,
        }}
      >
        <ButtonGeneral
          styleButton={{
            backgroundColor: "black",
            height: 30,
            borderRadius: 15,
            width: "45%",
          }}
          styleText={{
            fontWeight: "400",
            color: "white",
          }}
          text="Crear"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    left: 20,
    position: "absolute",
    zIndex: 2,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 2 },
  },
});
