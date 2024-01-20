import { Support, About } from "../../staticData/data";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#1B262C] flex items-center justify-between mt-8 text-white py-8 px-14">
        <div>
          <h1 className="text-5xl font-bold">RunMate</h1>
        </div>
        <div>
          <h4 className="font-medium">Support</h4>
          <ul className="text-sm opacity-70">
            {Support.map((item) => {
              return (
                <li key={item.title}>
                  <Link to={item.url}>{item.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h4 className="font-medium">About</h4>
          <ul className="text-sm opacity-70">
            {About.map((item) => {
              return (
                <li key={item.title}>
                  <Link to={item.url}>{item.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h3>Connect with us.</h3>
        </div>
      </footer>
    </>
  );
}
