export type Domain = "EXPENSE" | "HIRING";

type ApprovalStatus = "APPROVED" | "MANUAL_REVIEW";

export type ReviewApprovalStatus = Exclude<ApprovalStatus, "APPROVED">;

export type ApprovalResult =
  | { status: "APPROVED" }
  | { status: ReviewApprovalStatus; reason: string };

export type Engine = (data: unknown) => ApprovalResult;
