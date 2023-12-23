import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import serverURL from "../../../serverURL";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../Utils/Auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const auth = useContext(AuthContext);
  const authState = auth.getIsAuthenticated();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    authState ? navigate("/admin/dashboard") : null;
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: username,
      password: password,
    };

    axios
      .post(`${serverURL}/admin/login`, userData, { withCredentials: true })
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.message);
          console.log(res);
        } else {
          toast.success("login successful");
          auth.login();
          navigate("/admin/dashboard");
          console.log(res);
        }
      })
      .catch((err) => {
        toast.error("login error");
        console.log(err);
      });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        className="bg-[#BBE1FA] min-w-fit text-black font-light rounded-lg w-[35vw] p-[3rem] flex flex-col items-center justify-center"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-5xl font-bold mb-6">Login</h1>
        <div className="flex flex-col my-4">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className=" w-[20rem] h-[2rem] rounded-xl p-3"
          />
        </div>
        <div className="flex flex-col my-4">
          <label htmlFor="name">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[20rem] h-[2rem] rounded-xl p-3 "
          />
        </div>
        <button
          type="submit"
          className="bg-[#1A1A40] text-white font-medium text-xl p-3 m-3 mt-24 rounded-md w-[18rem] flex justify-center"
        >
          Log In
        </button>
        <p className="text-xs">
          Dont have an account?
          <span className="text-blue-500 underline">
            <Link to={"/admin/signup"}>Signup</Link>
          </span>
        </p>
      </form>
    </div>
  );
}
