import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import JobApplicationProvider from "./context/JobApplicationContext";

const Router = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default Router;
