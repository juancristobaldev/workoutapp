import { useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
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
import { Ionicons } from "@expo/vector-icons";
import { EmptyPage } from "../../svg/Empty";
import { FirstExercise, FirstExercisePage } from "../exercises/FirstExercise";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_EXERCISE } from "../../data/mutations";
import { Loading } from "../Loading";

export const ListExercises = ({ closeModal, stateComponent }) => {
  const {
    totalSelects,
    loading,
    error,
    listForSelect,
    listSelected,
    selectItem,
    addItem,
    updateListForSelect,
  } = useList(
    "flow",
    true,
    { nameGql: "getExercises", gql: GET_EXERCISES },
    stateComponent
  );

  const [deleteExercise, { loading: deleteLoading }] = useMutation(
    DELETE_EXERCISE,
    {
      async update(cache, { data: { deleteExercise } }) {
        const { getExercises } = cache.readQuery({ query: GET_EXERCISES });

        const idsDelete = JSON.parse(deleteExercise.exercises);

        const filtedList = await getExercises
          .filter((exercise) => !idsDelete.includes(exercise.id))
          .map((item) => {
            return {
              ...item,
              select: false,
              added: false,
            };
          });

        cache.writeQuery({
          query: GET_EXERCISES,
          data: { getExercises: [...filtedList] },
        });
      },
      onCompleted() {
        console.log("ready");
      },
      onError(error) {
        console.log(error);
      },
    }
  );

  const { state, setState } = stateComponent;

  const [layoutView, setLayoutView] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

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
        isSuperSet: true,
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

  const onLayout = (event) => {
    const { x, y, width, height: heightV } = event.nativeEvent.layout;
    setLayoutView({
      x: x,
      y: y,
      width: width,
      height: heightV,
    });
  };

  const onDelete = async () => {
    await setState({ ...state, loading: true });

    const idsList = listSelected.map((item) => item.id);

    await deleteExercise({
      variables: {
        input: {
          ids: JSON.stringify(idsList),
        },
      },
    });
  };

  useEffect(() => {
    if (state.modals.createExercise) {
      setSearchValue("");
    }
    if (loading || deleteLoading) {
      setState({ ...state, loading: true });
    } else {
      setState({ ...state, loading: false });
    }
  }, [state.modals.createExercise, loading, deleteLoading]);

  const { width, height } = Dimensions.get("screen");

  const [searchValue, setSearchValue] = useState("");

  if (!state.modals.createExercise) {
    return (
      <>
        {state.loading ? (
          <Loading />
        ) : (
          <View
            onLayout={onLayout}
            style={{
              top:
                Platform.OS === "ios"
                  ? 35 + (height - layoutView.height) / 2.5
                  : StatusBar.currentHeight,
              ...styles.container,
              width: width - 40,
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
                {totalSelects > 0 && (
                  <TouchableOpacity
                    onPress={() => onDelete()}
                    style={{
                      backgroundColor: "#F7F7F7",
                      padding: 7.5,
                      marginRight: 10,
                      borderRadius: 7.5,
                    }}
                  >
                    <Ionicons size={20} name="trash" />
                  </TouchableOpacity>
                )}
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
                  onPress={() =>
                    setState({
                      ...state,
                      modals: {
                        ...state.modals,
                        flow: { isOpen: false, superSet: false, indexs: null },
                      },
                    })
                  }
                >
                  <Ionicons name="close" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <ContainerSearch
              data={listForSelect}
              onEmptyData={() => <FirstExercisePage />}
              placeholderSearch={"Buscar ejercicios..."}
              onEmptySearch={() => <EmptyPage searchValue={searchValue} />}
              onLoading={() => (
                <ActivityIndicator size={"large"} color={"black"} />
              )}
              onError={() => <Text>{SOME_ERROR}</Text>}
              loading={loading || deleteLoading}
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
                    checked={item.select}
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
              {listForSelect.filter((item) => item.select === true).length >=
                2 &&
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
        )}
      </>
    );
  } else return <CreateExercise stateComponent={stateComponent} />;
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
