import React, { useContext, useEffect, useState } from 'react'
import InputField from '../components/InputField'
import axios from "axios"
import { toast } from 'sonner';
import { useMyContext } from '../contextAPI';

const Login = () => {
  const {isLogIn, setLoginHandler} = useMyContext()

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

  useEffect(()=>{
    
  },[formData])

  const SubmitFormHandler = async(e)=>{
      e.preventDefault();
      
      const data = await axios.post("/api/login",{...formData})
      const user = data.data.user;      
      const message = data.data.message
      const token = data.data.token

      console.log(data);
      
      if(!user){
        toast.error(message,{
          position:"top-center"
        })
      }
      setLoginHandler(token)
      setFormData({
        email:"",
        password:""
      })
  }

  return (
    <div className='h-screen w-full flex justify-center items-center'>
         <div className='w-2/6 p-5 border-[1px] rounded-md'>
         <div className='w-max m-auto text-lg font-bold'>Login</div>
         <form>
              <InputField type="text" name="email" value={formData.email} placeholder="Enter email" inputHandler={inputHandler}/>
              <InputField type="password" name="password" value={formData.password} placeholder="Enter password" inputHandler={inputHandler}/>
              <button className='mt-3 px-2 py-1 bg-blue-600 text-white rounded-md' onClick={SubmitFormHandler}>Submit</button>
         </form>
            <div className='mt-6'>
                Not a user? <a href="/register" className='border-b'>Register</a>
            </div>
         </div>
    </div>
  )
}

export default Login