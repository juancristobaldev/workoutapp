import { useQuery } from "@apollo/client";
import React, { createContext, useEffect, useState } from "react";
import { GET_ROUTINES_FOLDERS_USER_BY_TOKEN } from "../data/query";

export const DataContext = createContext();

export const DataProvider = ({children}) => {

    const {data,loading,error} = useQuery(GET_ROUTINES_FOLDERS_USER_BY_TOKEN)

    const [me,setMe] = useState({})
    const [folders,setFolders] = useState([])
    const [routines,setRoutines] = useState([])

    console.log('data:',data)


    useEffect(() => {
        console.log(loading)
        if(!loading){
            if(error) console.log(error)
            if(data) {
                setMe(data.getUser)
                setFolders(data.getFolders)
                setRoutines(data.getRoutines)
            }
        }
    },[loading])

    return (
        <DataContext.Provider
        value={{
            me,
            folders,
            routines,
            loading
        }}
        >
            {children}
        </DataContext.Provider>
    )
}