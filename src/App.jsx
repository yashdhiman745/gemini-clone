import { useState } from "react";
import "./App.css";
import Sidebar from "./Componenet/Sidebar/Sidebar";
import Main from "./Componenet/Main/Main";
import Context from "./context/Context";

function App() {
  return (
    <>
      <Sidebar />
      <Main />
      <Context />
    </>
  );
}

export default App;
