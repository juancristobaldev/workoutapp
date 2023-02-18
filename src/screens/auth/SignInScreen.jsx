import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { SafeAreaView, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ContinueWithFb } from "./components/ContinueWithFb";
import { ContinueWithGoogle } from "./components/ContinueWithGoogle";
import { ButtonGeneral } from "../../components/generals/CustomButton";
import { TextField } from "./components/TextField";
import * as texts from "../../constants/texts";
import { text } from "@fortawesome/fontawesome-svg-core";
import { CustomHref } from "../../components/generals/CustomHref";
import { Space } from "../../components/generals/Space";
import { FormTitle } from "./components/FormTitle";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { USER_SIGN_IN } from "../../data/mutations";

import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";
import { ActivityIndicator } from "react-native";
import { Loading } from "../../components/Loading";
import * as sizes from "../../constants/sizes";

export const SignInScreen = ({ navigation }) => {
  const [userSignIn, { loading }] = useMutation(USER_SIGN_IN);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [errorsBackend, setErrorsBackend] = useState({});

  const {
    values,
    handleSubmit,
    setFieldValue,
    errors,
    setFieldTouched,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { email, password } = values;

      await userSignIn({
        variables: {
          input: {
            email: email,
            password: password,
          },
        },
      })
        .then(async ({ data }) => {
          const { success, errors, token } = data.userSignIn;
          if (success) {
            await AsyncStorage.setItem("@token", token);
            RNRestart.Restart();
          } else setErrorsBackend(JSON.parse(errors));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email(texts.ERROR_UNVALID_EMAIL)
        .max(255)
        .required(texts.REQUIRED_ERROR_EMAIL),
      password: Yup.string().max(255).required(texts.ERROR_PASSWORD),
    }),
  });

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF" }}>
      <View style={styles.mainContainer}>
        <StatusBar />
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <FormTitle marginTop={50} form="login" />
          <TextField
            value={values.email}
            stylesContainer={{ paddingVertical: 5 }}
            stylesContainerInput={{ borderRadius: 5 }}
            label={texts.LABEL_EMAIL}
            trailedIcon={"person"}
            onBlur={() => setFieldTouched("email", true)}
            error={touched.email && Boolean(errors.email)}
            errorText={errors.email && errors.email}
            onChangeText={(text) => setFieldValue("email", text)}
            placeholder={texts.ENTER_EMAIL}
            errorFromBackend={touched.email && Boolean(errorsBackend.user_auth)}
            textErrorFromBackend={
              errorsBackend.user_auth && errorsBackend.user_auth
            }
          />
          <TextField
            value={values.password}
            secureTextEntry={passwordVisible}
            stylesContainer={{ paddingVertical: 5 }}
            stylesContainerInput={{ borderRadius: 5 }}
            label={texts.LABEL_PASSWORD}
            trailedIcon={!passwordVisible ? "eye" : "eye-off"}
            functionTrailedIcon={() => setPasswordVisible(!passwordVisible)}
            onBlur={() => setFieldTouched("password", true)}
            error={touched.password && Boolean(errors.password)}
            errorText={errors.password && errors.password}
            onChangeText={(text) => setFieldValue("password", text)}
            placeholder={texts.ENTER_PASSWORD}
            errorFromBackend={
              touched.password && Boolean(errorsBackend.user_password)
            }
            textErrorFromBackend={
              errorsBackend.user_password && errorsBackend.user_password
            }
          />
          <ButtonGeneral
            styleButton={{
              marginVertical: 20,
              borderRadius: 100,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 0,
            }}
            styleText={{ color: "black" }}
            onPress={() => handleSubmit()}
            text={texts.SIGN_IN_BUTTON}
          />
          <Text
            style={{
              alignSelf: "center",
              paddingVertical: 5,
              fontSize: sizes.smallFont,
            }}
          >
            {texts.CONTINUE_WITH_RRSS}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingVertical: 10,
            }}
          >
            <ContinueWithFb setStatusLoading={setStatusLoading} />
            <ContinueWithGoogle setStatusLoading={setStatusLoading} />
          </View>
          <Text
            style={{ alignSelf: "center", paddingVertical: 5, fontSize: sizes.smallFont }}
          >
            {texts.UNREGISTED}
          </Text>
          <CustomHref
            onPress={() => navigation.navigate("SignUp")}
            touchableStyle={{
              alignSelf: "center",
              alignItems: "center",
              width: 120,
              marginBottom: 50,
            }}
            textStyle={{ fontSize: sizes.smallFont, textDecorationLine: "underline" }}
            text={"Registrate aqui"}
          />
        </KeyboardAvoidingView>
      </View>
      {(statusLoading || loading) && <Loading />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    height: "100%",
    paddingHorizontal: 20,
  },
});
