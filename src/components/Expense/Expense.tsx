import styles from '../../sass/components/Expense/Expense.module.scss'
import ExpenseForm from './ExpenseForm'

interface ExpenseProps {}

const Expense = ({}:ExpenseProps) => {
  return (
    <div className={styles.expense}>
        <ExpenseForm />
    </div>
  )
}

export default Expense