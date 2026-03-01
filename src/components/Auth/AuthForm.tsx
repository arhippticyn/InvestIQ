import { useForm } from "react-hook-form";
import styles from "../../sass/components/AuthForm.module.scss";

import {
  useTypificatedSelector,
  useTypificatedDispatch,
} from "../../hooks/hooks";

import { loginUser, registerUser } from "../../redux/Auth/AuthOperation";
import AuthGogle from "./AuthGogle";
import { BACKEND_URL } from "../../api/api";

type FormValues = {
  email: string;
  password: string;
};

export const AuthForm = () => {
  const dispatch = useTypificatedDispatch();
  const auth = useTypificatedSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  const onLogin = (data: FormValues) => {
    dispatch(loginUser({email:data.email, password:data.password}));
  };

  const onRegister = (data: FormValues) => {
    dispatch(registerUser({email:data.email, password:data.password}));
  };

  return (
    <div className={styles.section}>
      <div className={styles.googleTextContainer}>
        <p className={styles.formText}>
          Ви можете авторизуватися за допомогою акаунта Google
        </p>
      </div>

      <AuthGogle title="Google" redirect_google={() => window.location.href = `${BACKEND_URL}/auth/google`} />

      <p className={`${styles.formText} ${styles.loginText}`}>
        Або увійти за допомогою ел. пошти та паролю після реєстрації
      </p>
      <form className={styles.form} onSubmit={handleSubmit(onLogin)}>
        <div className={styles.formEmailContainer}>
          <label className={styles.label}>
            <div className={styles.labelContainer}>
              {errors.email && <p className={styles.required}>*</p>}Електронна
              пошта:
            </div>{" "}
            <input
              className={styles.input}
              type="email"
              placeholder="your@email.com"
              {...register("email", {
                required: "Це обов'язкове поле",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Невірний формат email",
                },
              })}
            />
          </label>
          {errors.email && (
            <p className={styles.fieldError}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.formPasswordContainer}>
          <label className={styles.label}>
            <div className={styles.labelContainer}>
              {errors.password && <p className={styles.required}>*</p>}Пароль:
            </div>
            <input
              className={styles.input}
              type="password"
              placeholder="Пароль"
              {...register("password", {
                required: "Це обов'язкове поле",
                minLength: { value: 6, message: "Мінімум 6 символів" },
              })}
            />
          </label>
          {errors.password && (
            <p className={styles.fieldError}>{errors.password.message}</p>
          )}
        </div>

        {auth.error && <p className={styles.error}>{auth.error}</p>}

        <div className={styles.buttons}>
          <button
            type="submit"
            className={`${styles.buttonPrimary} ${styles.button}`}
            disabled={auth.isLoading}
          >
            {auth.isLoading ? "..." : "Увійти"}
          </button>

          <button
            type="button"
            className={`${styles.buttonSecondary} ${styles.button}`}
            disabled={auth.isLoading}
            onClick={handleSubmit(onRegister)}
          >
            Реєстрація
          </button>
        </div>
      </form>
    </div>
  );
};
