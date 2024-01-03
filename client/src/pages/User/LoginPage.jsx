import loginImg from "../../assets/NewLoginImage.jpg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import serverURL from "../../../serverURL";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    Cookie.get("token") ? navigate("/user/home") : null;
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: username,
      password: password,
    };

    axios
      .post(`${serverURL}/login`, userData, { withCredentials: true })
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.message);
          console.log(res);
        } else if (res.data.success) {
          toast.success("login successful");
          Cookie.set("token", res.data.token);
          navigate("/user/home");
          console.log(res);
        }
      })
      .catch((err) => {
        toast.error("login error");
        console.log(err);
      });
  };

  return (
    <div className="flex md:flex-row flex-col">
      <div className="hidden md:w-[50%] md:flex items-center h-screen">
        <img src={loginImg} alt="" className="object-fit h-full w-full" />
      </div>
      <div className="h-screen md:h-content md:w-[50%] flex items-center justify-center">
        <form
          className="bg-[#082742] min-w-fit text-[#BBE1FA] font-light rounded-lg w-[70%] p-[3rem] flex flex-col items-center justify-center"
          onSubmit={handleFormSubmit}
        >
          <h1 className="text-5xl font-bold mb-6 text-white">Login</h1>
          <div className="flex flex-col my-4">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="bg-[#3282B8] w-[20rem] h-[2rem] rounded-xl p-3 text-white"
            />
          </div>
          <div className="flex flex-col my-4">
            <label htmlFor="name">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#3282B8] w-[20rem] h-[2rem] rounded-xl p-3 text-white"
            />
          </div>
          <button
            type="submit"
            className="bg-[#0088FF] text-white font-medium text-xl p-3 m-3 mt-24 rounded-md w-[18rem] flex justify-center"
          >
            Log In
          </button>
          <p className="text-xs">
            Dont have an account?
            <span className="text-blue-500 underline">
              <Link to={"/user/signup"}>Signup</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
