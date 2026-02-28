import { approvalContainer } from "../../core/container";
import { createApprovalEngine } from "../../core/factory";
import { isExpenseRequest } from "./guard";
import { expenseRules } from "./rules";

/**
 * Creates an Approval Engine function that can be used to approve or reject expenses based on the data and the rules provided.
 * @returns An Approval Engine function that can be used to approve or reject expenses.
 */
export const expenseApprovalEngine = createApprovalEngine(
  isExpenseRequest,
  "category",
  expenseRules,
);

// "Plugging in" the expense engine
approvalContainer.register("EXPENSE", expenseApprovalEngine);
