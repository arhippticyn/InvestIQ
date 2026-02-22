import { useForm } from "react-hook-form";
import styles from "../../sass/components/AuthForm.module.scss";

import {
  useTypificatedSelector,
  useTypificatedDispatch,
} from "../../hooks/hooks";

import { login, registerUser } from "../../redux/Auth/AuthSlice";

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
    dispatch(login(data.email, data.password));
  };

  const onRegister = (data: FormValues) => {
    dispatch(registerUser(data.email, data.password));
  };

  return (
    <div className={styles.section}>
      <p className={styles.loginText}>
        Або увійти за допомогою ел. пошти та паролю після реєстрації
      </p>

      <form className={styles.form} onSubmit={handleSubmit(onLogin)}>
        <label className={styles.label}>
          Електронна пошта:
          <input
            className={styles.input}
            type="email"
            placeholder="your@email.com"
            {...register("email", {
              required: "Введіть email",
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

        <label className={styles.label}>
          Пароль:
          <input
            className={styles.input}
            type="password"
            placeholder="Пароль"
            {...register("password", {
              required: "Введіть пароль",
              minLength: { value: 6, message: "Мінімум 6 символів" },
            })}
          />
        </label>
        {errors.password && (
          <p className={styles.fieldError}>{errors.password.message}</p>
        )}

        {auth.error && <p className={styles.error}>{auth.error}</p>}

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.btnPrimary}
            disabled={auth.isLoading}
          >
            {auth.isLoading ? "..." : "Увійти"}
          </button>

          <button
            type="button"
            className={styles.btnSecondary}
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
