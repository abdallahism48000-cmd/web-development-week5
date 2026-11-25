# SpendWise

SpendWise is a simple monthly budget tracker. It includes sample expenses, asks the user for a new budget and additional expenses when requested, calculates total spending and remaining balance, and displays the results on the page and in the browser console.

## JavaScript concepts implemented

- Variables and data types for numeric budget values and text expense names
- Arrays to store multiple expense objects
- `prompt()` input collection and input validation
- Arithmetic calculations using reusable functions
- String formatting with `Intl.NumberFormat`
- DOM selection and updating
- Event listeners for adding expenses and resetting the budget
- Template literals and conditional logic

## How variables are used

The script stores the monthly budget in `monthlyBudget`, the expense list in `expenses`, and derived values such as `totalExpenses` and `remainingBalance`. Expense objects contain a name and amount.

## How user input is collected

The page starts with a sample monthly budget and sample expenses. The reset button uses `prompt()` to ask the user for a new monthly budget and expenses. The **Add expense** button collects the name and amount of another expense.

## How calculations are performed

The `calculateTotalExpenses(expenses)` function adds all expense amounts. The `calculateRemainingBalance(monthlyBudget, totalExpenses)` function subtracts total spending from the monthly budget. `calculateUsagePercentage()` converts spending to a percentage of the budget.

## How functions organize the code

Reusable functions handle validation, totals, balance calculations, percentage calculations, page updates, console output, and expense entry. This keeps the program organized and avoids repeating calculation logic.

## Run the project

Open `index.html` in a browser. Allow prompts to appear, enter a valid monthly budget, and add expenses. Open the browser developer tools console (usually **F12**) to see clearly labeled budget results.
