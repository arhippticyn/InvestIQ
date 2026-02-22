import { useState } from "react";
import styles from "../../sass/components/AuthForm.module.scss";
import { useForm } from "react-hook-form";

import { login } from "../../redux/Auth/AuthSlice";

import {
  useTypificatedSelector,
  useTypificatedDispatch,
} from "../../hooks/hooks";

import { setUser, setLoading, setError } from "../../redux/Auth/AuthSlice";

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

  const onSubmit = (data: FormValues) => {
    dispatch(login(data.email, data.password));
  };

  const onRegister = (data: FormValues) => {};
  return (
    <>
      <div className={styles.section}>
        <p className={styles.googleText}>
          Ви можете авторизуватися за допомогою акаунта Google
        </p>
        <p className={styles.loginText}>
          Або увійти за допомогою ел. пошти та праолю після реєстрації
        </p>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.label}>
            Електронна пошта:
            <input
              className={styles.input}
              type="email"
              placeholder="your@email.com"
              {...register("email", {
                required: "Введіть email",
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
              {...register("password", {
                required: "Введіть пароль",
                minLength: {
                  value: 4,
                  message: "Мінімум 4 символи",
                },
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
              {auth.isLoading ? "..." : "УВІЙТИ"}
            </button>

            <button type="button" className={styles.btnSecondary}>
              РЕЄСТРАЦІЯ
            </button>
          </div>
        </form>{" "}
      </div>
    </>
  );
};
