import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useEffect } from "react";
import serverUrl from "../server";
import axios from "axios";

export default function HomePage() {
  useEffect(() => {
    console.log(document.cookie);
    axios
      .post(`${serverUrl}/verify-user`, {}, { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Navbar />
      <Footer />
    </>
  );
}
