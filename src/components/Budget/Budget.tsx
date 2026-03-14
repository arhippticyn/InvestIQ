import React from "react";
import StarterBudgetModal from "../StarterBudgetModal/StarterBudgetModal";
import { getBudget, updateBudget } from "../../redux/Budget/BudgetOperations";
import { useTypificatedDispatch } from "../../hooks/hooks";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import styles from "../../sass/components/Budget/Budget.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { SlChart } from "react-icons/sl";

interface BudgetProps {
  newBudget: string;
  setNewBudget: React.Dispatch<React.SetStateAction<string>>;
  budget: number;
}

export default function Budget({
  newBudget,
  setNewBudget,
  budget,
}: BudgetProps) {
  const dispatch = useTypificatedDispatch();

  useEffect(() => {
    dispatch(getBudget());
    setNewBudget(String(budget));
  }, [budget]);

  const handleBudget = async () => {
    try {
      if (Number(newBudget) === 0) {
        toast.warning("Баланс не можна змінити на 0");
        return;
      }

      if (Number(newBudget) === budget) {
        toast.warning("Баланс має змінитися");
        return;
      }

      await dispatch(updateBudget(Number(newBudget)));
      toast.success("Баланс успішно оновлено!");
    } catch (err) {
      toast.error("Щось пішло не так при оновленні балансу");
    }
  };

  return (
    <>
      <div className={styles.mobileContainer}>
        <div className={styles.mobileChart}>
          <button className={styles.mobileChartParagraph}>
            Перейти до розрахунків {<SlChart></SlChart>}
          </button>
        </div>

        <div className={styles.container}>
          <p className={styles.text}>Баланс: </p>
          <div className={styles.budgetCotainer}>
            <input
              type="number"
              className={styles.input}
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
            />
            <button className={styles.btn} type="button" onClick={handleBudget}>
              Підтвердити
            </button>

            <StarterBudgetModal></StarterBudgetModal>
          </div>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
}
