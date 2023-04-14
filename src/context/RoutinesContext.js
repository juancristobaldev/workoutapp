import { useQuery } from "@apollo/client";
import React, { createContext, useEffect, useState } from "react";
import { GET_ROUTINES } from "../data/query";

export const RoutinesContext = createContext();

export const RoutinesProvider = ({children}) => {

    const {data,loading,error} = useQuery(GET_ROUTINES)

    const [routines,setRoutines] = useState(false);

    
    useEffect(() => {
        if(!loading && data){
            setRoutines(data.getRoutines)
            console.log('routines:',data.getRoutines)
        }
    },[data,loading,error])

    

    return (
        <RoutinesContext.Provider value={{
            routines,
            loading,
            error
        }}>
            {children}
        </RoutinesContext.Provider>
    )
}