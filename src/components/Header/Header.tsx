import styles from "../../sass/components/Header.module.scss";
import { Logo } from "./Logo";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import { GetUser } from "../../redux/Auth/AuthOperation";
import { useTypificatedDispatch } from "../../hooks/hooks";
import { useTypificatedSelector } from "../../hooks/hooks";
import { useEffect } from "react";
import { logoutUser } from "../../redux/Auth/AuthSlice";

export const Header = () => {
  const dispatch = useTypificatedDispatch();
  const user = useTypificatedSelector((state) => state.auth.user);
  const token = useTypificatedSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(GetUser());
    }
  }, [dispatch, token]);

  return (
    <header className={styles.header}>
      <Logo></Logo>

      <nav className={styles.nav}>
        <div className={styles.navUserContainer}>
          <Link to="./home/me" className={styles.navShortUsername}>
            {(user?.username?.slice(0, 1) ?? "U").toUpperCase()}
          </Link>
          <Link className={styles.navFullUsername} to="./home/me">
            {user?.username ?? "User Name"}
          </Link>
        </div>
        <div className={styles.navUserControl}>
          <button
            className={styles.navLogout}
            onClick={() => dispatch(logoutUser())}
          >
            <div className={styles.navLogoutMobile}>
              <CiLogout></CiLogout>
            </div>
            <div className={styles.navLogoutDesktop}>Вийти</div>
          </button>
        </div>
      </nav>
    </header>
  );
};
