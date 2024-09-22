import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import AddIncome from "../../components/Add Income/AddIncome";
import ExpenseBody from "../../components/Expense Body/ExpenseBody";

const Expense = () => {
    const [addIncomeModal, setAddIncomeModal] = useState(false);
  return (
    <>
      <Navbar setAddIncomeModal={setAddIncomeModal} />
      <ExpenseBody />
      {addIncomeModal && <AddIncome />}
    </>
  );
};

export default Expense;
