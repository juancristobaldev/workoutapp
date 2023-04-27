import React from "react";

const useSeries = (objectList) => {
  const { state, setState } = objectList;

  const addSerie = (indexExercise, indexItem) => {
    console.log(indexExercise, indexItem);

    const exercises = [...state.dataFormCreate.flow];

    let series;

    if (indexItem !== undefined)
      series = exercises[indexExercise].cycle[indexItem].series;
    else series = exercises[indexExercise].series;

    const serie = {
      reps: 0,
      checked: false,
    };

    series.push(serie);

    setState({
      ...state,
      dataFormCreate: { ...state.dataFormCreate, flow: exercises },
    });
  };

  const checkSerie = async (serie, item) => {
    const newList = [...state.listOnCreate];
    const itemExercise = newList.find(
      (exercise) => exercise.idList === item.idList
    );
    const indexSerie = itemExercise.seriesEx.findIndex(
      (item) => item.idSerie === serie.idSerie
    );

    if (itemExercise.seriesEx[indexSerie].checked === false)
      itemExercise.seriesEx[indexSerie].checked = true;
    else itemExercise.seriesEx[indexSerie].checked = false;

    setState({ ...state, listOnCreate: newList });
  };

  const deleteSeries = async (indexSerie, indexExercise, indexCycle) => {
    const newListExercise = [...state.dataFormCreate.flow];


    if (indexCycle !== undefined)
      newListExercise[indexExercise].cycle[indexCycle].series.splice(
        indexSerie,
        1
      );
    else newListExercise[indexExercise].series.splice(indexSerie, 1);

    setState({
      ...state,
      dataFormCreate: { ...state.dataFormCreate, flow: newListExercise },
    });
  };

  return {
    checkSerie,
    addSerie,
    deleteSeries,
  };
};

export { useSeries };
