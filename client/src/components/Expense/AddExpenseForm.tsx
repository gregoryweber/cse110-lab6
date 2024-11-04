import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { createExpense } from "../../utils/expense-utils";

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here #DONE

  // Exercise: Create name and cost to state variables #DONE

  const context = useContext(AppContext);

  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);

  const [id, setId] = useState(0);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const expense = { id: id + "", description: name, cost: cost };
    setId(id + 1);
    createExpense(expense);
    context.setExpenses([...context.expenses, expense]);

    // Exercise: Add add new expense to expenses context array #DONE
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(event) => {
              if (event.target.value === "") {
                setCost(0);
              } else {
                setCost(parseInt(event.target.value));
              }
            }}></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
