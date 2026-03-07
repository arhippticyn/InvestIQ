import { useState, useEffect } from "react"
import { useTypificatedDispatch, useTypificatedSelector } from "../../hooks/hooks"
import { getUser, setNewUsername, logoutUser } from "../../redux/Auth/AuthOperation"
import { selectUser } from "../../redux/selectors"
import { FiEdit } from "react-icons/fi"
import logoutIcon from "../../assets/header/logout.svg"
import { useForm, type FieldErrors } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import styles from "../../sass/components/Profile/Profile.module.scss"

type FormValues = {
    username: string
}

export default function Profile() {
    const dispatch = useTypificatedDispatch()
    const user = useTypificatedSelector(selectUser)
    const [isEditing, setIsEditing] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm<FormValues>()

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    useEffect(() => {
        reset({ username: user?.username })
    }, [user, reset]) 

    const onSave = async function (data: FormValues) {
        try {
            await dispatch(setNewUsername(data.username)).unwrap()
            setIsEditing(false)
            toast.success("Ім'я користувача успішно оновлено!")
        } catch (err: any) {
            toast.error("Не вдалося оновити ім'я: " + (err?.message))
        }
    }

    const onError = function (errors: FieldErrors<FormValues>) {
        if (errors.username?.type === "required") {
            toast.error("Ім'я користувача обов'язкове")
        } else if (errors.username?.type === "minLength") {
            toast.error("Ім'я користувача має містити мінімум 3 символи")
        }
    }

    const onCancel = function () {
        reset({ username: user?.username })
        setIsEditing(false)
    }

    const onLogout = function () {
        dispatch(logoutUser())
        navigate('/', { replace: true })
        toast.info("Ви вийшли з акаунту")
    }

    const onGoBack = function () {
        navigate(-1)
    }

    return (
        <section className={styles.profile}>
            <button className={styles.backBtn} onClick={onGoBack}>
                ← Повернутися назад
            </button>

            <div className={styles.main}>
                <div className={styles.info}>
                    <p className={styles.avatar}>
                        {(user?.username?.slice(0, 1) ?? "U").toUpperCase()}
                    </p>

                    <div className={styles.personalInfo}>
                        <div className={styles.usernameRow}>
                            {isEditing ? (
                                <form onSubmit={handleSubmit(onSave, onError)} className={styles.usernameForm}>
                                    <input
                                        {...register("username", { required: true, minLength: 3 })}
                                        className={styles.usernameInput}
                                        autoFocus
                                    />
                                    <button type="submit" className={styles.saveBtn}>
                                        Зберегти
                                    </button>
                                    <button type="button" className={styles.cancelBtn} onClick={onCancel}>
                                        Скасувати
                                    </button>
                                </form>
                            ) : (
                                <>
                                    <p className={styles.username}>
                                        {user?.username ?? "Ім'я користувача"}
                                    </p>
                                    <FiEdit
                                        className={styles.editIcon}
                                        onClick={() => setIsEditing(true)}
                                    />
                                </>
                            )}
                        </div>

                        <p className={styles.email}>{user?.email ?? "example@gmail.com"}</p>
                    </div>
                </div>

                <button type="button" className={styles.logoutBtn} onClick={onLogout}>
                    <img src={logoutIcon} alt="logout" className={styles.logoutIcon} />
                    Вийти з акаунту
                </button>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                draggable
            />
        </section>
    )
}