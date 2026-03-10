import styles from '../../sass/components/Expense/Expense.module.scss'
import ExpenseForm from './FinanceForm'
import ExpenseList from './FinanceList'

interface ExpenseProps {
  type: 'incomes' | 'expense'
}

const Finance = ({ type }: ExpenseProps) => {
  return (
    <div className={styles.expense}>
      <ExpenseForm type={type} />
      <ExpenseList type={type} />
    </div>
  )
}

export default Finance