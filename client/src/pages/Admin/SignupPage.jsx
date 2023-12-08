import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      age: age,
      phone: phone,
      email: email,
      password: password,
    };

    try {
      await axios
        .post("http://localhost:3000/admin/signup", data)
        .then((res) => {
          if (res.data.success) {
            console.log(res);
            toast.success(res.data.message);
          } else {
            console.log(res);
            toast.success(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("user registration failed");
        });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log("Error while Signup : ", error);
      toast.error("user not registered");
    }
  };

  return (
    <section className="h-screen flex justify-center">
      <div className="mb-12 md:mb-0 w-fit p-10 text-dark">
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
                className=" min-w-[180px] w-[20vw] h-[2rem]  rounded-xl p-3 "
              />
            </div>
            <div className="flex flex-col my-4">
              <label htmlFor="name">Age</label>
              <input
                type="number"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="  min-w-[100px] w-[12vw] h-[2rem] rounded-xl p-3"
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
                className="   min-w-[310px] w-[34vw] h-[2rem] rounded-xl p-3 "
              />
            </div>
            <div className="flex flex-col my-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="   min-w-[310px] w-[34vw] h-[2rem] rounded-xl p-3"
              />
            </div>
            <div className="flex flex-col my-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="   min-w-[310px] w-[34vw] h-[2rem] rounded-xl p-3 "
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#1A1A40] text-white font-medium text-xl p-3 m-3 mt-24 rounded-md w-[18rem] flex justify-center"
          >
            Sign Up
          </button>
          <p className="text-xs">
            Already have an account?
            <span className="text-blue-500 underline">
              {" "}
              <Link to={"/admin/login"}>login</Link>
            </span>
          </p>
        </form>
      </div>
    </section>
  );
}
