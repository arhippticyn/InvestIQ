import styles from '../../sass/components/Expense/Expense.module.scss'

interface ExpenseFormProps {}

const ExpenseForm = ({}: ExpenseFormProps) => {
  return(
    <form className={styles.expenseForm}>
        <input type="text" placeholder='Опис товару' className={styles.input_descr} />
        <select name="" id="">
            
        </select>
        <input type="number" placeholder='0,00' className={styles.input_amount} id="" />

        <button type="submit" className={styles.expense_btn}>Ввести</button>
    </form>
  )
}

export default ExpenseForm
