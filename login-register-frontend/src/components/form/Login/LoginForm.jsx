import React, { useState } from "react";
import "./Login.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";


const LoginForm = () => {
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
        axios.post('https://super-slip-goat.cyclic.app/login',data)
        .then((res)=>handleToast(res.data))
        .catch((error)=>notifyError(error))
    }
  }

  const handleToast = (ping) => {
    if (ping.message === "Password doesn't match") {
      notifySuccess("Password doesn't match");
    } else if (ping.message === "Login Successfull") {
      notifySuccess("Login Successfull!");
    } else if (ping.message === "User not found") {
      notifyError("User not found");
    } else {
      notifyError("User not found");
    }
  };
  const handleVisibiltyPassword = () => {
    setShow(!show);
    setType(!type);
  };

  return (
    <div className="container">
        <ToastContainer></ToastContainer>
      <form className="formlogin" onSubmit={handleSubmit}>
        <div className="title">Welcome</div>
        <div className="subtitle">Login-In To Your Account</div>
        <div className="input-container ic2">
          <input
            required={true}
            onChange={handleChange}
            className="input"
            name="email"
            type="email"
            placeholder=" "
            value={data.email}
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
            value={data.password}
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
        <input type="submit" className="register" value={"Login"} />
        <p className="or">━ or ━</p>
        <button  className="login" onClick={()=>navigate('/register')}>Register</button>
      </form>
    </div>
  );
};

export default LoginForm;
