import React from "react";
import { View } from "react-native";
import { CustomCheckBox } from "../generals/CheckBox";
import { InputSerie } from "./InputSerie";

const TypeSerie = ({
  exercise,
  serie,
  setDataRoutine,
  indexSerie,
  indexExercise,
  indexCycle
}) => {
  const { type } = exercise;

  return (
    <View
      style={{
        width: type === 'Duracion' || type === 'Solo rep' ? '50%' : "50%",
        paddingHorizontal:7.5,
        flexDirection: "row",
        alignSelf:'center',
        justifyContent:'center'
      }}
    >
      {type !== "Duracion" ? (
        <>
          {type !== "Solo rep" && (
            <InputSerie
              value={serie.other}
              style={{ width: "90%", padding: 5 }}
              objEx={{
                nameInput: "other",
                idList: indexExercise,
                serie: indexSerie,
                indexCycle: indexCycle
              }}
              onChange={setDataRoutine}
            />
          )}
          <InputSerie
            value={serie.reps}
            style={{ width: type !== "Solo rep" ? "90%" : "90%", padding: 5 }}
            objEx={{
              nameInput: "reps",
              idList: indexExercise,
              serie: indexSerie,
              indexCycle: indexCycle
            }}
            onChange={setDataRoutine}
          />
        </>
      ) : (
        <InputSerie
          type={type}
          value={serie.time}
          style={{ width: "90%", padding: 5 }}
          objEx={{
            nameInput: "time",
            idList: indexExercise,
            serie: indexSerie,
            indexCycle: indexCycle
          }}
          onChange={setDataRoutine}
        />
      )}
    </View>
  );
};

export { TypeSerie };
