import React, { useEffect, useState } from 'react'
import InputField from '../components/InputField'
import axios from 'axios'
import { useMyContext } from '../contextAPI'
import { toast } from 'sonner'

const Register = () => {
  const {isLogIn, setIsLogIn, setLoggedInUser} = useMyContext()
  console.log( isLogIn);
  const [formData, setFormData] = useState({
    name:"",
    username:"",
    email:"",
    password:""
  })

  const inputHandler = (e)=>{
    const obj = {}
    obj[e.target.name] = e.target.value

    let updatedFormData = {...formData, ...obj}
    setFormData(updatedFormData)
}

useEffect(()=>{

},[formData])

const SubmitFormHandler = async(e)=>{
    e.preventDefault();
    const data = await axios.post("/api/register",{...formData})
    const user = data.data.user;
    const message = data.data.message
    const token = data.data.token
      
      if(!user){
        toast.error(message,{
          position:"top-center"
        })
      }
    setLoggedInUser(user) 
    
    setIsLogIn(true)
      setFormData({
        name:"",
        username:"",
        email:"",
        password:""
      })
}

  return (
    <div className='h-screen w-full flex justify-center items-center'>
    <div className='w-2/6 p-5 border-[1px] rounded-md'>
    <div className='w-max m-auto text-lg font-bold'>Register</div>
    <form>
         <InputField type="text" name="name" value={formData.name} placeholder="Enter name" inputHandler={inputHandler}/>
         <InputField type="text" name="username" value={formData.username} placeholder="Enter username" inputHandler={inputHandler}/>
         <InputField type="text" name="email" value={formData.email} placeholder="Enter email" inputHandler={inputHandler}/>
         <InputField type="password" name="password" value={formData.password} placeholder="Enter password" inputHandler={inputHandler}/>
         <button className='mt-3 px-2 py-1 bg-blue-600 text-white rounded-md' onClick={SubmitFormHandler}>Submit</button>
    </form>
       <div className='mt-6'>
           Already a user? <a href="/login" className='border-b'>Login</a>
       </div>
    </div>
</div>
  )
}

export default Register