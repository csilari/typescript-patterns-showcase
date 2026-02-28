import { HiringRequest, HIRING_ROLES, HiringRole } from "./types";
import { ApprovalResult } from "../../core/types";

/**
 * Defines the rules for approving or rejecting expenses based on the category and the amount.
 * @returns A Map where every possible value of HiringRole must have a function that returns an ApprovalResult based on an HiringRequest.
 */
export const hiringRules: {
  [K in HiringRole]: (request: HiringRequest) => ApprovalResult;
} = {
  [HIRING_ROLES.SOFTWARE_ENGINEER]: (request) =>
    request.salary < 50000
      ? { status: "APPROVED" }
      : {
          status: "MANUAL_REVIEW",
          reason: "Software engineers over 50000 require review.",
        },

  [HIRING_ROLES.DESIGNER]: (request) =>
    request.salary < 50000
      ? { status: "APPROVED" }
      : {
          status: "MANUAL_REVIEW",
          reason: "Designers over 50000 require review.",
        },

  [HIRING_ROLES.PRODUCT_MANAGER]: (request) =>
    request.salary < 50000
      ? { status: "APPROVED" }
      : {
          status: "MANUAL_REVIEW",
          reason: "Product managers over 50000 require review.",
        },
};
