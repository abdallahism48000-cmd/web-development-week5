let monthlyBudget = 2500;
let expenses = [
  { name: "Groceries", amount: 320 },
  { name: "Internet", amount: 75 },
  { name: "Transportation", amount: 180 },
  { name: "Coffee", amount: 45 }
];

const currencyFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  minimumFractionDigits: 2
});

function safePrompt(message) {
  try {
    return prompt(message);
  } catch (error) {
    console.log("Browser prompts are unavailable in this environment.");
    return null;
  }
}

function getPositiveNumber(value, label) {
  const number = Number(value);

  if (!Number.isFinite(number) || number <= 0) {
    console.log(`${label}: invalid value entered.`);
    return null;
  }

  return number;
}

function calculateTotalExpenses(expenseList) {
  return expenseList.reduce((total, expense) => total + expense.amount, 0);
}

function calculateRemainingBalance(budget, totalSpent) {
  return budget - totalSpent;
}

function calculateUsagePercentage(budget, totalSpent) {
  if (budget <= 0) return 0;
  return (totalSpent / budget) * 100;
}

function collectBudget() {
  let budget = null;

  while (budget === null) {
    const input = safePrompt("Enter your monthly budget (for example, 2500):");

    if (input === null) return;

    budget = getPositiveNumber(input, "Monthly budget");
  }

  monthlyBudget = budget;
  expenses = [];

  const expenseCountInput = safePrompt("How many expenses would you like to enter?");

  if (expenseCountInput !== null) {
    const expenseCount = Number.parseInt(expenseCountInput, 10);

    if (Number.isInteger(expenseCount) && expenseCount > 0) {
      for (let index = 0; index < expenseCount; index += 1) {
        collectExpense(index + 1);
      }
    }
  }

  updateDashboard();
}

function collectExpense(expenseNumber) {
  let name = safePrompt(`Expense ${expenseNumber}: Enter a name (for example, Groceries):`);

  if (name === null) return;
  name = name.trim();

  if (!name) name = `Expense ${expenseNumber}`;

  let amount = null;
  while (amount === null) {
    const input = safePrompt(`Enter the amount for "${name}":`);

    if (input === null) return;

    amount = getPositiveNumber(input, `Amount for ${name}`);
  }

  expenses.push({ name, amount });
}

function addExpense() {
  collectExpense(expenses.length + 1);
  updateDashboard();
}

function updateDashboard() {
  const totalExpenses = calculateTotalExpenses(expenses);
  const remainingBalance = calculateRemainingBalance(monthlyBudget, totalExpenses);
  const usagePercentage = calculateUsagePercentage(monthlyBudget, totalExpenses);
  const displayPercentage = Math.min(usagePercentage, 100);

  document.getElementById("monthlyBudget").textContent = currencyFormatter.format(monthlyBudget);
  document.getElementById("totalExpenses").textContent = currencyFormatter.format(totalExpenses);
  document.getElementById("remainingBalance").textContent = currencyFormatter.format(remainingBalance);
  document.getElementById("expenseCount").textContent = `${expenses.length} ${expenses.length === 1 ? "expense" : "expenses"}`;
  document.getElementById("progressPercent").textContent = `${Math.round(usagePercentage)}% used`;

  const progressFill = document.getElementById("progressFill");
  progressFill.style.width = `${displayPercentage}%`;
  progressFill.style.background = usagePercentage > 100 ? "var(--red)" : "var(--green)";

  const progressTrack = document.querySelector(".progress-track");
  progressTrack.setAttribute("aria-valuenow", String(Math.round(displayPercentage)));

  const status = document.getElementById("budgetStatus");
  if (monthlyBudget === 0) {
    status.textContent = "Waiting for budget";
    status.classList.remove("over");
  } else if (remainingBalance >= 0) {
    status.textContent = "Within budget";
    status.classList.remove("over");
  } else {
    status.textContent = "Over budget";
    status.classList.add("over");
  }

  renderExpenses();
  printConsoleResults(monthlyBudget, totalExpenses, remainingBalance, usagePercentage);
}

function renderExpenses() {
  const expenseList = document.getElementById("expenseList");

  if (expenses.length === 0) {
    expenseList.innerHTML = '<p class="empty-state">No expenses added yet.</p>';
    return;
  }

  expenseList.innerHTML = expenses.map((expense, index) => `
    <div class="expense-item">
      <div class="expense-icon">${index + 1}</div>
      <div class="expense-name">${escapeHtml(expense.name)}</div>
      <div class="expense-amount">${currencyFormatter.format(expense.amount)}</div>
    </div>
  `).join("");
}

function escapeHtml(text) {
  const element = document.createElement("div");
  element.textContent = text;
  return element.innerHTML;
}

function printConsoleResults(budget, totalSpent, balance, percentage) {
  console.clear();
  console.log("===== SPENDWISE BUDGET SUMMARY =====");
  console.log(`Monthly Budget: ${currencyFormatter.format(budget)}`);
  console.log(`Total Expenses: ${currencyFormatter.format(totalSpent)}`);
  console.log(`Remaining Balance: ${currencyFormatter.format(balance)}`);
  console.log(`Budget Used: ${percentage.toFixed(1)}%`);
  console.log("Expenses:", expenses);
}

document.getElementById("addExpense").addEventListener("click", addExpense);
document.getElementById("resetBudget").addEventListener("click", collectBudget);

updateDashboard();
