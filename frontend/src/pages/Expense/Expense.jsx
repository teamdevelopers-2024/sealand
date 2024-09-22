import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ExpenseBody from "../../components/Expense Body/ExpenseBody";
import AddExpense from "../../components/Add Expense/AddExpense";

const Expense = () => {
    const [addIncomeModal, setAddIncomeModal] = useState(false);
  return (
    <>
      <Navbar setAddIncomeModal={setAddIncomeModal} />
      <ExpenseBody />
      {addIncomeModal && <AddExpense />}
    </>
  );
};

export default Expense;
