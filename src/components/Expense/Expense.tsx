import styles from '../../sass/components/Expense/Expense.module.scss'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'

interface ExpenseProps {}

const Expense = ({}:ExpenseProps) => {
  return (
    <div className={styles.expense}>
        <ExpenseForm />
        <ExpenseList />
    </div>
  )
}

export default Expense