import React, { useContext } from "react";
import "./App.css";
import Home from "./Home";
import NotFound from "./NotFound";
import { Routes, Route } from "react-router-dom";
import ServiceIndex from "./Components/Service/index";
import userContext from "./Context/userContext";
function App() {
  const context = useContext(userContext);
  const { user } = context;
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user.length !== 0 ? <ServiceIndex /> : <Home />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
