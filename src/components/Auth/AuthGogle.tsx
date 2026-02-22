import React from 'react';
import { FcGoogle } from "react-icons/fc";
import styles from "../../sass/components/AuthForm.module.scss";

interface AuthGogleProps {
  title: string,
  redirect_google: () => void
}

const AuthGogle: React.FC<AuthGogleProps> = ({title, redirect_google}) => {
  return (
    <div className={styles.BtnGoogleContainer}>
      <button className={styles.BtnGoogle} onClick={redirect_google}><FcGoogle className={styles.BtnGoogleImg} />{title}</button>
    </div>
  );
};

export default AuthGogle;