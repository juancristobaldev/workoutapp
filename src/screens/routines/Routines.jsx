import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { ContainerSearch } from "../../components/generals/ContainerSearch";
import { ButtonGeneral } from "../../components/generals/CustomButton";
import { HeaderWithBackButton } from "../../components/generals/HeaderWithBackButton";

import { Loading } from "../../components/Loading";

import {
  EMPTY_LIST_ROUTINES,
  EMPTY_SEARCH,
  EMPTY_SEARCH_ROUTINES,
  SOME_ERROR,
  TITLE_YOUR_ROUTINES,
} from "../../constants/texts";

import * as sizes from "../../constants/sizes";

import { TextField } from "../auth/components/TextField";
import { FirstRoutine, FirstRoutinePage } from "./icons/FirstRoutine";
import { RoutinesContext } from "../../context/RoutinesContext";
import { Empty, EmptyPage } from "../../svg/Empty";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect } from "react";
import { GET_ROUTINES } from "../../data/query";
import { useQuery } from "@apollo/client";
import { useRef } from "react";
import { RoutineBox } from "./RoutineBox";

export const Routines = ({ navigation, route }) => {

  const { data, loading, error } = useQuery(GET_ROUTINES);
  const [listRoutines, setListRoutines] = useState([]);

  const [searchValue, setSearchValue] = useState("");


  useEffect(() => {
    if(data && !loading){
      setListRoutines(data.getRoutines)
    }
  },[data,loading])
  

  if (loading) {
    return <Loading />;
  } else {

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar />
        <View style={styles.mainContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 40,
              marginLeft: 20,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: sizes.mediumFont,
                fontWeight: "bold",
              }}
            >
              {TITLE_YOUR_ROUTINES}
            </Text>
          </View>
          <ContainerSearch
            placeholderSearch={"Buscar rutinas..."}
            styleScrollView={{
              marginVertical: 20,
            }}
            data={listRoutines}
            loading={loading}
            error={error}
            onError={() => <Text>{SOME_ERROR}</Text>}
            onLoading={() => <Text>Cargando...</Text>}
            onEmptyData={() => <FirstRoutinePage />}
            onEmptySearch={() => <EmptyPage searchValue={searchValue} />}
            searchValues={searchValue}
            onChange={setSearchValue}
            render={(item, index) => (
              <RoutineBox key={index} item={item} index={index} navigation={navigation}/>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
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
