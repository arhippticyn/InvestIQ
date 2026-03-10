import { useEffect } from 'react'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../hooks/hooks'
import { selectExpenses } from '../../redux/Expense/ExpireSelectors'
import styles from '../../sass/components/Expense/Expense.module.scss'
import {
  DeleteExpense,
  GetAllExpenses,
} from '../../redux/Expense/ExpenseOperation'
import { selectCategories } from '../../redux/Category/CategorySelectors'
import { AiFillDelete } from 'react-icons/ai'

interface ExpenseListProps {}

const ExpenseList = ({}: ExpenseListProps) => {
  const dispatch = useTypificatedDispatch()
  const expenses = useTypificatedSelector(selectExpenses)
  const categories = useTypificatedSelector(selectCategories)

  useEffect(() => {
    dispatch(GetAllExpenses())
  }, [dispatch])

  const handleDelete = (id: number) => {
    dispatch(DeleteExpense(id))
  }
  return (
    <div>
      <table className={styles.expenseList}>
        <tr className={styles.expenseHeadRows}>
          <th>опис</th>
          <th>дата</th>
          <th>категорія</th>
          <th>сума</th>
          <th></th>
        </tr>
        {expenses.map(expense => {
          return (
            <tr key={expense.id} className={styles.expenseContent}>
              <div className={styles.title}>
                <div className={styles.info}>
                  <td className={styles.category}>
                    {
                      categories.find(
                        category => category.id === expense.category_id
                      )?.name
                    }
                  </td>
                  <td className={styles.date}>{expense.date}</td>
                </div>
                <td className={styles.descr}>{expense.description}</td>
              </div>
              <div className={styles.amount_info}>
                <td className={styles.amountTxt}>-{expense.amount} грн</td>
                <td >
                  <button className={styles.btnDelete} onClick={() => handleDelete(expense.id)}>
                    <AiFillDelete />
                  </button>
                </td>
              </div>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default ExpenseList
