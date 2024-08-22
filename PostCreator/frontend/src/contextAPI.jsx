import React, { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext();

export function useMyContext(){
   return useContext(AppContext)
}

export const ContextAPI = ({children}) => {
  const val = localStorage.getItem("token")
  const [isLogIn, setIsLogIn] = useState(val) 
  
  const setLoginHandler=(token)=>{
    localStorage.setItem("token",token)
    setIsLogIn(val)
  }

  useEffect(()=>{
    const val = localStorage.getItem("token")
    setIsLogIn(val)
  },[])

  const isAutheticated = ()=>{
    return isLogIn
  }
  
  return (
    <AppContext.Provider value={{isLogIn, setLoginHandler, isAutheticated}}>
        {children}
    </AppContext.Provider>
  )
}
