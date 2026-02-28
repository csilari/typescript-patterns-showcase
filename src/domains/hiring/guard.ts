import { HIRING_ROLES, HiringRole } from "./types";
import { HiringRequest } from "./types";

/**
 * A Type Guard function: Proves 'untrusted' data is actually 'HiringRequest'.
 * @param data - The data to check.
 * @returns true if the data is an HiringRequest, false otherwise.
 */
export function isHiringRequest(data: unknown): data is HiringRequest {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const { name, role, salary } = data as {
    name?: unknown;
    role?: unknown;
    salary?: unknown;
  };

  if (typeof name !== "string") {
    return false;
  }

  if (!Object.values(HIRING_ROLES).includes(role as HiringRole)) {
    return false;
  }

  if (typeof salary !== "number") {
    return false;
  }

  return true;
}
