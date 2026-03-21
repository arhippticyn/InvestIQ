import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import Loader from "./components/Loader/Loader";

const Auth = lazy(() => import("./components/Auth/Auth"));
const Home = lazy(() => import("./pages/Home"));
const ProtectedRoute = lazy(
  () => import("./components/ProtectedRoute/ProtectesRoute"),
);
const NotFound = lazy(() => import("./components/NotFound/NotFound"));
const Profile = lazy(() => import("./components/Profile/Profile"));
const Modal = lazy(() => import("./components/Modal/Modal"));
const ReportPage = lazy(() => import("./components/ReportPage/ReportPage"));

function App() {
  const navigate = useNavigate();

  useEffect(() => { }, []);

  return (
    <>
      {/* <Modal title="Ви впевнені?" onClickTrue={() => {}} onClickFalse={() => {}} />
      <Modal title="Ви дійсно хочете вийти?" onClickTrue={() => {}} onClickFalse={() => {}} /> */}

      <Suspense fallback={<Loader></Loader>}>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/me"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/report"
            element={
              <ProtectedRoute>
                <ReportPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound></NotFound>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
