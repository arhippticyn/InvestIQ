import { selectBudget } from "../../redux/Budget/BudgetSelectors";
import { selectCategories } from "../../redux/Category/CategorySelectors";
import { GetAllCategory } from "../../redux/Category/CategoryOperation";
import {
  GetAllFinances,
  type FinanceType,
} from "../../redux/Finance/FinanceOperation";
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
import iconAlcohol from "../../assets/Report/alcohol.svg";
import iconBook from "../../assets/Report/book.svg";
import iconCar from "../../assets/Report/car.svg";
import iconClay from "../../assets/Report/clay.svg";
import iconCouch from "../../assets/Report/couch.svg";
import iconFood from "../../assets/Report/food.svg";
import iconHeart from "../../assets/Report/heart.svg";
import iconInvoice from "../../assets/Report/invoice.svg";
import iconKite from "../../assets/Report/kite.svg";
import iconTools from "../../assets/Report/tools.svg";
import iconUfo from "../../assets/Report/ufo.svg";
import iconSalary from "../../assets/Report/salary.svg";
import iconAdditionalSalary from "../../assets/Report/additionalSalary.svg";
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

const categoryIcons: Record<string, string> = {
  Продукти: iconFood,
  Алкоголь: iconAlcohol,
  Транспорт: iconCar,
  "Здоров’я": iconHeart,
  Розваги: iconKite,

  "Все для дому": iconCouch,
  Техніка: iconTools,
  "Комуналка, зв’язок": iconInvoice,
  "Спорт, хобі": iconClay,
  Навчання: iconBook,
  Інше: iconUfo,
  Зарплата: iconSalary,
  "Дод. прибуток": iconAdditionalSalary,
};
type AmountByCategoryType = Record<string, number>;

type FinanceItem = {
  id: number | string;
  amount: number;
  date: string;
  category_id: number;
  description?: string;
};

const expenseOrder = [
  "Продукти",
  "Алкоголь",
  "Розваги",
  "Здоров’я",
  "Транспорт",
  "Все для дому",
  "Техніка",
  "Комуналка, зв’язок",
  "Спорт, хобі",
  "Навчання",
  "Інше",
];

const incomeOrder = ["Зарплата", "Дод. прибуток"];

export default function ReportPage() {
  const dispatch = useTypificatedDispatch();

  const budget = useTypificatedSelector(selectBudget);
  const categories = useTypificatedSelector(selectCategories);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeType, setActiveType] = useState<FinanceType>("expense");

  const [expenses, setExpenses] = useState<FinanceItem[]>([]);
  const [incomes, setIncomes] = useState<FinanceItem[]>([]);

  useEffect(() => {
    const fetchFinances = async () => {
      try {
        const expenseData = await dispatch(GetAllFinances("expense")).unwrap();
        const incomeData = await dispatch(GetAllFinances("incomes")).unwrap();

        setExpenses(expenseData);
        setIncomes(incomeData);
      } catch (error) {
        console.error("Не вдалося завантажити фінанси", error);
      }
    };

    fetchFinances();
  }, [dispatch]);

  useEffect(() => {
    dispatch(GetAllCategory());
  }, [dispatch]);

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

  const monthExpenses = useMemo(() => {
    return expenses.filter((item) => {
      const date = new Date(item.date);

      return (
        date.getMonth() === currentMonth.getMonth() &&
        date.getFullYear() === currentMonth.getFullYear()
      );
    });
  }, [expenses, currentMonth]);

  const monthIncomes = useMemo(() => {
    return incomes.filter((item) => {
      const date = new Date(item.date);

      return (
        date.getMonth() === currentMonth.getMonth() &&
        date.getFullYear() === currentMonth.getFullYear()
      );
    });
  }, [incomes, currentMonth]);

  const totalExpenses = useMemo(() => {
    return monthExpenses.reduce((sum, item) => sum + item.amount, 0);
  }, [monthExpenses]);

  const totalIncomes = useMemo(() => {
    return monthIncomes.reduce((sum, item) => sum + item.amount, 0);
  }, [monthIncomes]);

  const visibleFinances = useMemo(() => {
    return activeType === "expense" ? monthExpenses : monthIncomes;
  }, [activeType, monthExpenses, monthIncomes]);

  const amountByCategory = useMemo(() => {
    return visibleFinances.reduce((acc, item) => {
      const category = categories.find((cat) => cat.id === item.category_id);
      const categoryName = category?.name || "Інше";

      if (!acc[categoryName]) {
        acc[categoryName] = 0;
      }

      acc[categoryName] += item.amount;
      return acc;
    }, {} as AmountByCategoryType);
  }, [visibleFinances, categories]);

  const visibleCategories = useMemo(() => {
    const order = activeType === "incomes" ? incomeOrder : expenseOrder;

    const filteredCategories =
      activeType === "incomes"
        ? categories.filter(
            (category) =>
              category.name === "Зарплата" || category.name === "Дод. прибуток",
          )
        : categories.filter(
            (category) =>
              category.name !== "Зарплата" && category.name !== "Дод. прибуток",
          );

    return filteredCategories.sort(
      (a, b) => order.indexOf(a.name) - order.indexOf(b.name),
    );
  }, [categories, activeType]);

  return (
    <>
      <Header></Header>

      <section className={styles.report}>
        <div className={styles.reportContainer}>
          <div className={styles.reportHeader}>
            <div className={styles.reportGoBack}>
              <Link to="/home" className={styles.reportGoBackButton}>
                <span className={styles.reportGoBackIcon}>
                  <FaArrowLeftLong />
                </span>
                <p className={styles.reportGoBackText}>
                  Повернутись на головну
                </p>
              </Link>
            </div>
            <div className={styles.reportWrapper}>
              <div className={styles.reportBalance}>
                <p className={styles.reportBalanceLabel}>Баланс:</p>

                <div className={styles.reportBalanceValue}>
                  {Number(budget).toFixed(2)} UAH
                </div>
              </div>
              <div className={styles.reportDateSwitch}>
                <p className={styles.reportDateParagraph}>Поточний період:</p>
                <div className={styles.reportDateSwitchButtons}>
                  <button
                    className={styles.reportDateSwitchButton}
                    onClick={handlePrevMonth}
                  >
                    <RiArrowDropLeftLine></RiArrowDropLeftLine>
                  </button>

                  <p className={styles.reportDateCurrentDate}>
                    {months[currentMonth.getMonth()]}{" "}
                    {currentMonth.getFullYear()}
                  </p>

                  <button
                    className={styles.reportDateSwitchButton}
                    onClick={handleNextMonth}
                    disabled={isCurrentMonth}
                  >
                    <RiArrowDropRightLine></RiArrowDropRightLine>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.reportSummary}>
            <div className={styles.reportSummaryItem}>
              <span className={styles.reportSummaryLabel}>Витрати:</span>
              <span
                className={`${styles.reportSummaryValue} ${styles.reportSummaryExpense}`}
              >
                - {totalExpenses.toFixed(2)} грн.
              </span>
            </div>

            <div className={styles.reportSummaryContainer} />

            <div className={styles.reportSummaryItem}>
              <span className={styles.reportSummaryLabel}>Доходи:</span>
              <span
                className={`${styles.reportSummaryValue} ${styles.reportSummaryIncome}`}
              >
                + {totalIncomes.toFixed(2)} грн.
              </span>
            </div>
          </div>
          <div className={styles.reportContent}>
            <div className={styles.reportContentSwitch}>
              <button
                type="button"
                className={styles.reportSwitchBtn}
                onClick={() => setActiveType("expense")}
                disabled={activeType === "expense"}
              >
                <RiArrowDropLeftLine />
              </button>

              <h2 className={styles.reportContentTitle}>
                {activeType === "expense" ? "ВИТРАТИ" : "ДОХОДИ"}
              </h2>

              <button
                type="button"
                className={styles.reportSwitchBtn}
                onClick={() => setActiveType("incomes")}
                disabled={activeType === "incomes"}
              >
                <RiArrowDropRightLine />
              </button>
            </div>

            <div className={styles.reportCategories}>
              {visibleCategories.length === 0 ? (
                <p className={styles.reportEmpty}>Категорій нема</p>
              ) : (
                visibleCategories.map((category) => {
                  const amount = amountByCategory[category.name] || 0;

                  return (
                    <div
                      className={styles.reportCategoryCard}
                      key={category.id}
                    >
                      <p className={styles.reportCategoryAmount}>
                        {amount.toFixed(2)}
                      </p>

                      <div className={styles.reportCategoryIcon}>
                        <img
                          src={categoryIcons[category.name]}
                          alt={category.name}
                          className={styles.reportCategoryIconImage}
                        />
                      </div>

                      <p className={styles.reportCategoryName}>
                        {category.name}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
