import styles from "../../sass/components/Auth.module.scss";
import { AuthForm } from "./AuthForm";

export const Auth = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>InvestIQ</h2>
      <p className={styles.subtitle}>Smart Finance</p>
      <AuthForm></AuthForm>
    </section>
  );
};
