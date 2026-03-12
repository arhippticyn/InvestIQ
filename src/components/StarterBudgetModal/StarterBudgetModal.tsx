import { useTypificatedSelector } from "../../hooks/hooks"
import { selectBudget } from "../../redux/Budget/BudgetSelectors"
import { useEffect, useState } from "react"
import styles from '../../sass/components/StarterBudgetModal/StarterBudgetModal.module.scss'


export default function StarterBudgetModal() {
    const budget = useTypificatedSelector(selectBudget)
    const [isOpen, setIsOpen] = useState<boolean>(true)

    useEffect(() => {
        const openTimeout = setTimeout(() => {
            setIsOpen(false)
        }, 3000)

        return () => clearTimeout(openTimeout)
    }, [])

    if (budget !== 0) {
        return <></>
    }

    return (
        <>
            {isOpen &&
                <div className={styles.modal}>
                    <div className={styles.container}>
                        <p className={styles.text}>
                            Привіт! Для початку роботи внесіть свій поточний баланс рахунку!
                        </p>
                        <p className={styles.subText}>
                            Ви не можете витрачати гроші, поки їх у Вас немає :)
                        </p>
                    </div>
                </div>
            }
        </>
    )
}