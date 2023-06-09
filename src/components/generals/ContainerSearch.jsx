import React, { useEffect, useState } from "react";
import { TextField } from "../../screens/auth/components/TextField";
import { ListApi } from "../ListApi";

const ContainerSearch = ({
  placeholderSearch,
  styleScrollView,
  onEmptySearch,
  searchValues,
  error,
  loading,
  data,
  onError,
  onLoading,
  onEmptyData,
  render,
  children,
  onChange,
}) => {
  const [dataSearch, updateDataSearch] = useState([]);

  const searchExercise = () => {
    if (data) {
      const newData = [...data];
      if (!searchValues.length >= 1) updateDataSearch(newData);
      else {
        let newList = [];
        newData.forEach((item) => {
          const nameItem = item.name.toLowerCase(),
            searchItem = searchValues.toLowerCase();
          if (nameItem.includes(searchItem)) newList.push(item);
        });
        updateDataSearch(newList);
      }
    }
  };

  useEffect(() => {
    searchExercise();
  }, [searchValues, data]);

  return (
    <>
      <TextField
        placeholder={placeholderSearch}
        onChangeText={(text) => onChange(text)}
        style={{ marginHorizontal: 20,marginBottom:20 }}
        stylesContainerInput={{ height: 40, borderRadius: 5 }}
        trailedIcon={"search"}
      />
      <ListApi
        styleScrollView={styleScrollView}
        children={children}
        searchContents={dataSearch}
        data={data}
        error={error}
        loading={loading}
        onError={onError}
        onLoading={onLoading}
        onEmpty={onEmptyData}
        onEmptySearch={onEmptySearch}
        render={render}
      />
    </>
  );
};

export { ContainerSearch };
