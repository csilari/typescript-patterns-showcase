import {
  CURRENCIES,
  Currency,
  EXPENSE_CATEGORIES,
  ExpenseCategory,
  ExpenseRequest,
} from "./types";

/**
 * A Type Guard function: Proves 'untrusted' data is actually 'ExpenseRequest'.
 * @param data - The data to check.
 * @returns true if the data is an ExpenseRequest, false otherwise.
 */
export function isExpenseRequest(data: unknown): data is ExpenseRequest {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const { amount, category, currency } = data as {
    amount?: unknown;
    category?: unknown;
    currency?: unknown;
  };

  if (typeof amount !== "number") {
    return false;
  }

  if (
    !Object.values(EXPENSE_CATEGORIES).includes(category as ExpenseCategory)
  ) {
    return false;
  }

  if (!Object.values(CURRENCIES).includes(currency as Currency)) {
    return false;
  }

  return true;
}
