import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("Expense Modifications", () => {
  test("Add Expense", () => {
    render(<App />);
    const name = screen.getByLabelText("Name");
    const cost = screen.getByLabelText("Cost");
    const saveButton = screen.getByText("Save");

    fireEvent.change(name, { target: { value: "Test Expense" } });
    fireEvent.change(cost, { target: { value: 100 } });
    fireEvent.click(saveButton);

    expect(screen.getByText("Test Expense")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("Remaining: $900")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $100")).toBeInTheDocument();
    expect(screen.getByText("Budget: 1000")).toBeInTheDocument();
  });
  test("Delete Expense", () => {
    render(<App />);
    const name = screen.getByLabelText("Name");
    const cost = screen.getByLabelText("Cost");
    const saveButton = screen.getByText("Save");

    fireEvent.change(name, { target: { value: "Test Expense" } });
    fireEvent.change(cost, { target: { value: 100 } });
    fireEvent.click(saveButton);
    const deleteButton = screen.getByText("x");
    fireEvent.click(deleteButton);
    expect(screen.getByText("Remaining: $1000")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $0")).toBeInTheDocument();

    const nameQuery = screen.queryByText("Test Expense");
    expect(nameQuery).toBeNull();
  });
  test("Budget Verification", () => {
    render(<App />);
    const name = screen.getByLabelText("Name");
    const cost = screen.getByLabelText("Cost");
    const saveButton = screen.getByText("Save");

    const getExpenses = screen.getByText("Spent so far: $0");
    const getRemaining = screen.getByText("Remaining: $1000");
    const getBudget = screen.getByText("Budget: 1000");

    fireEvent.change(name, { target: { value: "Test Expense" } });
    fireEvent.change(cost, { target: { value: 100 } });
    fireEvent.click(saveButton);

    expect(screen.getByText("Remaining: $900")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $100")).toBeInTheDocument();
    expect(screen.getByText("Budget: 1000")).toBeInTheDocument();
    expect(
      parseInt(getRemaining.innerHTML.split(": $")[1]) +
        parseInt(getExpenses.innerHTML.split(": $")[1])
    ).toEqual(parseInt(getBudget.innerHTML.split(": ")[1]));
  });
  test("Negative Remaining", () => {
    render(<App />);
    const name = screen.getByLabelText("Name");
    const cost = screen.getByLabelText("Cost");
    const saveButton = screen.getByText("Save");

    fireEvent.change(name, { target: { value: "Test Expense" } });
    fireEvent.change(cost, { target: { value: 1001 } });
    fireEvent.click(saveButton);
    expect(screen.getByText("Remaining: $-1")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $1001")).toBeInTheDocument();
  });
  test("Budget Alert is called", () => {
    render(<App />);
    const spy = jest.spyOn(window, "alert");
    const name = screen.getByLabelText("Name");
    const cost = screen.getByLabelText("Cost");
    const saveButton = screen.getByText("Save");

    fireEvent.change(name, { target: { value: "Test Expense" } });
    fireEvent.change(cost, { target: { value: 1001 } });
    fireEvent.click(saveButton);

    expect(spy).toBeCalled();
  });
});
