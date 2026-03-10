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
import { format } from 'date-fns';

const ExpenseList = () => {
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
    <div className={styles.tableWrapper}>
      <table className={styles.expenseList}>
        <thead>
          <tr className={styles.expenseHeadRows}>
            <th>опис</th>
            <th>дата</th>
            <th>категорія</th>
            <th>сума</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {expenses.map(expense => {
            const category = categories.find(
              category => category.id === expense.category_id
            )

            return (
              <tr key={expense.id} className={styles.expenseContent}>
                <td className={styles.descr}>{expense.description}</td>

                <td className={styles.date}>{format(new Date(expense.date), 'dd.MM.yyyy')}</td>

                <td className={styles.category}>
                  {category?.name}
                </td>

                <td className={styles.amountTxt}>
                  -{expense.amount} грн
                </td>

                <td>
                  <button
                    className={styles.btnDelete}
                    onClick={() => handleDelete(expense.id)}
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ExpenseList