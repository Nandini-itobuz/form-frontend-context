import { BrowserRouter } from "react-router-dom";
import { FC } from "react";
import Router from "./Router";
import JobApplicationProvider from "./context/JobApplicationContext";

const App: FC = () => {
  return (
    <JobApplicationProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </JobApplicationProvider>
  );
};

export default App;
