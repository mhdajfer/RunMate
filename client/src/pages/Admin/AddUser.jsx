import { useState } from "react";
import Navbar from "../../Components/Navbar";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import serverUrl from "../../server";

export default function AddUser() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(0);

  const handleFormSubmit = async (e) => {
    console.log(e);
    e.preventDefault();

    const user = {
      name: name,
      age: age,
      phone: phone,
      email: email,
      password: password,
    };

    try {
      await axios
        .post(`${serverUrl}/user/signup`, user)
        .then((res) => {
          if (res.data.success) {
            console.log(res);
            toast.success(res.data.message);
            setTimeout(() => {
              navigate("/admin/users");
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("user registration failed");
        });
    } catch (error) {
      console.log("Error while Signup : ", error);
      toast.error("user not registered");
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex ">
        <AdminLayout />
        <div className="w-full flex justify-center">
          <div className="mb-12 md:mb-0 w-fit p-10 ">
            <form
              className="rounded-lg bg-[#BBE1FA] p-6 flex flex-col items-center"
              onSubmit={handleFormSubmit}
            >
              <h1 className="text-5xl font-bold m-8">Signup</h1>
              <div className="flex space-x-6">
                <div className="flex flex-col my-4">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="min-w-[180px] w-[20vw] h-[2rem] rounded-xl p-3  "
                  />
                </div>
                <div className="flex flex-col my-4">
                  <label htmlFor="name">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className=" min-w-[100px] w-[12vw] h-[2rem] rounded-xl p-3  "
                  />
                </div>
              </div>

              <div className="flex flex-col items-start w-full">
                <div className="flex flex-col my-4">
                  <label htmlFor="phone">Phone no.</label>
                  <input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className=" min-w-[310px] w-[34vw] h-[2rem] rounded-xl p-3  "
                  />
                </div>
                <div className="flex flex-col my-4">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=" min-w-[310px] w-[34vw] h-[2rem] rounded-xl p-3  "
                  />
                </div>
                <div className="flex flex-col my-4">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=" min-w-[310px] w-[34vw] h-[2rem] rounded-xl p-3  "
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#0088FF]   font-medium text-xl p-3 m-3 mt-24 rounded-md w-[18rem] flex justify-center"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}