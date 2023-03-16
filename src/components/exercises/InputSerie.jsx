import React from "react";
import { View } from "react-native";
import { TextField } from "../../screens/auth/components/TextField";

const InputSerie = ({ value, style, onChange, objEx }) => {

let styles = {},
stylesText = {}

styles.backgroundColor = 'silver'
styles.borderWidth = 1.5
styles.borderColor = 'silver'

if(objEx.nameInput === 'other'){
    styles.backgroundColor = 'black',
    styles.borderWidth = 1.5,
    styles.borderColor = 'silver'
    stylesText.color = 'white'
}


  return (
    <View
      style={{
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextField
        stylesInput={{textAlign:'center', ...stylesText}}
        stylesContainerInput={{...style, borderRadius:5, ...styles}}
        value={value ? value : ""}
        placeholder={value ? value : ""}
        onChangeText={(text) => onChange(text, objEx)}
      />
    </View>
  );
};

export { InputSerie };
