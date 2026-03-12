import { useState } from 'react'
import Finance from '../components/Finance/Finance'
import styles from '../sass/components/Expense/Expense.module.scss'
import { Header } from '../components/Header/Header'
import Budget from '../components/Budget/Budget'
import { useTypificatedSelector } from '../hooks/hooks'
import { selectBudget } from '../redux/Budget/BudgetSelectors'

export const Home = () => {
  const budget = useTypificatedSelector(selectBudget)
  const [activePage, setActivePages] = useState(true)
  const [newBudget, setNewBudget] = useState<string>(String(budget))

  return (
    <>
      <Header></Header>

      <Budget newBudget={newBudget} setNewBudget={setNewBudget} budget={budget}></Budget>

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
