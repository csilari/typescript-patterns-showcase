export type Domain = "EXPENSE" | "HIRING";

type ApprovalStatus = "APPROVED" | "MANUAL_REVIEW";

type AutoApprovalStatus = Extract<ApprovalStatus, "APPROVED">;

type ReviewApprovalStatus = Exclude<ApprovalStatus, "APPROVED">;

export type ApprovalResult =
  | { status: AutoApprovalStatus }
  | { status: ReviewApprovalStatus; reason: string };

export type Engine = (data: unknown) => ApprovalResult;
