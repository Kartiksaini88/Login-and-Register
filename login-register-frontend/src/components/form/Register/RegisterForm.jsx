import React, { useState } from "react";
import "../Register/Form.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";


const RegisterForm = () => {
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [type, setType] = useState(true);
  const navigate = useNavigate()
  const notifySuccess = (mssg) => {
    toast.success(mssg,{
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  }
  const notifyError = (mssg) => {
    toast.error(mssg,{
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  }
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };
 
  const handleSubmit = (e)=>{
    e.preventDefault()

    setShow(false)
    setType(true)
    if(data!=={}){
        axios.post('https://super-slip-goat.cyclic.app/register',data)
        .then((res)=>handleToast(res.data.message))
        .catch((error)=>notifyError(error))
    }
  }

  const handleToast = (ping)=>{
    if(ping === 'Sucessfully Registered'){
        notifySuccess(ping)
        setTimeout(()=>{
          navigate("/login")
        },4000)
       
    }else{
        notifyError(ping)
    }
    
  }

  const handleVisibiltyPassword = () => {
    setShow(!show);
    setType(!type);
  };

  return (
    <div className="container">
        <ToastContainer></ToastContainer>
      <form className="formregister" onSubmit={handleSubmit}>
        <div className="title">Welcome</div>
        <div className="subtitle">Let's create your account!</div>
        <div className="input-container ic1">
          <input
            required={true}
            onChange={handleChange}
            className="input"
            name="name"
            type="text"
            placeholder=" "
          />
          <div className="cut"></div>
          <label htmlFor="Name" className="placeholder">
            Name
          </label>
        </div>
        <div className="input-container ic2">
          <input
            required={true}
            onChange={handleChange}
            className="input"
            name="email"
            type="email"
            placeholder=" "
          />
          <div className="cut"></div>
          <label htmlFor="Email" className="placeholder">
            Email
          </label>
        </div>
        <div className="input-container ic2">
          <input
            required={true}
            onChange={handleChange}
            className="input"
            name="password"
            type={type ? "password" : "text"}
            placeholder=" "
          />
          <div className="cut cut-short"></div>
          <label htmlFor="password" className="placeholder">
            Password
          </label>
          {show ? (
            <AiFillEye
              style={{
                fontSize: 23,
                color: "white",
                cursor:"pointer",
                marginTop:7
              }}
              onClick={handleVisibiltyPassword}
            ></AiFillEye>
          ) : (
            <AiFillEyeInvisible
              style={{
                color: "white",
                fontSize: 23,
                cursor:"pointer",
                marginTop:7
              }}
              onClick={handleVisibiltyPassword}
            ></AiFillEyeInvisible>
          )}
        </div>
        <input type="submit" className="register" value={"Register"} />
        <p className="or">━ or ━</p>
        <button type="submit" className="login" onClick={()=>navigate('/login')}>Login</button>
      </form>
    </div>
  );
};

export default RegisterForm;
