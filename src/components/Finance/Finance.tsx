import styles from '../../sass/components/Expense/Expense.module.scss'
import ExpenseForm from './FinanceForm'
import ExpenseList from './FinanceList'
import MobileFinanceForm from './MobileFinanceForm'

interface ExpenseProps {
  type: 'incomes' | 'expense'
}

const Finance = ({ type }: ExpenseProps) => {
  return (
    <div className={styles.expense}>
      <ExpenseForm type={type} />
      <MobileFinanceForm type={type} />
      <ExpenseList type={type} />
    </div>
  )
}

export default Finance