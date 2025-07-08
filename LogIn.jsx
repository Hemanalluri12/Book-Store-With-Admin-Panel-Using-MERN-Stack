import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {authActions} from "../store/auth";
import {useDispatch} from 'react-redux';
import axios from "axios";


const Login = () => {
  const [Values, setValues] = useState({
      username: "",
      
      password: "",
      
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const change = (e) => {
      const { name,value } = e.target;
      setValues({...Values, [name]: value})
    }
  
    const submit = async () => {
      try{
        if(Values.username === "" ||  Values.password === "" ){
          alert("Please fill all the fields");
        }else{
          const response = await axios.post("http://localhost:1000/api/v1/sign-in", Values);
          dispatch(authActions.login());
          dispatch(authActions.changeRole(response.data.role));
          localStorage.setItem("id",response.data.id);
          localStorage.setItem("token",response.data.token);
          localStorage.setItem("role",response.data.role);
          navigate("/profile");
        }
      }catch(error){
        alert(error.response.data.message);
      }
    }
  return (
    <div className='h-auto min-h-screen bg-zinc-900 px-12 py-8 flex flex-col items-center justify-center text-white'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6 shadow-md'>
        <p className='text-zinc-200 text-2xl font-semibold mb-6'>Login</p>

        {/* Username */}
        <div className='mt-4'>
          <label className='text-zinc-400'>Username</label>
          <input
            type='text'
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded'
            placeholder='username'
            name='username'
            required
            value={Values.username}
            onChange={change}
          />
        </div>

        {/* Password */}
        <div className='mt-4'>
          <label className='text-zinc-400'>Password</label>
          <input
            type='password'
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded'
            placeholder='password'
            name='password'
            required
             value={Values.password}
            onChange={change}
          />
        </div>

        {/* Login Button */}
        <div className='mt-6'>
          <button className='w-full bg-blue-500 hover:bg-blue-600 transition duration-200 text-white font-semibold py-2 rounded ' onClick={submit}>
            LogIn
          </button>
        </div>

        {/* Or sign up */}
        <div className='mt-4 text-center text-zinc-400 text-sm'>
          Or
        </div>
        <div className='text-center mt-1'>
          <span className='text-zinc-400'>Don’t have an account? </span>
          <Link to="/signup" className='text-blue-400 hover:underline'>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
