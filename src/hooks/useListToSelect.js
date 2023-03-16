import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const useList = (nameContent, repeat, apollo, stateComponent) => {
  const { nameGql, gql } = apollo;
  const { data, loading, error } = useQuery(gql);
  const { state, setState } = stateComponent;

  const [listForSelect, updateListForSelect] = useState([]);
  const [dataDone, updateDataDone] = useState([]);
  const [listSelected, updateListSelected] = useState([]);

  console.log(listSelected);

  const totalSelects = listForSelect.filter(
    (item) => item.select === true
  ).length;

  const getItems = async () => {
    if (data) {
      let dataBack = [...JSON.parse(JSON.stringify(data[nameGql]))];

      await dataBack.forEach((item) => {
        const itemsSelected = listForSelect.filter(
          (item) => item.select === true
        );
        const index = itemsSelected.findIndex(
          (itemSelected) => itemSelected.id === item.id
        );
        if (listForSelect.length && itemsSelected.length && index >= 0)
          item["select"] = true;
        else item["select"] = false;
        item["added"] = false;
      });

      if (!repeat) {
        const idsData = [];
        if (state.dataFormCreate[nameContent].length > 0) {
          await state.dataFormCreate[nameContent].forEach((item) => {
            idsData.push(item.id);
          });
          for (var i = 0; i < idsData.length; i++) {
            const index = dataBack.findIndex((item) => item.id === idsData[i]);
            dataBack.splice(index, 1);
          }
        }
      }

      updateListForSelect(dataBack);
      updateDataDone([...JSON.parse(JSON.stringify(data[nameGql]))]);
    }
  };

  const selectItem = async (id) => {
    let newList = [...listForSelect],
      newListSelected = [...listSelected];

    const itemSelected = listForSelect.find((item) => item.id === id);

    const isExist = newListSelected.find((item) => item.id === id);

    newList.forEach((item) => {
      if (item.id === id) {
        if (item.select) item.select = false;
        else item.select = true;
      }
    });

    if (isExist) {
      const index = newListSelected.findIndex((item) => item.id === id);

      newListSelected.splice(index, 1);
    } else newListSelected.push(itemSelected);

    await updateListSelected(newListSelected);
    updateListForSelect(newList);
  };

  const addItem = async (type) => {
    const newList = [...state.dataFormCreate[nameContent]];

    if (listSelected.length > 0) {
      await listSelected.forEach((item) => {
        if (type === "exercises") {
          item.series = JSON.parse(item.series);
        }
        item.select = false;
        newList.push(item);
      });

      setState({
        ...state,
        modals: {
          ...state.modals,
          [nameContent]: { isOpen: false, superSet: false, indexs: null },
        },
        dataFormCreate: { ...state.dataFormCreate, [nameContent]: newList },
      });
    }
  };

  const deleteItem = (indexExercise,indexCycle) => {
    const newFormCreate = { ...state.dataFormCreate };

    if(indexCycle !== undefined) newFormCreate[nameContent][indexExercise].cycle.splice(indexCycle,1)
    else newFormCreate[nameContent].splice(indexExercise, 1);

    setState({
      ...state,
      dataFormCreate: newFormCreate,
    });
  };

  useEffect(() => {
    getItems();
  }, [
    data,
    state.dataFormCreate[nameContent],
    state.searchValue,
    state.listOnCreate,
  ]);

  return {
    dataDone,
    loading,
    error,
    listSelected,
    listForSelect,
    totalSelects,
    updateListForSelect,
    selectItem,
    addItem,
    deleteItem,
  };
};

export { useList };
