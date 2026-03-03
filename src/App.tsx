import Modal from "./components/Modal/Modal";
import { Auth } from "./components/Auth/Auth";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute/ProtectesRoute";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <div>
      {/* <Modal title="Ви впевнені?" onClickTrue={() => {}} onClickFalse={() => {}} />
      <Modal title="Ви дійсно хочете вийти?" onClickTrue={() => {}} onClickFalse={() => {}} /> */}
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </div>
  );
}

export default App;
