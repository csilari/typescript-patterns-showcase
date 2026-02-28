import { approvalContainer } from "../../src/core/container";
import { Engine, ApprovalResult } from "../../src/core/types";

// NB: Since ApprovalContainer is a Singleton, its state will persist across tests.
// NB2: We could create a "reset" method in the container, protected by an environment check to ensure each test starts with a clean state.
describe("ApprovalContainer (IoC)", () => {
  const mockResult: ApprovalResult = { status: "APPROVED" };

  const mockEngine: Engine = jest.fn(() => mockResult);

  it("should register and resolve a domain engine", () => {
    approvalContainer.register("EXPENSE", mockEngine);

    const resolvedEngine = approvalContainer.resolve("EXPENSE");
    const result = resolvedEngine({ amount: 100 });

    expect(resolvedEngine).toBe(mockEngine);
    expect(result).toEqual(mockResult);
    expect(mockEngine).toHaveBeenCalledTimes(1);
  });

  it("should throw an error when registering the same domain twice", () => {
    expect(() => {
      approvalContainer.register("EXPENSE", mockEngine);
    }).toThrow("Engine already registered for domain: EXPENSE");
  });

  it("should throw an error when resolving an unregistered domain", () => {
    expect(() => {
      approvalContainer.resolve("HIRING");
    }).toThrow("No engine found for: HIRING");
  });
});
