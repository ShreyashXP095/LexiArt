import React from "react";
import Header from "../components/Header";
import Steps from "../components/Steps";
import GenerateBtn from "../components/GenerateBtn";
import Login from "../components/Login";

const Home = () => {
  return (
    <div>
      <Header />
      <Steps/>
      <GenerateBtn/>
      <Login/>
    </div>
  );
};

export default Home;
