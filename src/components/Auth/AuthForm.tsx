import { useState } from "react";
import styles from "../../sass/components/AuthForm.module.scss";

import {
  setUser,
  setLoading,
  setError,
  logoutUser,
} from "../../redux/Auth/AuthSlice";
import {
  useTypificatedSelector,
  useTypificatedDispatch,
} from "../../hooks/hooks";

export const AuthForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useTypificatedDispatch();
  const auth = useTypificatedSelector((state) => state.auth);

  return (
    <>
      <div className=""></div>
    </>
  );
};
