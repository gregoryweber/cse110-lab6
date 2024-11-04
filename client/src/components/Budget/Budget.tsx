import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budgent-utils";

const Budget = () => {
  const context = useContext(AppContext);

  const [budget, setBudget] = useState(context.budget);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    loadBudget();
  }, []);

  const loadBudget = async () => {
    try {
      const budget = await fetchBudget();
      context.setBudget(budget);
      setBudget(context.budget);
    } catch (error) {
      console.error("Failed to fetch budget", error);
    }
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {editMode ? (
        <div>
          <input
            required
            type="text"
            id="budget"
            value={budget}
            onChange={(event) => {
              if (event.target.value === "") {
                setBudget(0);
              } else {
                setBudget(parseInt(event.target.value));
              }
            }}></input>
          <button
            className="btn btn-primary"
            onClick={() => {
              updateBudget(budget);
              context.setBudget(budget);
              setEditMode(!editMode);
            }}>
            Submit
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ paddingRight: "10px" }}>Budget: {context.budget}</div>
          <button
            className="btn btn-primary"
            onClick={() => setEditMode(!editMode)}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Budget;
