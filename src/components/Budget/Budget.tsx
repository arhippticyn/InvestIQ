import { selectBudget } from "../../redux/Budget/BudgetSelectors";
import { getBudget, updateBudget } from "../../redux/Budget/BudgetOperations";
import { useTypificatedDispatch, useTypificatedSelector } from "../../hooks/hooks";
import { useEffect, useState } from "react";
import styles from '../../sass/components/Budget/Budget.module.scss'
import React from "react";

interface BudgetProps {
    newBudget: string,
    setNewBudget: React.Dispatch<React.SetStateAction<string>>,
    budget: number
}

export default function Budget({ newBudget, setNewBudget, budget }: BudgetProps) {
    const dispatch = useTypificatedDispatch()

    useEffect(() => {
        dispatch(getBudget())
        setNewBudget(String(budget))
    }, [budget])

    const handleBudget = function () {
        dispatch(updateBudget(Number(newBudget)))
    }

    return (
        <>
            <div className={styles.container}>
                <p className={styles.text}>Баланс: </p>
                <div className={styles.budgetCotainer}>
                    <input
                        type="number"
                        className={styles.input}
                        value={newBudget}
                        onChange={(e) => setNewBudget(e.target.value)}
                    />
                    <button className={styles.btn} type="button" onClick={handleBudget}>Підтвердити</button>
                </div>
            </div>
        </>
    )


}