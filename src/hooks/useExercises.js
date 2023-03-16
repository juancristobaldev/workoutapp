import React, { useEffect, useState } from "react";
import { CREATE_EXERCISE, DELETE_EXERCISE } from "../data/mutations";
import { useMutation } from "@apollo/client";
import { GET_EXERCISES } from "../data/query";
import { useFormik } from "formik";

import * as Yup from "yup";

const useExercises = (objState) => {
  const { state, setState } = objState;

  const [statusLoading, setStatusLoading] = useState;

  const [createExercise, { loading: loadingCreate }] =
    useMutation(CREATE_EXERCISE);
  const [deleteExercise, { loading: loadingDelete }] =
    useMutation(DELETE_EXERCISE);

  const {
    values,
    handleSubmit,
    setFieldValue,
    errors,
    setFieldTouched,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      type: "Peso adicional",
      muscle: "Espalda",
    },
    onSubmit: async (values) => {
      await createExercise({
        variables: {
          input: {
            ...values,
            series: JSON.stringify([]),
          },
        },
        refetchQueries: [
          {
            query: GET_EXERCISES,
          },
        ],
      })
        .then(async ({ data }) => {
          const { success, errors, token } = data.createExercise;

          if (success) console.log("success");
          else {
            console.log(errors);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(4, "El nombre debe contener al menos 4 caracteres")
        .max(50, "Nombre demasiado largo")
        .required("Nombre obligatorio"),
      type: Yup.string().required("Tipo de ejercicio obligatorio"),
    }),
  });

  const deleteSomeExercise = async (confirmation) => {


    if (filter.length > 0 || confirmation) {
      if (filter.length === 0) filter = [...stateValue.modalDelete.items];

      if (confirmation) {
        filter.forEach(async (item) => {
          await deleteExercise({
            variables: {
              input: {
                id: item.id,
              },
            },
            refetchQueries: [
              {
                query: GET_EXERCISES_BY_TOKEN,
              },
            ],
          }).then(async ({ data }) => {
            const { errors, success } = data.deleteExercise;

            if (errors) console.log(errors);
            if (success) console.log("Ejercicio/s eliminados correctamente");

            setState({
              ...stateValue,
              modal: true,
              modalDelete: { boolean: false, items: [] },
            });
          });
        });
      } 
    }
  };

  useEffect(() => {
    setErrors({});
    if (loadingCreate == true || loadingDelete == true) setStatusLoading(true);
    else if (
      loadingCreate == false &&
      loadingDelete == false &&
      statusLoading == true
    )
      setStatusLoading(false);
  }, [
    dataFormCreateExercise,
    stateValue.modal,
    stateValue.modalCreate,
    loadingDelete,
    loadingCreate,
  ]);

  return {
    createNewExercise,
    deleteSomeExercise,
    values,
    handleSubmit,
    setFieldValue,
    errors,
    setFieldTouched,
    touched,
    handleChange,
    errors,
    setErrors,
    loadingStatus,
  };
};

export { useExercises };
