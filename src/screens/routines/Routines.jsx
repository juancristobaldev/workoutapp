import React, { useState } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { ContainerSearch } from "../../components/generals/ContainerSearch";
import { Loading } from "../../components/Loading";

import { SOME_ERROR, TITLE_YOUR_ROUTINES } from "../../constants/texts";

import { FirstRoutinePage } from "./icons/FirstRoutine";
import { EmptyPage } from "../../svg/Empty";
import { useEffect } from "react";
import { GET_ROUTINES } from "../../data/query";
import { useQuery } from "@apollo/client";
import { RoutineBox } from "./RoutineBox";

import * as sizes from "../../constants/sizes";
import { SafeAreaViewWithTabMenu } from "../SafeAreaViewWithTabMenu";

export const Routines = ({ navigation, route, hiddeTab }) => {
  const { data, loading: loadingGet, error } = useQuery(GET_ROUTINES);
  const [listRoutines, setListRoutines] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (data && !loadingGet) {
      setListRoutines(data.getRoutines);
    }
  }, [data, loadingGet, route]);

  if (loadingGet) {
    return <Loading />;
  } else {
    return (
      <SafeAreaViewWithTabMenu
        navigation={navigation}
        route={route}
        style={styles.safeArea}
      >
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
            loading={loadingGet}
            error={error}
            onError={() => <Text>{SOME_ERROR}</Text>}
            onLoading={() => <Text>Cargando...</Text>}
            onEmptyData={() => <FirstRoutinePage />}
            onEmptySearch={() => <EmptyPage searchValue={searchValue} />}
            searchValues={searchValue}
            onChange={setSearchValue}
            render={(item, index) => (
              <RoutineBox
                object={route.params.object}
                key={index}
                item={item}
                index={index}
                navigation={navigation}
              />
            )}
          />
        </View>
      </SafeAreaViewWithTabMenu>
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
