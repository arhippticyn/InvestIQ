import { selectBudget } from "../../redux/Budget/BudgetSelectors";
import { selectCategories } from "../../redux/Category/CategorySelectors";
import {
  GetAllFinances,
  type FinanceType,
} from "../../redux/Finance/FinanceOperation";
import { selectFinances } from "../../redux/Finance/FinanceSelectors";
import Budget from "../Budget/Budget";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  useTypificatedDispatch,
  useTypificatedSelector,
} from "../../hooks/hooks";
import styles from "../../sass/components/ReportPage/ReportPage.module.scss";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiArrowDropLeftLine } from "react-icons/ri";
import { RiArrowDropRightLine } from "react-icons/ri";

const months = [
  "СІЧЕНЬ",
  "ЛЮТИЙ",
  "БЕРЕЗЕНЬ",
  "КВІТЕНЬ",
  "ТРАВЕНЬ",
  "ЧЕРВЕНЬ",
  "ЛИПЕНЬ",
  "СЕРПЕНЬ",
  "ВЕРЕСЕНЬ",
  "ЖОВТЕНЬ",
  "ЛИСТОПАД",
  "ГРУДЕНЬ",
];

type ExpensesByCategoryType = Record<string, number>;

export default function ReportPage() {
  const dispatch = useTypificatedDispatch();

  const budget = useTypificatedSelector(selectBudget);
  const finances = useTypificatedSelector(selectFinances);
  const categories = useTypificatedSelector(selectCategories);

  const [newBudget, setNewBudget] = useState<string>(String(budget));
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeType, setActiveType] = useState<"expense" | "incomes">(
    "expense",
  );

  useEffect(() => {
    setNewBudget(String(budget));
  }, [budget]);

  useEffect(() => {
    dispatch(GetAllFinances(activeType));
  }, [dispatch, activeType]);

  const handlePrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  const isCurrentMonth = useMemo(() => {
    const today = new Date();

    return (
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  }, [currentMonth]);

  const filteredFinances = useMemo(() => {
    return finances.filter((finance) => {
      const date = new Date(finance.date);

      return (
        date.getMonth() === currentMonth.getMonth() &&
        date.getFullYear() === currentMonth.getFullYear()
      );
    });
  }, [finances, currentMonth]);

  const amountByCategory = useMemo(() => {
    return filteredFinances.reduce(
      (acc, item) => {
        const category = categories.find((cat) => cat.id === item.category_id);
        const categoryName = category?.name || "Без категорії";

        if (!acc[categoryName]) {
          acc[categoryName] = 0;
        }

        acc[categoryName] += item.amount;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [filteredFinances, categories]);

  return (
    <>
      <Header></Header>

      <section className={styles.report}>
        <div className={styles.reportGoBack}>
          <button className={styles.reportGoBackButton}>
            <span className={styles.reportGoBackIcon}>
              <FaArrowLeftLong></FaArrowLeftLong>
            </span>
            Повернутись на головну
          </button>
        </div>

        <Budget
          newBudget={newBudget}
          setNewBudget={setNewBudget}
          budget={budget}
        ></Budget>

        <div className={styles.reportDateSwitch}>
          <p className={styles.reportDateParagraph}>Поточний період</p>
          <div className={styles.reportDateSwitchButtons}>
            <button
              className={styles.reportDatePrevMonth}
              onClick={handlePrevMonth}
            >
              <RiArrowDropLeftLine></RiArrowDropLeftLine>
            </button>

            <p className={styles.reportDateCurrentDate}>
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </p>

            <button
              className={styles.reportDateNextMonth}
              onClick={handleNextMonth}
              disabled={isCurrentMonth}
            >
              <RiArrowDropRightLine></RiArrowDropRightLine>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
