import { EXPENSE_CATEGORIES, ExpenseCategory, ExpenseRequest } from "./types";
import { ApprovalResult } from "../../core/types";

/**
 * Defines the rules for approving or rejecting expenses based on the category and the amount.
 * @returns A Map where every possible value of ExpenseCategory must have a function that returns an ApprovalResult based on an ExpenseRequest.
 */
export const expenseRules: {
  [K in ExpenseCategory]: (request: ExpenseRequest) => ApprovalResult;
} = {
  [EXPENSE_CATEGORIES.SOFTWARE]: (request) =>
    request.amount < 500
      ? { status: "APPROVED" }
      : {
          status: "MANUAL_REVIEW",
          reason: "Software expenses over 500 require review.",
        },

  [EXPENSE_CATEGORIES.HARDWARE]: () => ({
    status: "MANUAL_REVIEW",
    reason: "Hardware expenses always require manual review.",
  }),

  [EXPENSE_CATEGORIES.TRAVEL]: (request) =>
    request.currency === "GBP" && request.amount < 1000
      ? { status: "APPROVED" }
      : {
          status: "MANUAL_REVIEW",
          reason: "Travel over 1000 or non-GBP requires review.",
        },
};
