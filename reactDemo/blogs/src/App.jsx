import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import LeftMenu from "./components/menu.jsx";
import Header from "./components/header.jsx";
import './app.less'

const App = function () {
  return (
    <div className="main-container flex-row">
      <LeftMenu></LeftMenu>
      <div className="right-container">
        <Header></Header>
        <div className="content-container">
         <RouterProvider router={router}></RouterProvider>
        </div>
      </div>
    </div>
  );
};


export default App;
