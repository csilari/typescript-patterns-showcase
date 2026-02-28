import { approvalContainer } from "../../core/container";
import { createApprovalEngine } from "../../core/factory";
import { isHiringRequest } from "./guard";
import { hiringRules } from "./rules";

/**
 * Creates an Approval Engine function that can be used to approve or reject hiring requests based on the data and the rules provided.
 * @returns An Approval Engine function that can be used to approve or reject hiring requests.
 */
export const hiringApprovalEngine = createApprovalEngine(
  isHiringRequest,
  "role",
  hiringRules,
);

// "Plugging in" the hiring engine
approvalContainer.register("HIRING", hiringApprovalEngine);
