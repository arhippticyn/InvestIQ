import styles from "../../sass/components/Header/Logo.module.scss";

export const Logo = () => {
  return (
    <div className={styles.imgContainer}>
      <h2 className={styles.logoText}>InvestIQ</h2>
    </div>
  );
};
