import styles from "../../sass/components/Header/Header.module.scss";
import { Logo } from "./Logo";
import { Link } from "react-router-dom";
import { getUser } from "../../redux/Auth/AuthOperation";
import { useTypificatedDispatch } from "../../hooks/hooks";
import { useTypificatedSelector } from "../../hooks/hooks";
import { useEffect } from "react";
import { logoutUser } from "../../redux/Auth/AuthSlice";
import logoutIcon from "../../assets/header/logout.svg";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const dispatch = useTypificatedDispatch();
  const user = useTypificatedSelector((state) => state.auth.user);
  const token = useTypificatedSelector((state) => state.auth.token);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch, token]);

  return (
    <header className={styles.header}>
      <Logo></Logo>

      <nav className={styles.nav}>
        <div className={styles.navUserContainer}>
          <Link to="/home/me" className={styles.navShortUsername}>
            {(user?.username?.slice(0, 1) ?? "U").toUpperCase()}
          </Link>
          <Link className={styles.navFullUsername} to="/home/me">
            {user?.username ?? "User Name"}
          </Link>
        </div>
        <div className={styles.navUserControl}>
          <button
            className={styles.navLogout}
            onClick={() => {
              dispatch(logoutUser())
              navigate('/', { replace: true })
            }}
          >
            <div className={styles.navLogoutMobile}>
              <img src={logoutIcon} alt="logout" />
            </div>
            <div className={styles.navLogoutDesktop}>Вийти</div>
          </button>
        </div>
      </nav>
    </header>
  );
};
