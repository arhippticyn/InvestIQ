import { useEffect } from 'react'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../hooks/hooks'
import { selectFinances } from '../../redux/Finance/FinanceSelectors'
import styles from '../../sass/components/Expense/Expense.module.scss'
import {
  DeleteFinance,
  GetAllFinances,
} from '../../redux/Finance/FinanceOperation'
import { selectCategories } from '../../redux/Category/CategorySelectors'
import { AiFillDelete } from 'react-icons/ai'
import { format } from 'date-fns';

interface FinanceListProps {
  type: 'incomes' | 'expense'
}

const FinanceList = ({ type }: FinanceListProps) => {
  const dispatch = useTypificatedDispatch()
  const finances = useTypificatedSelector(selectFinances)
  const categories = useTypificatedSelector(selectCategories)

  useEffect(() => {
    dispatch(GetAllFinances(type))
  }, [dispatch, type])

  const handleDelete = (id: number) => {
    dispatch(DeleteFinance({ id: id, type: type }))
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
          {finances.map(finance => {
            const category = categories.find(
              category => category.id === finance.category_id
            )

            return (
              <tr key={finance.id} className={styles.expenseContent}>
                <td className={styles.descr}>{finance.description}</td>

                <td className={styles.date}>{format(new Date(finance.date), 'dd.MM.yyyy')}</td>

                <td className={styles.category}>
                  {category?.name}
                </td>

                <td className={`${styles.amountTxt} ${type === 'expense' ? styles.expenseText : styles.incomesText}`}>
                  {type === 'expense' ? '-' : ""}{finance.amount} грн
                </td>

                <td>
                  <button
                    className={styles.btnDelete}
                    onClick={() => handleDelete(finance.id)}
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

export default FinanceList