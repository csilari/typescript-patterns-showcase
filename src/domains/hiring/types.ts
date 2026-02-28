export const HIRING_ROLES = {
  SOFTWARE_ENGINEER: "Software Engineer",
  DESIGNER: "Designer",
  PRODUCT_MANAGER: "Product Manager",
} as const;

export type HiringRole = (typeof HIRING_ROLES)[keyof typeof HIRING_ROLES];

export interface HiringRequest {
  name: string;
  role: HiringRole;
  salary: number;
}
