import styles from "../../sass/components/Auth/Auth.module.scss";
import { AuthForm } from "./AuthForm";

export const Auth = () => {
  return (
    <section className={styles.section}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>InvestIQ</h2>
        <p className={styles.subtitle}>Smart Finance</p>
      </div>

      <AuthForm></AuthForm>
    </section>
  );
};
