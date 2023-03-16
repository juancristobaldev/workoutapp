import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React from "react";
import { Button, Platform, StatusBar, Text, View } from "react-native";
import { CREATE_EXERCISE } from "../../data/mutations";
import { TextField } from "../../screens/auth/components/TextField";
import { OptionsPicker } from "../OptionPicker";

import * as Yup from "yup";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { GET_EXERCISES } from "../../data/query";

export const CreateExercise = ({}) => {


  const [createExercise] = useMutation(CREATE_EXERCISE);

  const { width } = Dimensions.get('screen')

  const {
    values,
    handleSubmit,
    setFieldValue,
    errors,
    setFieldTouched,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      type: "Peso adicional",
      muscle: "Espalda",
    },
    onSubmit: async (values) => {
      await createExercise({
        variables: {
          input: {
            ...values,
            series: JSON.stringify([]),
          },
        },
        refetchQueries: [
          {
            query: GET_EXERCISES,
          },
        ],
      })
        .then(async ({ data }) => {
          const { success, errors, token } = data.createExercise;

          if (success) console.log("success");
          else {
            console.log(errors);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(4, "El nombre debe contener al menos 4 caracteres")
        .max(50, "Nombre demasiado largo")
        .required("Nombre obligatorio"),
      type: Yup.string().required("Tipo de ejercicio obligatorio"),
    }),
  });

  return (
    <View
      style={{
        top: Platform.OS === "ios" ? 35 : StatusBar.currentHeight,
        ...styles.container,
        width: width - 40,
      }}
    >
      <Text>Crear ejercicio</Text>
      <TextField
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
      <Button title="Crear" onPress={handleSubmit} />
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
