import { approvalContainer } from "./core/container";
import { Domain, ApprovalResult } from "./core/types";

/**
 * The Dispatcher / Router
 * Responsibility: Coordinating between the Transport Layer (API)
 * and the Domain Engines stored in the Container.
 */
export function routeRequest(domain: Domain, data: unknown): ApprovalResult {
  try {
    const engine = approvalContainer.resolve(domain);
    return engine(data);
  } catch (error) {
    return {
      status: "MANUAL_REVIEW",
      reason: error instanceof Error ? error.message : "Internal Router Error",
    };
  }
}
