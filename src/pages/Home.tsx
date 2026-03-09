import { useState } from 'react'
import Expense from '../components/Expense/Expense'
import styles from '../sass/components/Expense/Expense.module.scss'
import { Header } from '../components/Header/Header'

export const Home = () => {
  const [activePage, setActivePages] = useState(true)
  return (
    <div>
      <Header></Header>
      {activePage ? <Expense></Expense> : null}

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
    </div>
  )
}
