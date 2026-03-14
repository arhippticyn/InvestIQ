import { useEffect, useState, forwardRef } from 'react'
import { useTypificatedDispatch, useTypificatedSelector } from '../../hooks/hooks'
import { selectCategories } from '../../redux/Category/CategorySelectors'
import styles from '../../sass/components/Expense/Expense.module.scss'
import { GetAllCategory } from '../../redux/Category/CategoryOperation'
import { SelectId } from '../../redux/Category/CategorySlice'
import { useForm } from 'react-hook-form'
import { AddFinance, ClearAllFinances } from '../../redux/Finance/FinanceOperation'
import { updateBudget } from '../../redux/Budget/BudgetOperations'
import { selectBudget } from '../../redux/Budget/BudgetSelectors'
import { FaCalculator } from 'react-icons/fa6'
import { MdCalendarMonth } from 'react-icons/md'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { uk } from 'date-fns/locale'

interface FinanceFormProps {
  type: 'incomes' | 'expense'
}

type FormValues = {
  description: string
  amount: number
  date: string
  category_id: number
}

const CustomDateInput = forwardRef(({ value, onClick }: any, ref: any) => (
  <div className={styles.datePickerWrapper} onClick={onClick} ref={ref}>
    <MdCalendarMonth className={styles.calendarIcon} />
    <span className={styles.dateValue}>{value}</span>
  </div>
));

const FinanceForm = ({ type }: FinanceFormProps) => {
  const dispatch = useTypificatedDispatch()
  const budget = useTypificatedSelector(selectBudget)
  const categories = useTypificatedSelector(selectCategories)
  const [startDate, setStartDate] = useState<Date | null>(new Date())

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
  }, [categories, setValue])

  const OnSubmit = (data: FormValues) => {
    const finalDate = startDate ? startDate.toISOString() : new Date().toISOString();

    dispatch(AddFinance({
      finance: {
        ...data,
        date: finalDate
      },
      type: type
    }));

    if (type === 'expense') {
      dispatch(updateBudget(budget - data.amount))
    } else {
      dispatch(updateBudget(budget + data.amount))
    }
  }

  return (
    <form className={styles.expenseForm} onSubmit={handleSubmit(OnSubmit)}>
      <div className={styles.background}></div>
      <div className={styles.formContainer}>
        <div className={styles.formWrapper}>

          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            locale={uk}
            dateFormat="dd.MM.yyyy"
            customInput={<CustomDateInput />}
          />

          <input
            {...register('description')}
            type="text"
            placeholder="Опис товару"
            className={styles.input_descr}
          />
          <select
            className={styles.categoriesSelect}
            {...register('category_id', { valueAsNumber: true })}
            onChange={e => dispatch(SelectId(Number(e.target.value)))}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.input_amount_wrapper}>
          <input
            {...register('amount', {
              setValueAs: (v: string) => {
                if (!v) return 0
                const num = parseFloat(v.replace(',', '.'))
                return num
              },
              validate: (value) => value >= 0 || "Сума повинна бути більше нуля"
            })}
            type="text"
            placeholder="0.00"
            className={styles.input_amount}
          />
          <FaCalculator className={styles.input_icon} />
        </div>
      </div>

      <div className={styles.btns}>
        <button type="submit" className={styles.expense_btn}>
          Ввести
        </button>
        <button
          type="button"
          onClick={() => dispatch(ClearAllFinances(type))}
          className={styles.clear_btn}
        >
          Очистити
        </button>
      </div>
    </form>
  )
}

export default FinanceForm