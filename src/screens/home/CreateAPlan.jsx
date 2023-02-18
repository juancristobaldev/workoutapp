import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";

import { HeaderWithBackButton } from "../../components/generals/HeaderWithBackButton";

import * as sizes from "../../constants/sizes";
import * as texts from "../../constants/texts";
import * as themes from "../../constants/theme";

import { ButtonGeneral } from "../../components/generals/CustomButton";
import { CustomModal } from "../../components/generals/Modal";
import { CreateRange } from "../../components/CreateRange";
import { CustomPicker } from "../../components/generals/CustomPicker";
import { DayField } from "../../components/DayField";
import { DayPicker } from "../../components/DayPicker";
import { Range } from "../../components/Range";

export const CreateAPlan = ({ navigation }) => {
  const [plan, setPlan] = useState({
    namePlan: "",
    positionDay: null,
    daysImplicated: [],
  });

  const [optionPicker, setOptionPicker] = useState({
    isOpen: false,
    value: null,
    items: [],
  });

  const [modalRange, setModalRange] = useState({
    create: {
      isOpen: false,
    },
    delete: {
      isOpen: false,
      value: null,
    },
  });

  const deleteRange = async () => {
    const newPlan = { ...plan };
    const { daysImplicated } = newPlan;

    daysImplicated.forEach((item) => {
      if (item.value === plan.positionDay) {
        item.ranges.splice(modalRange.delete.value, 1);
      }
    });

    await setPlan({ ...plan });
    setModalRange({
      ...modalRange,
      delete: {
        isOpen: false,
        value: null,
      },
    });
  };

  const { width, height } = Dimensions.get("screen");

  return (
    <SafeAreaView>
      <StatusBar />
      <View
        style={{
          backgroundColor: "white",
          height: height,
        }}
      >
        <HeaderWithBackButton
          onPressBack={() => navigation.navigate("main")}
          leadingComponent={
            <>
              <Text
                style={{
                  fontSize: sizes.smallFont,
                }}
              >
                {texts.NEW_PLAN}
              </Text>
              <TextInput
                style={{
                  fontSize: sizes.mediumFont,
                  fontWeight: "bold",
                }}
                placeholder={texts.ENTER_NAME_PLAN}
              />
            </>
          }
        />

        <Text
          style={{
            marginLeft: 20,
            fontSize: sizes.smallFont,
            fontWeight: "600",
          }}
        >
          Dias comprometidos
        </Text>
        <DayPicker
          plan={plan}
          setPlan={setPlan}
          optionPicker={optionPicker}
          setOptionPicker={setOptionPicker}
        />
        {optionPicker.items.length > 0 && (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 20,
              }}
            >
              <Text
                style={{
                  fontSize: sizes.smallFont,
                  fontWeight: "600",
                }}
              >
                Planificacion
              </Text>
              <DayField
                optionPicker={optionPicker}
                setOptionPicker={setOptionPicker}
                plan={plan}
                setPlan={setPlan}
              />
            </View>
            {plan.daysImplicated.map((item) => {
              if (item.value === plan.positionDay) {
                return item.ranges.map((item, index) => (
                  <Range
                    modalRange={modalRange}
                    setModalRange={setModalRange}
                    item={item}
                    index={index}
                  />
                ));
              }
            })}
            <ButtonGeneral
              onPress={() =>
                setModalRange({ ...modalRange, create: { isOpen: true } })
              }
              text={"Nuevo rango"}
              styleButton={{
                marginHorizontal: 20,
                marginVertical: 20,
                borderRadius: 10,
                height: 40,
                backgroundColor: "black",
              }}
              styleText={{
                color: "white",
                fontSize: sizes.smallFont,
                fontWeight: "300",
              }}
            />
          </>
        )}
      </View>
      {optionPicker.isOpen && (
        <CustomModal
          onPress={() => setOptionPicker({ ...optionPicker, isOpen: false })}
        >
          <CustomPicker
            value={optionPicker.value}
            items={optionPicker.items}
            onValueChange={(item) =>
              setOptionPicker({ ...optionPicker, value: item })
            }
          />
        </CustomModal>
      )}
      {modalRange.create.isOpen && (
        <CustomModal
          onPress={() =>
            setModalRange({ ...modalRange, create: { isOpen: false } })
          }
        >
          <CreateRange
            plan={plan}
            setPlan={setPlan}
            modalRange={modalRange}
            setModalRange={setModalRange}
          />
        </CustomModal>
      )}
      {modalRange.delete.isOpen && (
        <CustomModal
          onPress={() =>
            setModalRange({
              ...modalRange,
              delete: { isOpen: false, value: null },
            })
          }
        >
          <View
            style={{
              position: "absolute",
              zIndex: 2,
              top: height / 2 - 75,
              left: width * 0.05,
              backgroundColor: "white",
              width: width * 0.9,
              height: 150,
              borderRadius: 10,
              shadowColor: "black",
              shadowRadius: 5,
              shadowOpacity: 0.25,
              shadowOffset: { width: 2, height: 2 },
              justifyContent: "center",
            }}
          >
            <ButtonGeneral
              text={"Editar"}
              styleButton={{ backgroundColor: "transparent" }}
              styleText={{ fontWeight: "300" }}
            />
            <ButtonGeneral
              text={"Eliminar"}
              styleButton={{ backgroundColor: "transparent" }}
              styleText={{ fontWeight: "500", color: "red" }}
              onPress={() => deleteRange()}
            />
          </View>
        </CustomModal>
      )}
    </SafeAreaView>
  );
};
