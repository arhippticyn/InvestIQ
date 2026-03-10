import { useState } from 'react'
import Finance from '../components/Finance/Finance'
import styles from '../sass/components/Expense/Expense.module.scss'
import { Header } from '../components/Header/Header'

export const Home = () => {
  const [activePage, setActivePages] = useState(true)
  return (
    <>
      <Header></Header>

      <div className={styles.container}>
        <div className={styles.switchBtns}>
          <button
            className={`${styles.BtnSwitch} ${activePage && styles.active}`}
            onClick={() => setActivePages(true)}
          >
            Витрати
          </button>
          <button
            className={`${styles.BtnSwitch} ${!activePage && styles.active}`}
            onClick={() => setActivePages(false)}
          >
            Доходи
          </button>
        </div>

        <Finance type={activePage ? 'expense' : 'incomes'} />

      </div>
    </>
  )
}
