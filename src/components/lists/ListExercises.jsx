import { useState } from "react";
import { react } from "react";
import { StyleSheet } from "react-native";
import { Dimensions, Platform } from "react-native";
import { Button, StatusBar, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { EMPTY_SEARCH_ROUTINES, SOME_ERROR } from "../../constants/texts";
import { GET_EXERCISES } from "../../data/query";
import { useList } from "../../hooks/useListToSelect";
import { TextField } from "../../screens/auth/components/TextField";
import { ContainerSearch } from "../generals/ContainerSearch";
import { OptionsPicker } from "../OptionPicker";

export const ListExercises = ({ nameList, closeModal, stateComponent }) => {
  const {
    dataDone,
    loading,
    error,
    listForSelect,
    updateListForSelect,
    selectOfTheList,
    addItem,
    deleteItem,
  } = useList(
    "exercises",
    true,
    { nameGql: "getExercises", gql: GET_EXERCISES },
    stateComponent
  );

  const { state, setState } = stateComponent;

  const { width } = Dimensions.get("screen");

  const [searchValue, setSearchValue] = useState("");

  const [dataForm, setDataForm] = useState({
    name: "",
    typeEx: null,
    muscleEx: null,
  });

  console.log(dataForm);

  if (!state.modals.createExercise)
    return (
      <View
        style={{
          top: Platform.OS === "ios" ? 35 : StatusBar.currentHeight,
          ...styles.container,
          width:width - 40
        }}
      >
        <View>
          <Text>{nameList}</Text>
          <Button
            title="Nuevo"
            onPress={() =>
              setState({
                ...state,
                modals: { ...state.modals, createExercise: true },
              })
            }
          />
          <Button title="X" onPress={closeModal} />
        </View>
        <ContainerSearch
          data={listForSelect}
          onEmptyData={() => <Text>Empty list</Text>}
          onEmptySearch={() => (
            <Text>
              {EMPTY_SEARCH_ROUTINES}
              {searchValue}
            </Text>
          )}
          onLoading={() => <Text>Cargando</Text>}
          onError={() => <Text>{SOME_ERROR}</Text>}
          loading={loading}
          error={error}
          searchValues={searchValue}
          onChange={searchValue}
          render={(item) => <Text>{item.name}</Text>}
        />
        <Button title="Add" />
      </View>
    );
  else
    return (
      <View
        style={{
          top: Platform.OS === "ios" ? 35 : StatusBar.currentHeight,
          ...styles.container,
          width:width - 40
        }}
      >
        <Text>Crear ejercicio</Text>
        <TextField
          stylesContainer={{ marginHorizontal: 10 }}
          label={"Nombre del ejercicio"}
          placeholder="Ingresa un nombre"
          onChangeText={(text) => setDataForm({ ...dataForm, name: text })}
        />
        <OptionsPicker
          label={"Tipo de ejercicio"}
          placeholder="Selecciona un tipo de ejercicio"
          onValueChange={(value) => setDataForm({ ...dataForm, typeEx: value })}
          value={dataForm.typeEx}
          items={[
            { text: "Peso adicional" },
            { text: "Peso asistido" },
            { text: "Duracion" },
            { text: "Solo rep" },
          ]}
        />
        <OptionsPicker
          label={"Musculo implicado"}
          placeholder="Selecciona el musculo implicado"
          onValueChange={(value) =>
            setDataForm({ ...dataForm, muscleEx: value })
          }
          value={dataForm.muscleEx}
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
        <Button title="Crear" />
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
