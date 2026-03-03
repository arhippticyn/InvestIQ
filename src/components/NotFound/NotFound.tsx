import styles from '../../sass/components/NotFound/NotFound.module.scss'
import { useNavigate } from "react-router-dom"
import { Logo } from '../Header/Logo'

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <section className={styles.notFound}>
            <div className={styles.thumb}>
                <img src="/NotFound.png" alt="Not found" className={styles.img} />
            </div>
            <div className={styles.textBlock}>
                <Logo></Logo>
                <p className={styles.text}>404</p>
                <p className={styles.text}>DIDN'T FIND ANYTHING HERE</p>
            </div>

            <button type="button" className={styles.button} onClick={() => navigate('/home')}>Назад на Головну</button>
        </section>
    )
}