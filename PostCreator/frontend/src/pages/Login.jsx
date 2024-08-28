import React, { useContext, useEffect, useState } from 'react'
import InputField from '../components/InputField'
import axios from "axios"
import { toast } from 'sonner';
import { useMyContext } from '../contextAPI';

const Login = () => {
  const {isLogIn, SubmitFormHandler, inputHandler, formData} = useMyContext()

  useEffect(()=>{
    
  },[formData])


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