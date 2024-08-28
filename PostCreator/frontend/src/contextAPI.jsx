import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';

const AppContext = createContext();

export function useMyContext(){
   return useContext(AppContext)
}

export const ContextAPI = ({children}) => {
  const [isLogIn, setIsLogIn] = useState() 
  const [loggesInUser, setLoggedInUser] = useState()

  const [formData, setFormData] = useState({
    email:"",
    password:""
  })

  const inputHandler = (e)=>{
    const obj = {}
    obj[e.target.name] = e.target.value

    let updatedFormData = {...formData, ...obj}
    setFormData(updatedFormData)
}
  
  const SubmitFormHandler = async(e)=>{
    e.preventDefault();
    
    const data = await axios.post("/api/login",{...formData})
    const user = data.data.user;      
    const message = data.data.message
    const token = data.data.token
    
    if(!user){
      setIsLogIn(false)
      toast.error(message,{
        position:"top-center"
      })
    }
    setIsLogIn(true)
    setFormData({
      email:"",
      password:""
    })
}

// logout

const handleLogout = async (e) => {
  e.preventDefault();
  try {
    const data = await axios.get("/api/logOut");
    toast.success(data.data.message);
    setIsLogIn(false)
  } catch (error) {
    toast.error(error);
  }
};

  useEffect(()=>{   
    const getProfile = async()=>{

      const val = await axios.get("/api/getProfile")
      if(!val){
        handleLogout()
      }else{
        setIsLogIn(true)
        setLoggedInUser(val)
      }
      console.log("val",val);
    } 
    getProfile()
  },[])
  
  return (
    <AppContext.Provider value={{isLogIn,setIsLogIn, SubmitFormHandler, formData,inputHandler, handleLogout, loggesInUser, setLoggedInUser}}>
        {children}
    </AppContext.Provider>
  )
}
