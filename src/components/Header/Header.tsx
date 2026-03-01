import styles from "../../sass/components/Header.module.scss";
import { Logo } from "./Logo";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import { GetUser } from "../../redux/Auth/AuthOperation";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Logo></Logo>

      <nav className={styles.nav}>
        <div className={styles.navUserContainer}>
          <Link to={"./home/me"}></Link>
        </div>
        <div className={styles.navUserControl}>
          <button className={styles.navMobileLogout}>
            <CiLogout></CiLogout>
          </button>
        </div>
      </nav>
    </header>
  );
};
