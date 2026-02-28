import { expenseEngine } from "./domains/expenses";
import { hiringEngine } from "./domains/hiring";
import { ApprovalResult, Domain, Engine } from "./core/types";

const approvalHub: Record<Domain, Engine> = {
  EXPENSE: expenseEngine,
  HIRING: hiringEngine,
};

/**
 * The Dispatcher / Router
 * Responsibility: Coordinating between the Transport Layer (API)
 * and the Domain Engines stored in the approvalHub.
 */
export function routeRequest(domain: Domain, data: unknown): ApprovalResult {
  const engine = approvalHub[domain];
  return engine
    ? engine(data)
    : { status: "MANUAL_REVIEW", reason: "Unknown Domain" };
}
