import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import ProgressBar from "../../Components/ProgressBar";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [referral, setReferral] = useState("");

  function handleStrengthCheck(password) {
    setPasswordStrength(0);
    password.match(/\d+/g) ? setPasswordStrength((prev) => prev + 25) : null;
    password.match(/[A-Z]+/g) ? setPasswordStrength((prev) => prev + 25) : null;
    password.match(/[a-z]+/g) ? setPasswordStrength((prev) => prev + 25) : null;
    password.length > 7 ? setPasswordStrength((prev) => prev + 25) : null;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!name || !password || !confirmPassword || !age || !phone || !email)
      return toast.error("fill all fields");

    if (password != confirmPassword) return toast.error("password mismatch");

    if (!(passwordStrength >= 75)) return toast.error("passwod strength low!!");

    const user = referral
      ? {
          name: name,
          age: age,
          phone: phone,
          email: email,
          password: password,
          referral: referral,
        }
      : {
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
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
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
                  required
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
                  required
                  className="bg-[#3282B8] min-w-[100px] w-[12vw] h-[2rem] rounded-xl p-3 text-white"
                />
              </div>
            </div>

            <div className="flex flex-col items-start w-full">
              <div className="flex flex-col my-4">
                <label htmlFor="phone">Phone no.</label>
                <input
                  type="number"
                  name="phone"
                  defaultValue={""}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
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
                  required
                  className="bg-[#3282B8] min-w-[310px] w-[34vw] h-[2rem] rounded-xl p-3 text-white"
                />
              </div>
              <div className="flex flex-col my-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleStrengthCheck(e.target.value);
                  }}
                  required
                  className="bg-[#3282B8] min-w-[310px] w-[34vw] h-[2rem] rounded-xl p-3 text-white"
                />
                <ProgressBar progress={passwordStrength} />
              </div>
              <div className="flex flex-col my-4">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  type="password"
                  name="password2"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  required
                  className="bg-[#3282B8] min-w-[310px] w-[34vw] h-[2rem] rounded-xl p-3 text-white"
                />
              </div>
              <div className="flex flex-col my-4">
                <label htmlFor="referral">Referral</label>
                <input
                  type="text"
                  name="referral"
                  value={referral}
                  onChange={(e) => setReferral(e.target.value)}
                  className="bg-[#3282B8] min-w-[180px] w-[20vw] h-[2rem] rounded-xl p-3 text-white"
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
