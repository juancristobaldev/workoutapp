import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";

import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import {
  Button,
  SafeAreaView,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { ButtonGeneral } from "../../components/generals/CustomButton";
import { CustomHref } from "../../components/generals/CustomHref";
import { TextField } from "./components/TextField";
import {
  BUTTON_REGISTER_CONTINUE,
  LABEL_REPEAT_PASSWORD,
  ENTER_REPEAT_PASSWORD,
  ENTER_FIRSTNAME,
  ENTER_LASTNAME,
  LABEL_FIRSTNAME,
  LABEL_LASTNAME,
  REGISTED,
  SIGN_IN_BUTTON,
  LABEL_EMAIL,
  ENTER_EMAIL,
  LABEL_PASSWORD,
  ENTER_PASSWORD,
  ENTER_DATE,
} from "../../constants/texts";
import { FormTitle } from "./components/FormTitle";
import { CalendarField } from "./components/CalendarField";
import { useFormik } from "formik";

import * as Yup from "yup";
import * as texts from "../../constants/texts";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER } from "../../data/mutations";

import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";
import { GET_USER_BY_EMAIL } from "../../data/query";
import { Loading } from "../../components/Loading";

import * as sizes from "../../constants/sizes";

export const SignUpScreen = ({ navigation, setErros }) => {
  const [createUser, { loading }] = useMutation(CREATE_USER);
  const [errorsForm, setErrorsForm] = useState({});
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: true,
    confirmPassword: true,
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      date: "dd-mm-yyyy",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string()
        .required(texts.ERROR_FIRSTNAME)
        .max(50, "Nombre demasiado largo"),
      last_name: Yup.string()
        .required(texts.ERROR_LASTNAME)
        .max(50, "Apellido demasiado largo"),
      date: Yup.string().notRequired(),
      password: Yup.string()
        .required(texts.ERROR_PASSWORD)
        .min(6, texts.ERROR_SHORT_PASSWORD)
        .max(255),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], texts.ERROR_REPEAT_PASSWORD)
        .required(texts.ERROR_NULL_REPEAT_PASSWORD),
      email: Yup.string()
        .email(texts.ERROR_UNVALID_EMAIL)
        .required(texts.REQUIRED_ERROR_EMAIL)
        .max(255),
    }),
    onSubmit: async (values) => {
      const input = { ...values };
      delete input.confirmPassword;

      await createUser({
        variables: {
          input: { ...input },
        },
      })
        .then(async ({ data }) => {
          const { success, errors, token } = await data.createUser;
          if (success) {
            await AsyncStorage.setItem("@token", token);
            RNRestart.Restart();
          } else {
            setErrorsForm(JSON.parse(errors));
          }
        })
        .catch((err) => console.log("the error form:", err));
    },
  });

  const [openDatePicker, setOpenDatePicker] = useState(false);

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF" }}>
      <View style={styles.mainContainer}>
        <StatusBar />
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <FormTitle marginTop={20} form="register" />
          <ScrollView>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TextField
                value={values.first_name}
                maxLength={50}
                stylesContainer={{ width: "50%" }}
                stylesContainerInput={{ borderRadius: 5, width: "100%" }}
                onChangeText={(text) => setFieldValue("first_name", text)}
                label={LABEL_FIRSTNAME}
                placeholder={ENTER_FIRSTNAME}
                error={touched.first_name && Boolean(errors.first_name)}
                errorText={errors.first_name && errors.first_name}
                onBlur={() => setFieldTouched("first_name", true)}
              />
              <TextField
                value={values.last_name}
                stylesContainer={{ width: "50%", marginLeft: "1%" }}
                stylesContainerInput={{ borderRadius: 5 }}
                onChangeText={(text) => setFieldValue("last_name", text)}
                label={LABEL_LASTNAME}
                placeholder={ENTER_LASTNAME}
                error={touched.last_name && Boolean(errors.last_name)}
                errorText={errors.last_name && errors.last_name}
                onBlur={() => setFieldTouched("last_name", true)}
              />
            </View>
            <CalendarField
              title={'Selecciona tu fecha de nacimiento'}
              maxDate={new Date(new Date(Date.now()).toDateString())}
              height={50}
              sizeIcon={20}
              label={ENTER_DATE}
              value={values.date}
              setOpenDatePicker={() => setOpenDatePicker(true)}
              open={openDatePicker}
              onConfirm={(date) => {
                setFieldValue("date", date.toLocaleDateString("es-CL"));
                setOpenDatePicker(false);
              }}
              onCancel={() => {
                setOpenDatePicker(false);
              }}
            />
            <TextField
              value={values.email}
              stylesContainerInput={{ borderRadius: 5 }}
              label={LABEL_EMAIL}
              placeholder={ENTER_EMAIL}
              trailedIcon={"mail"}
              onChangeText={(text) => setFieldValue("email", text)}
              onBlur={() => setFieldTouched("email", true)}
              errorFromBackend={
                touched.email && Boolean(errorsForm.email_exist)
              }
              textErrorFromBackend={
                errorsForm.email_exist && errorsForm.email_exist
              }
              onChange={() => setErrorsForm({})}
              error={touched.email && Boolean(errors.email)}
              errorText={errors.email && errors.email}
            />
            <TextField
              secureTextEntry={passwordVisibility.password}
              value={values.password}
              stylesContainerInput={{ borderRadius: 5 }}
              label={LABEL_PASSWORD}
              placeholder={ENTER_PASSWORD}
              trailedIcon={!passwordVisibility.password ? "eye" : "eye-off"}
              functionTrailedIcon={() =>
                setPasswordVisibility({
                  ...passwordVisibility,
                  password: !passwordVisibility.password,
                })
              }
              onChangeText={(text) => setFieldValue("password", text)}
              onBlur={() => setFieldTouched("password", true)}
              error={touched.password && Boolean(errors.password)}
              errorText={errors.password && errors.password}
            />
            <TextField
              secureTextEntry={passwordVisibility.confirmPassword}
              value={values.confirmPassword}
              stylesContainerInput={{ borderRadius: 5 }}
              label={LABEL_REPEAT_PASSWORD}
              placeholder={ENTER_REPEAT_PASSWORD}
              trailedIcon={
                !passwordVisibility.confirmPassword ? "eye" : "eye-off"
              }
              functionTrailedIcon={() =>
                setPasswordVisibility({
                  ...passwordVisibility,
                  confirmPassword: !passwordVisibility.confirmPassword,
                })
              }
              onChangeText={(text) => setFieldValue("confirmPassword", text)}
              onBlur={() => setFieldTouched("confirmPassword", true)}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              errorText={errors.confirmPassword && errors.confirmPassword}
            />
          </ScrollView>
          <ButtonGeneral
            styleButton={{
              marginVertical: 20,
              borderRadius: 100,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 0,
            }}
            styleText={{ color: "black" }}
            onPress={() => handleSubmit()}
            text={"Registrarse"}
          />
          <Text style={{ alignSelf: "center", fontSize: sizes.smallFont }}>
            {REGISTED}
          </Text>
          <CustomHref
            text={"Iniciar sesion"}
            onPress={() => navigation.navigate("SignIn")}
            touchableStyle={{
              marginBottom: 20,
              width: 105.5,
              alignSelf: "center",
            }}
            textStyle={{
              textDecorationLine: "underline",
              fontSize: sizes.smallFont,
            }}
          />
        </KeyboardAvoidingView>
      </View>
      {loading && <Loading />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    paddingHorizontal: 20,
  },
});
