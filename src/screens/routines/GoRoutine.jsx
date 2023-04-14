import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import { HeaderWithBackButton } from "../../components/generals/HeaderWithBackButton";
import { Loading } from "../../components/Loading";
import { GET_ROUTINE_BY_ID } from "../../data/query";
import { useProgressiveCount } from "../../hooks/useProgressiveCount";

export const GoRoutine = ({ route, navigation }) => {
  const { seg,min,hour } = useProgressiveCount();

  const { data, loading, error } = useQuery(GET_ROUTINE_BY_ID, {
    variables: {
      id: route.params.routineId,
    },
  });

  const [routine, setRoutine] = useState(false);

  console.log(routine)

  useEffect(() => {
    if (!loading && data) {
      setRoutine(data.getRoutineById);
    }
  }, [data, loading]);

  if (loading) return <Loading />;
  else
    return (
      <SafeAreaView
        style={{
          backgroundColor: "white",
        }}
      >
        <StatusBar />
        <View
          style={{
            backgroundColor: "white",
          }}
        >
          <View>
            <Text>{hour}:{min}:{seg}</Text>
          </View>
          <HeaderWithBackButton
            leadingComponent={
              <View>
                <Text>Rutina</Text>
                <Text>{routine.name}</Text>
              </View>
            }
          />
        </View>
      </SafeAreaView>
    );
};
