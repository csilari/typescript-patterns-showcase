import { ApprovalResult } from "./types";

/**
 * Creates an Approval Engine function that can be used to approve or reject requests based on the data and the rules provided.
 * @param isType - A Type Guard function: Proves 'untrusted' data is actually 'T'.
 * @param discriminator - The key we use to "switch" logic (e.g., 'category').
 * @param rules - A Map where every possible value of T[K] must have a function.
 * @returns An Approval Engine function that can be used to approve or reject requests.
 */
export function createApprovalEngine<
  T extends Record<string, any>,
  K extends keyof T,
>(
  isType: (data: any) => data is T,
  discriminator: K,
  rules: { [V in T[K]]: (data: T) => ApprovalResult },
) {
  return (untrustedData: unknown): ApprovalResult => {
    if (!isType(untrustedData)) {
      return { status: "MANUAL_REVIEW", reason: "Invalid request format" };
    }

    const data = untrustedData;
    const keyValue = data[discriminator];
    const handler = rules[keyValue];

    return handler(data);
  };
}
