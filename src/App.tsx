import Modal from "./components/Modal/Modal";
import { Auth } from "./components/Auth/Auth";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      {/* <Modal title="Ви впевнені?" onClickTrue={() => {}} onClickFalse={() => {}} />
      <Modal title="Ви дійсно хочете вийти?" onClickTrue={() => {}} onClickFalse={() => {}} /> */}
      <Routes>
        <Route path="/" element={<Auth />}/>
      </Routes>
    </div>
  );
}

export default App;
