import Modal from "./components/Modal/Modal";
import { Auth } from "./components/Auth/Auth";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute/ProtectesRoute";
import NotFound from "./components/NotFound/NotFound";
import Profile from "./components/Profile/Profile";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate()

  useEffect(() => {
  }, [])

  return (
    <>
      {/* <Modal title="Ви впевнені?" onClickTrue={() => {}} onClickFalse={() => {}} />
      <Modal title="Ви дійсно хочете вийти?" onClickTrue={() => {}} onClickFalse={() => {}} /> */}
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/home/me" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </>
  );
}

export default App;
