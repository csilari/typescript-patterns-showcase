import { hiringApprovalEngine } from "../../../src/domains/hiring";

describe("Hiring Approval Engine", () => {
  const cases = [
    // --- Software Engineer Rules ---
    {
      name: "Auto-approves Software Engineer under 50000",
      input: { name: "John Doe", role: "Software Engineer", salary: 49999 },
      expected: { status: "APPROVED" },
    },
    {
      name: "Requires review for Software Engineer over 50000",
      input: { name: "John Doe", role: "Software Engineer", salary: 50001 },
      expected: {
        status: "MANUAL_REVIEW",
        reason: "Software engineers over 50000 require review.",
      },
    },

    // --- Designer Rules ---
    {
      name: "Auto-approves Designer under 50000",
      input: { name: "Jane Doe", role: "Designer", salary: 49999 },
      expected: { status: "APPROVED" },
    },
    {
      name: "Requires review for Designer over 50000",
      input: { name: "Jane Doe", role: "Designer", salary: 50001 },
      expected: {
        status: "MANUAL_REVIEW",
        reason: "Designers over 50000 require review.",
      },
    },

    // --- Product Manager Rules ---
    {
      name: "Auto-approves Product Manager under 50000",
      input: { name: "Jim Doe", role: "Product Manager", salary: 49999 },
      expected: { status: "APPROVED" },
    },
    {
      name: "Requires review for Product Manager over 50000",
      input: { name: "Jim Doe", role: "Product Manager", salary: 50001 },
      expected: {
        status: "MANUAL_REVIEW",
        reason: "Product managers over 50000 require review.",
      },
    },

    // --- Error Handling ---
    {
      name: "Returns manual review for invalid data structure",
      input: { garbage: "data" },
      expected: { status: "MANUAL_REVIEW", reason: "Invalid request format" },
    },
  ];

  // Run the table
  test.each(cases)("$name", ({ input, expected }) => {
    const result = hiringApprovalEngine(input);
    expect(result).toEqual(expected);
  });
});
