import Modal from "./components/Modal/Modal";
import { Auth } from "./components/Auth/Auth";

function App() {
  return (
    <div>
      {/* <Modal title="Ви впевнені?" onClickTrue={() => {}} onClickFalse={() => {}} />
      <Modal title="Ви дійсно хочете вийти?" onClickTrue={() => {}} onClickFalse={() => {}} /> */}
      <Auth></Auth>
    </div>
  );
}

export default App;
