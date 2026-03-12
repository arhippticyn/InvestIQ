import { useState, Suspense, lazy } from 'react'
import styles from '../sass/components/Expense/Expense.module.scss'
import { useTypificatedSelector } from '../hooks/hooks'
import { selectBudget } from '../redux/Budget/BudgetSelectors'
import Loader from '../components/Loader/Loader'

const Header = lazy(() => import('../components/Header/Header'))
const Budget = lazy(() => import('../components/Budget/Budget'))
const Finance = lazy(() => import('../components/Finance/Finance'))

const Home = () => {
  const budget = useTypificatedSelector(selectBudget)
  const [activePage, setActivePages] = useState(true)
  const [newBudget, setNewBudget] = useState<string>(String(budget))

  return (
    <>
      <Suspense fallback={<Loader></Loader>}>
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
      </Suspense>
    </>
  )
}

export default Home