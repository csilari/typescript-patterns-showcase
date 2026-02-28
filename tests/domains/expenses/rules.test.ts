import { expenseApprovalEngine } from "../../../src/domains/expenses";

describe("Expense Approval Engine", () => {
  const cases = [
    // --- Software Rules ---
    {
      name: "Auto-approves Software under 500",
      input: { amount: 499, category: "Software", currency: "EUR" },
      expected: { status: "APPROVED" },
    },
    {
      name: "Requires review for Software over 500",
      input: { amount: 501, category: "Software", currency: "EUR" },
      expected: {
        status: "MANUAL_REVIEW",
        reason: "Software expenses over 500 require review.",
      },
    },

    // --- Hardware Rules ---
    {
      name: "Always requires review for Hardware",
      input: { amount: 10, category: "Hardware", currency: "USD" },
      expected: {
        status: "MANUAL_REVIEW",
        reason: "Hardware expenses always require manual review.",
      },
    },

    // --- Travel Rules ---
    {
      name: "Auto-approves Travel in GBP under 1000",
      input: { amount: 900, category: "Travel", currency: "GBP" },
      expected: { status: "APPROVED" },
    },
    {
      name: "Requires review for Travel in non-GBP currency",
      input: { amount: 100, category: "Travel", currency: "EUR" },
      expected: {
        status: "MANUAL_REVIEW",
        reason: "Travel over 1000 or non-GBP requires review.",
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
    const result = expenseApprovalEngine(input);
    expect(result).toEqual(expected);
  });
});
