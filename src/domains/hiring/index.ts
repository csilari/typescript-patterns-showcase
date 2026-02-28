import { createApprovalEngine } from "../../core/factory";
import { isHiringRequest } from "./guard";
import { hiringRules } from "./rules";

/**
 * Creates an Approval Engine function that can be used to approve or reject hiring requests based on the data and the rules provided.
 * @returns An Approval Engine function that can be used to approve or reject hiring requests.
 */
export const hiringEngine = createApprovalEngine(
  isHiringRequest,
  "role",
  hiringRules,
);
