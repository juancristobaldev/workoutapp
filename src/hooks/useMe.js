import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_USER } from "../data/query";

export const useMe = () => {
  const { data, loading, error } = useQuery(GET_USER);

  const [me, setMe] = useState({});

  useEffect(() => {
    if (data && !loading) {
      setMe(data.getUser);
    }
  }, [data, loading, error]);

  return {
    me,
    loading,
    error,
  };
};
