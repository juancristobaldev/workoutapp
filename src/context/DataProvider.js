import { useQuery } from "@apollo/client";
import React, { createContext, useEffect, useState } from "react";
import { GET_ME, GET_ROUTINES_FOLDERS_USER_BY_TOKEN } from "../data/query";

export const DataContext = createContext();

export const DataProvider = ({children}) => {

    const {data,loading,error} = useQuery(GET_ME)

    const [me,setMe] = useState({})
    const [folders,setFolders] = useState([])
    const [routines,setRoutines] = useState([])
    const [exercises,setExercises] = useState([])



    useEffect(() => {
        if(!loading){
            if(error) console.log(error)
            if(data) {

                const me = {...data.getUser}
                delete me.exercises
                delete me.routines
                delete me.folders

                setMe(me)
                setFolders(data.getUser.folders)
                setRoutines(data.getUser.routines)
                setExercises(data.getUser.exercises)
            }
        }
    },[loading])

    return (
        <DataContext.Provider
        value={{
            me,
            folders,
            routines,
            exercises,
            data,
            loading,
            error
        }}
        >
            {children}
        </DataContext.Provider>
    )
}