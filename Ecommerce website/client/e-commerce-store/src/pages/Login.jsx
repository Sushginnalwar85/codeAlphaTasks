import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken,navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token)
        }else{
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {email, password})
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token)
        }else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])
  
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800 "
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800 "
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800 "
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>
      <button
        type="submit"
        className="bg-black text-white font-light px-8 py-2 mt-4 "
      >
        {currentState === "Login" ? "Log In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;


// import React, { useState } from 'react';

// const Login = () => {
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleRememberMeChange = () => {
//     setRememberMe(!rememberMe);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">LOGO COMPANY</h1>
//           <h2 className="text-2xl font-semibold text-gray-700 mt-4">Sign up</h2>
//           <p className="text-gray-600 mt-2">Sign up to continue</p>
//         </div>
//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//               Name
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="name"
//               type="text"
//               placeholder="Name"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//               Email
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="email"
//               type="email"
//               placeholder="Email"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//               id="password"
//               type="password"
//               placeholder="Password"
//             />
//             <div className="flex items-center">
//               <input
//                 id="remember-me"
//                 type="checkbox"
//                 className="mr-2"
//                 checked={rememberMe}
//                 onChange={handleRememberMeChange}
//               />
//               <label htmlFor="remember-me" className="text-sm text-gray-700">
//                 Remember me
//               </label>
//             </div>
//           </div>
//           <div className="mb-6">
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//               type="button"
//             >
//               Sign up
//             </button>
//           </div>
//           <div className="text-center mb-6">
//             <p className="text-gray-600">ACCESS QUICKLY</p>
//           </div>
//           <div className="mb-6">
//             <button
//               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center"
//               type="button"
//             >
//               <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 mr-2" />
//               Sign up with Google
//             </button>
//           </div>
//           <div className="mb-6">
//             <button
//               className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center"
//               type="button"
//             >
//               <img src="https://static.licdn.com/sc/h/eahiplrwoq61f4uan012ia17i" alt="LinkedIn" className="w-4 h-4 mr-2" />
//               Sign up with LinkedIn
//             </button>
//           </div>
//           <div className="text-center">
//             <p className="text-gray-700">
//               Already have an account? <a href="#" className="text-blue-500 hover:text-blue-700">Sign in</a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;