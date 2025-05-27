import { Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "../HomePage/HomePage";
import SignupPage from "../SignUpPage/SignUp";
import RecoveryTracker from "../RecoveryPage/RecoveryPage";
import PrivateRoute from "../../PrivateRoute";
import AboutPage from "../AboutPage/AboutPage";
import AnalyticsPage from "../AnalyticsPage/AnalyticsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/recoveryTracker"
        element={
          <PrivateRoute>
            <RecoveryTracker />
          </PrivateRoute>
        }
      />
      <Route path="/about" element={<AboutPage />} />
      <Route
        path="/stats"
        element={
          <PrivateRoute>
            <AnalyticsPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
