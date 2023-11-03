import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    msg,
    setMsg,
    Register
  } = useContext(UserContext);

  const navigate = useNavigate();




  return (
    <div className="bg-yellow-100 h-[100vh] flex justify-center items-center">
      <div className="box w-[30%] h-[40rem] bg-white rounded-[2%] pt-8">
        <div className="w-full flex justify-center items-center flex-col gap-5">
          <span className="text-[2rem] font-bold text-yellow-500">
            Register User
          </span>
          <form className="flex flex-col items-center gap-5 w-full" onSubmit={Register}>
            <input
              type="text"
              className="p-3 border border-opacity-95 w-[70%] rounded-[10px]"
              placeholder="First Name"
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              className="p-3 border border-opacity-95 w-[70%] rounded-[10px]"
              placeholder="Last Name"
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
              required
            />
            <input
              type="text"
              className="p-3 border border-opacity-95 w-[70%] rounded-[10px]"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="p-3 border border-opacity-95 w-[70%] rounded-[10px]"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
            <button className="p-2 bg-yellow-500 rounded-[9px] text-white w-[50%]">
              Submit
            </button>
            <div className="p-2 bg-white rounded-[9px] border border-opacity-95 text-black w-[70%] flex justify-center gap-1">
              <span>Already a user? </span>
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Log In
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
