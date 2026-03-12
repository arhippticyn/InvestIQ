import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../hooks/hooks'
import styles from '../../sass/components/Expense/Expense.module.scss'
import { selectResult } from '../../redux/Finance/FinanceSelectors'
import { useEffect } from 'react'
import { GetResultFinance } from '../../redux/Finance/FinanceOperation'

interface ResultProps {
  type: 'incomes' | 'expense'
}

const Result = ({ type }: ResultProps) => {
  const dispatch = useTypificatedDispatch()
  const results = useTypificatedSelector(selectResult)
  const date = new Date()

  useEffect(() => {
    dispatch(GetResultFinance({ type: type, year: date.getFullYear() }))
  }, [dispatch, type])
  return (
    <table className={styles.resultsTable}>
      <thead className={styles.resultsTableHead}>
        <th className={styles.resultsTableHeadTitle}>зведення</th>
      </thead>
      <tbody className={styles.resultsTableBody}>
        {results.map(result => {
          return (
            <tr className={styles.resultsTableContainer} key={result.month}>
              <td className={styles.resultsTableContainerMonth}>{result.month}</td>
              <td className={styles.resultsTableContainerTotal}>{result.total}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Result
