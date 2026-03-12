import styles from '../../sass/components/Expense/Expense.module.scss'
import Result from '../Result/Result'
import ExpenseForm from './FinanceForm'
import ExpenseList from './FinanceList'

interface ExpenseProps {
  type: 'incomes' | 'expense'
}

const Finance = ({ type }: ExpenseProps) => {
  return (
    <div className={styles.expense}>
      <ExpenseForm type={type} />
      <div className={`${styles.financeRes} ${type === 'incomes' && styles.incomes}`}>
        <ExpenseList type={type} />
        <Result type={type} />
      </div>
    </div>
  )
}

export default Finance
