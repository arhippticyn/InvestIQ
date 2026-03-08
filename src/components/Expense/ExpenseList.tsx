import { useEffect } from 'react'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../hooks/hooks'
import {
  selectExpenseId,
  selectExpenses,
} from '../../redux/Expense/ExpireSelectors'
import {
  DeleteExpense,
  GetAllExpenses,
} from '../../redux/Expense/ExpenseOperation'
import { selectCategories } from '../../redux/Category/CategorySelectors'
import { SelectIdExpense } from '../../redux/Expense/ExpenseSlice'
import { RiDeleteBin6Line } from 'react-icons/ri'

interface ExpenseListProps {}

const ExpenseList = ({}: ExpenseListProps) => {
  const dispatch = useTypificatedDispatch()
  const expenses = useTypificatedSelector(selectExpenses)
  const categories = useTypificatedSelector(selectCategories)
  const expenseId = useTypificatedSelector(selectExpenseId)

  useEffect(() => {
    dispatch(GetAllExpenses())
  }, [dispatch])

  const handleDelete = (id: number) => {
    dispatch(DeleteExpense(id))
  }
  return (
    <div>
      <table>
        <tr>
          <th>дата</th>
          <th>опис</th>
          <th>категорія</th>
          <th>сума</th>
          <th></th>
        </tr>
        
        {expenses.map(expense => {
          return (
            <tr key={expense.id}>
              <td>{expense.date}</td>
              <td>{expense.description}</td>
              <td>
                {
                  categories.find(
                    category => category.id === expense.category_id
                  )?.name
                }
              </td>
              <td>{expense.amount}</td>
              <td>
                <button onClick={() => handleDelete(expense.id)}>
                  <RiDeleteBin6Line />
                </button>
              </td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default ExpenseList
