import React, { useContext, useState } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { ContainerSearch } from "../../components/generals/ContainerSearch";
import { HeaderWithBackButton } from "../../components/generals/HeaderWithBackButton";
import { ListApi } from "../../components/ListApi";

import { Loading } from "../../components/Loading";
import { TabMenu } from "../../components/TabMenu";
import {
  EMPTY_LIST_ROUTINES,
  EMPTY_SEARCH_ROUTINES,
  SOME_ERROR,
  TITLE_YOUR_ROUTINES,
} from "../../constants/texts";
import { DataContext } from "../../context/DataProvider";

import { TextField } from "../auth/components/TextField";

export const Routines = ({ navigation, route }) => {
  const { me, loading, routines, error } = useContext(DataContext);

  const [searchValue, setSearchValue] = useState("");

  const array = [
    {name:'item 1'},
    {name:'item 2'},
    {name:'item 3'},
  ]

  if (loading) {
    return <Loading />;
  } else {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar />
        <View style={styles.mainContainer}>
          <HeaderWithBackButton
            leadingComponent={<Text>{TITLE_YOUR_ROUTINES}</Text>}
          />
          <ContainerSearch
            data={array}
            loading={loading}
            error={error}
            onError={() => <Text>{SOME_ERROR}</Text>}
            onLoading={() => <Text>Cargando...</Text>}
            onEmptyData={() => <Text>{EMPTY_LIST_ROUTINES}</Text>}
            searchValues={searchValue}
            onChange={setSearchValue}
            onEmptySearch={() => (
              <Text>
                {EMPTY_SEARCH_ROUTINES} {searchValue}
              </Text>
            )}
            render={(item) => <Text>{item.name}</Text>}
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
