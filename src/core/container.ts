import { Engine, Domain } from "./types";

class ApprovalContainer {
  private engines = new Map<Domain, Engine>();

  /**
   * Enables the different domains to register their logic, using the Dependency Injecton (IoC) Pattern.
   * @param domain - The Domain to register.
   * @param engine - The Engine to associate to the Domain, responsible for the Business Logic.
   */
  register(domain: Domain, engine: Engine): void {
    if (this.engines.has(domain)) {
      throw new Error(`Engine already registered for domain: ${domain}`);
    }
    this.engines.set(domain, engine);
  }

  /**
   * Allows the registry to be "blind", the container provides the infrastructure while domains provide the logic.
   * @param domain - The Domain to retrieve the Engine from.
   * @returns The Engine registered for the given Domain.
   */
  resolve(domain: Domain): Engine {
    const engine = this.engines.get(domain);
    if (!engine) {
      throw new Error(
        `No engine found for: ${domain}. Did you forget to register it?`,
      );
    }
    return engine;
  }
}

// Exporting a Singleton Instance
export const approvalContainer = new ApprovalContainer();
