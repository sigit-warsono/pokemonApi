import { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";


const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [idUser, setIdUser] = useState("");
 



  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/register", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      window.location.href = "/login";
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const LoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/login", {
        email: email,
        password: password,
      });
      window.location.href = "/";
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const Logout = async () => {
    try {
        await axios.delete('http://localhost:8080/logout');
        window.location.href="/login";
    } catch (error) {
        console.log(error);
    }
}


useEffect(() => {
    refreshToken();
    // getUsers();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:8080/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.firstName);
      setIdUser(decoded.userId);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:8080/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.firstName);
        setIdUser(decoded.userId);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );



  return (
    <UserContext.Provider
      value={{
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
        Register,
        LoginSubmit,
        Logout,
        name,
        idUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
