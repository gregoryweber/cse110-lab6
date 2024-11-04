# Expense Tracker Test Cases

## 1. Add Expense

This test verifies that a new expense can be added correctly.

**Steps:**
1. Render the App component
2. Enter "Test Expense" in the Name field
3. Enter 100 in the Cost field
4. Click the Save button

**Expectations:**
- The expense "Test Expense" is displayed
- The cost "$100" is displayed
- The remaining budget is updated to "$900"
- The spent amount is updated to "$100"
- The total budget remains "$1000"

## 2. Delete Expense

This test checks if an expense can be deleted properly.

**Steps:**
1. Render the App component
2. Add an expense (same as in the Add Expense test)
3. Click the delete button ("x") for the added expense

**Expectations:**
- The remaining budget returns to "$1000"
- The spent amount returns to "$0"
- The "Test Expense" is no longer visible in the document

## 3. Budget Verification

This test ensures that the budget calculations are correct.

**Steps:**
1. Render the App component
2. Add an expense of $100

**Expectations:**
- The remaining budget is updated to "$900"
- The spent amount is updated to "$100"
- The total budget remains "$1000"
- The sum of remaining budget and spent amount equals the total budget

## 4. Negative Remaining

This test checks how the app handles expenses exceeding the budget.

**Steps:**
1. Render the App component
2. Add an expense of $1001

**Expectations:**
- The remaining budget shows "$-1"
- The spent amount shows "$1001"

## 5. Budget Alert

This test verifies that an alert is triggered when the budget is exceeded.

**Steps:**
1. Render the App component
2. Set up a spy on the window.alert function
3. Add an expense of $1001

**Expectations:**
- The alert function is called

These tests cover various aspects of the expense tracker application, including adding and deleting expenses, budget calculations, handling negative balances, and alerting when the budget is exceeded.
