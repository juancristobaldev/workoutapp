import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Dimensions, Platform } from "react-native";
import { Button, StatusBar, Text, View } from "react-native";
import {
  EMPTY_SEARCH,
  EMPTY_SEARCH_ROUTINES,
  SOME_ERROR,
} from "../../constants/texts";
import { GET_EXERCISES } from "../../data/query";
import { useList } from "../../hooks/useListToSelect";

import { ContainerSearch } from "../generals/ContainerSearch";

import { CustomCheckBox } from "../../components/generals/CheckBox";
import { CreateExercise } from "../exercises/CreateExercise";
import { ButtonGeneral } from "../generals/CustomButton";

import * as sizes from "../../constants/sizes";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";

export const ListExercises = ({ closeModal, stateComponent }) => {
  const {
    totalSelects,
    loading,
    error,
    listForSelect,
    listSelected,
    selectItem,
    addItem,
  } = useList(
    "flow",
    true,
    { nameGql: "getExercises", gql: GET_EXERCISES },
    stateComponent
  );

  const { state, setState } = stateComponent;

  const addSuperSet = () => {
    const superSet = {
      type: "superSet",
      cycle: [
        ...listSelected.map((selectItem) => {
          const newItem = { ...selectItem };

          newItem.series = JSON.parse(newItem.series);

          newItem.isSuperSet = true;

          return newItem;
        }),
      ],
      cycles: 1,
    };

    const newFlow = [...state.dataFormCreate.flow];

    newFlow.push(superSet);

    setState({
      ...state,
      dataFormCreate: { ...state.dataFormCreate, flow: newFlow },
      modals: {
        ...state.modals,
        ["flow"]: { isOpen: false, superSet: false, indexs: null },
      },
    });
  };

  const addItemToSuperSet = () => {
    const newData = { ...state.dataFormCreate };

    const { indexs } = state.modals.flow;

    listSelected.forEach((itemSelected) => {
      newData.flow[indexs.indexExercise].cycle.push({
        ...itemSelected,
        isSuperSet:true,
        series: JSON.parse(itemSelected.series),
      });
    });

    setState({
      ...state,
      dataFormCreate: newData,
      modals: {
        ...state.modals,
        flow: { isOpen: false, superSet: false, indexs: null },
      },
    });
  };

  const { width, height } = Dimensions.get("screen");

  const [searchValue, setSearchValue] = useState("");

  if (!state.modals.createExercise)
    return (
      <View
        style={{
          top:
            Platform.OS === "ios"
              ? 35 + height * 0.125
              : StatusBar.currentHeight,
          ...styles.container,
          width: width - 40,
          height: height * 0.7,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            paddingVertical: 15,
          }}
        >
          <Text style={{ fontSize: sizes.mediumFont, fontWeight: "bold" }}>
            Ejercicios
          </Text>
          <View style={{ flexDirection: "row" }}>
            <ButtonGeneral
              text="Nuevo"
              styleButton={{
                backgroundColor: "#F7F7F7",
                height: 35,
                paddingHorizontal: 20,
                borderRadius: 7.5,
                marginRight: 10,
              }}
              styleText={{
                fontSize: sizes.verySmallFont,
                fontWeight: "500",
              }}
              onPress={() =>
                setState({
                  ...state,
                  modals: { ...state.modals, createExercise: true },
                })
              }
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#F7F7F7",
                padding: 7.5,
                borderRadius: 7.5,
              }}
            >
              <Ionicons name="close" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <ContainerSearch
          data={listForSelect}
          onEmptyData={() => <Text>Empty list</Text>}
          onEmptySearch={() => (
            <Text>{`${EMPTY_SEARCH} "${searchValue}"`}</Text>
          )}
          styleScrollView={{
            maxHeight: "20%",
          }}
          onLoading={() => <Text>Cargando</Text>}
          onError={() => <Text>{SOME_ERROR}</Text>}
          loading={loading}
          error={error}
          searchValues={searchValue}
          onChange={setSearchValue}
          render={(item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                height: 75,
                alignItems: "center",
              }}
            >
              <CustomCheckBox
                style={{ marginLeft: 20 }}
                checked={listForSelect[index].select}
                onPress={() => selectItem(item.id)}
                size={20}
              />
              <View
                style={{
                  paddingLeft: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: sizes.smallFont,
                    fontWeight: "bold",
                    marginBottom: 5,
                  }}
                >
                  {item.name}
                </Text>
                <Text style={{ fontSize: sizes.verySmallFont }}>
                  {item.muscle}
                </Text>
              </View>
            </View>
          )}
        />
        <View
          style={{
            flexDirection: "row",
            padding: 20,
            justifyContent: "flex-end",
          }}
        >
          {listForSelect.filter((item) => item.select === true).length >= 2 &&
            state.modals.flow.superSet === false && (
              <ButtonGeneral
                styleButton={{
                  backgroundColor: "black",
                  width: "50%",
                  height: 35,
                  borderRadius: 17.5,
                }}
                styleText={{
                  color: "white",
                  fontSize: sizes.verySmallFont,
                  fontWeight: "500",
                }}
                onPress={() => addSuperSet()}
                text={"Super set"}
              />
            )}
          <ButtonGeneral
            disabled={totalSelects > 0 ? false : true}
            styleButton={{
              backgroundColor: "black",
              marginLeft: 10,
              width: "40%",
              height: 35,
              borderRadius: 17.5,
            }}
            styleText={{
              color: "white",
              fontSize: sizes.verySmallFont,
              fontWeight: "500",
            }}
            onPress={
              state.modals.flow.superSet
                ? () => addItemToSuperSet()
                : () => addItem("exercises")
            }
            text={`Add${totalSelects > 1 ? ` (${totalSelects})` : ""}`}
          />
        </View>
      </View>
    );
  else return <CreateExercise />;
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
