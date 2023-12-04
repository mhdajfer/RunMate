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

    const user = {
      name: name,
      age: age,
      phone: phone,
      email: email,
      password: password,
    };

    try {
      await axios
        .post("http://localhost:3000/user/signup", user)
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
      window.location.reload();
    } catch (error) {
      console.log("Error while Signup : ", error);
      toast.error("user not registered");
    }
  };

  return (
    <section className="h-screen">
      <div className="g-6 flex h-full items-center justify-center">
        <div className="md:block hidden md:mb-0 w-[50%]">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="w-full"
            alt="Sample image"
          />
        </div>

        <div className="mb-12 md:mb-0 w-fit p-10 text-white">
          <form
            className="rounded-lg bg-[#082742] p-6 flex flex-col items-center"
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
                  className="bg-[#3282B8] min-w-[180px] w-[20vw] h-[2rem] rounded-xl p-3 text-white"
                />
              </div>
              <div className="flex flex-col my-4">
                <label htmlFor="name">Age</label>
                <input
                  type="number"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="bg-[#3282B8] min-w-[100px] w-[12vw] h-[2rem] rounded-xl p-3 text-white"
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
                  className="bg-[#3282B8] min-w-[310px] w-[34vw] h-[2rem] rounded-xl p-3 text-white"
                />
              </div>
              <div className="flex flex-col my-4">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="name"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#3282B8] min-w-[310px] w-[34vw] h-[2rem] rounded-xl p-3 text-white"
                />
              </div>
              <div className="flex flex-col my-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#3282B8] min-w-[310px] w-[34vw] h-[2rem] rounded-xl p-3 text-white"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#0088FF] text-white font-medium text-xl p-3 m-3 mt-24 rounded-md w-[18rem] flex justify-center"
            >
              Sign Up
            </button>
            <p className="text-xs">
              Already have an account?
              <span className="text-blue-500 underline">
                {" "}
                <Link to={"/login"}>login</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
