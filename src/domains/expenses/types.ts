export const CURRENCIES = {
  EUR: "EUR",
  USD: "USD",
  GBP: "GBP",
} as const;

export type Currency = (typeof CURRENCIES)[keyof typeof CURRENCIES];

export const EXPENSE_CATEGORIES = {
  SOFTWARE: "Software",
  HARDWARE: "Hardware",
  TRAVEL: "Travel",
} as const;

export type ExpenseCategory =
  (typeof EXPENSE_CATEGORIES)[keyof typeof EXPENSE_CATEGORIES];

export interface ExpenseRequest {
  category: ExpenseCategory;
  amount: number;
  currency: Currency;
}
