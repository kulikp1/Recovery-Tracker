import { Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "../HomePage/HomePage";
import SignupPage from "../SignUpPage/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
