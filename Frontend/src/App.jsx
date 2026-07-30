import Landing from "./Components/Landing";
import SignUp from "./Components/Signup";
import LogIn from "./Components/LogIn";
import MainApp from "./Components/MainPage";
import UpgradePlan from "./Components/UpgradePlan";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("access_token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <MainApp />
            </ProtectedRoute>
          }
        />
        <Route path="/UpgradePlan" element={<UpgradePlan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;