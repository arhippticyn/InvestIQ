import { useEffect } from 'react'
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from '../../hooks/hooks'
import { selectCategories } from '../../redux/Category/CategorySelectors'
import styles from '../../sass/components/Expense/Expense.module.scss'
import { GetAllCategory } from '../../redux/Category/CategoryOperation'
import { SelectId } from '../../redux/Category/CategorySlice'
import { useForm } from 'react-hook-form'
import { AddExpense } from '../../redux/Expense/ExpenseOperation'

interface ExpenseFormProps {}

type FormValues = {
  description: string
  amount: number
  date: string
  category_id: number
}

const ExpenseForm = ({}: ExpenseFormProps) => {
  const dispatch = useTypificatedDispatch()
  const categories = useTypificatedSelector(selectCategories)



  const { register, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: { description: '', amount: 0, date: '', category_id: 0 },
    mode: 'onSubmit',
  })

    useEffect(() => {
    dispatch(GetAllCategory())
  }, [dispatch])


  useEffect(() => {
    if (categories.length > 0) {
      setValue('category_id', categories[0].id)
    }
  },[categories, setValue])

  const OnSubmit = (data: FormValues) => {
    dispatch(AddExpense({...data, date:new Date().toISOString()}))
  }

  return (
    <form className={styles.expenseForm} onSubmit={handleSubmit(OnSubmit)}>
      <input
        {...register('description')}
        type="text"
        placeholder="Опис товару"
        className={styles.input_descr}
      />
      <select
        className={styles.categoriesSelect}
        {...register('category_id', { valueAsNumber: true })}
        onChange={e => dispatch(SelectId(Number(e.target.value)))}>
        {categories.map(category => {
          return (
            <option
              key={category.id}
              className={styles.categoriesOption}
              value={category.id}
            >
              {category.name}
            </option>
          )
        })}
      </select>
      <input
        {...register('amount', { valueAsNumber: true })}
        type="number"
        placeholder="0,00"
        className={styles.input_amount}
        id=""
      />

      <button type="submit" className={styles.expense_btn}>
        Ввести
      </button>
    </form>
  )
}

export default ExpenseForm
