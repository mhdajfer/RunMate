import { useState, useEffect } from "react";
import serverUrl from "../../server";
import axios from "axios";

export default function Image() {
  const [image, setImage] = useState("");

  useEffect(() => {
    console;
    axios.get(`${serverUrl}/product/image`).then((res) => {
      setImage(res.data.data[0].image);
    });
  }, [image]);
  return (
    <>
      <img src={serverUrl + "/" + image} alt="" />
    </>
  );
}
