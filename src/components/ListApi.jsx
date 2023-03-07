import React from "react";
import { ScrollView, View } from "react-native";

export const ListApi = (props) => {
  
  return (
    <ScrollView
    >
      {props.error && props.onError()}
      {props.loading && props.onLoading()}
      {!props.loading && !props.data.length && props.onEmpty()}
      {props.searchContents &&
        props.data.length > 0 &&
        props.searchContents.length === 0 &&
        props.onEmptySearch()}
      {props.searchContents
        ? props.searchContents === undefined
          ? [].map(props.render)
          : props.searchContents.map(props.render)
        : props.data === undefined
        ? [].map(props.render)
        : props.data.map(props.render)}
      {props.children}
    </ScrollView>
  );
}

