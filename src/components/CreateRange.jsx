import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { CalendarField } from "../screens/auth/components/CalendarField";
import { TextField } from "../screens/auth/components/TextField";

import * as sizes from "../constants/sizes";
import * as themes from "../constants/theme";
import * as Yup from "yup";
import * as texts from "../constants/texts";

import { ButtonGeneral } from "./generals/CustomButton";
import { useState } from "react";
import { useEffect } from "react";
import { useFormik } from "formik";

export const CreateRange = ({ modalRange, setModalRange, plan, setPlan }) => {
  const { width, height } = Dimensions.get("screen");

  const [minStartDate, setMinStartDate] = useState(null);

  const [pickers, setPickers] = useState({
    startPicker: false,
    endPicker: false,
  });

  console.log(pickers);

  const { values, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
    },
    validationSchema: Yup.object().shape({
      startDate: Yup.string().required(texts.ERROR_DATE_START_REQUIRED),
      endDate: Yup.string().required(texts.ERROR_DATE_END_REQUIRED),
    }),
    onSubmit: async (values) => {
      const { startDate, endDate } = values;

      const newRange = {
        start: startDate,
        startDate: new Date(
          parseInt(startDate.substring(6, 10)),
          parseInt(startDate.substring(3, 5)) - 1,
          parseInt(startDate.substring(0, 2))
        ),
        end: endDate,
        endDate: new Date(
          parseInt(endDate.substring(6, 10)),
          parseInt(endDate.substring(3, 5)) - 1,
          parseInt(endDate.substring(0, 2))
        ),
      };

      const newPlan = { ...plan };

      const { daysImplicated } = newPlan;

      await daysImplicated.forEach(async (dayImplicated) => {
        if (dayImplicated.value === plan.positionDay) {
          const { ranges } = dayImplicated;

          let isAlreadyExist;

          await ranges.forEach((range) => {
            if (JSON.stringify(range) === JSON.stringify(newRange)) {
              isAlreadyExist = true;
            }
          });

          if (isAlreadyExist) setMessage(texts.ERROR_RANGE_ALREADY_EXIST);
          else {
            const newRanges = [...ranges, newRange].sort(
              (a, b) => a.startDate - b.startDate
            );

            dayImplicated.ranges = newRanges;

            setPlan({ ...newPlan });
            setModalRange({
              ...modalRange,
              create: {
                isOpen: false,
              },
            });
          }
        }
      });
    },
  });

  const [message, setMessage] = useState(false);

  useEffect(() => {
    const day =
      plan.daysImplicated[
        plan.daysImplicated.findIndex((day) => day.value === plan.positionDay)
      ];

    if (day.ranges.length)
      setMinStartDate(day.ranges[day.ranges.length - 1].endDate);
    else {
      setMinStartDate(null);
    }

    setMessage(false);
  }, [values]);

  return (
    <View
      style={{
        backgroundColor: "white",
        position: "absolute",
        left: width * 0.05,
        top: height / 2 - 110,
        width: width * 0.9,
        borderRadius: 10,
        shadowColor: "black",
        shadowRadius: 5,
        shadowOpacity: 0.25,
        shadowOffset: { width: 2, height: 2 },
      }}
    >
      <View style={styles.headerNewRange}>
        <Text
          style={{
            fontSize: sizes.mediumFont,
            fontWeight: "bold",
          }}
        >
          Nuevo rango
        </Text>
        <TouchableOpacity
          onPress={() =>
            setModalRange({ ...modalRange, create: { isOpen: false } })
          }
          style={{
            width: 25,
            height: 25,
            backgroundColor: themes.THEME_SILVER,
            justifyContent: "center",
            borderRadius: 5,
          }}
        >
          <Ionicons
            style={{
              alignSelf: "center",
            }}
            name="close-outline"
            size={20}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerInputs}>
        <CalendarField
          minDate={minStartDate}
          error={errors.startDate}
          title={texts.LABEL_PICKER_START}
          value={values.startDate}
          open={pickers.startPicker}
          setOpenDatePicker={() =>
            setPickers({ ...pickers, startPicker: true })
          }
          onConfirm={(date) => {
            setFieldValue("startDate", date.toLocaleDateString("es-CL"));
            setPickers({ ...pickers, startPicker: false });
          }}
          onCancel={() => {
            setPickers({ ...pickers, startPicker: false });
          }}
          fontWeight={"300"}
          height={40}
          styleContainer={{
            width: "49%",
          }}
          sizeIcon={15}
          label={texts.LABEL_DAY_START}
        />
        <CalendarField
          disabled={values.startDate ? false : true}
          minDate={
            values.startDate &&
            new Date(
              parseInt(values.startDate.substring(6, 10)),
              parseInt(values.startDate.substring(3, 5)) - 1,
              parseInt(values.startDate.substring(0, 2)) + 1
            )
          }
          error={errors.endDate}
          title={texts.LABEL_PICKER_END}
          value={values.endDate}
          open={pickers.endPicker}
          setOpenDatePicker={() => setPickers({ ...pickers, endPicker: true })}
          onConfirm={(date) => {
            setFieldValue("endDate", date.toLocaleDateString("es-CL"));
            setPickers({ ...pickers, endPicker: false });
          }}
          onCancel={() => {
            setPickers({ ...pickers, endPicker: false });
          }}
          fontWeight={"300"}
          height={40}
          styleContainer={{
            width: "49%",
          }}
          sizeIcon={15}
          label={texts.LABEL_DAY_END}
        />
      </View>
      {message && (
        <Text
          style={{
            fontSize: sizes.smallFont,
            paddingHorizontal: 10,
            paddingVertical: 2.5,
            color: "red",
          }}
        >
          {message}
        </Text>
      )}
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingRight: 10,
        }}
      >
        <ButtonGeneral
          onPress={() => {
            handleSubmit();
          }}
          text={"Crear rango"}
          styleButton={{
            backgroundColor: "black",
            width: width * 0.425,
            height: 40,
            borderRadius: 20,
            marginBottom: 20,
            marginVertical: 10,
            marginBottom: 20,
          }}
          styleText={{ color: "white", fontWeight: "300" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerNewRange: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  containerInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
