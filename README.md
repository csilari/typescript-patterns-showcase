# Multi-Domain Approval Engine (TypeScript)

A production-grade, type-safe architectural pattern for handling complex business approval logic across multiple domains (Expenses, Hiring, etc.).

## The Problem

As platforms scale, business rules (e.g., "Auto-approve software under £500") often become a "spaghetti" of nested `if/else` or `switch` statements. This makes the code:

1. **Fragile:** Adding a new rule risks breaking existing ones.
2. **Untyped:** Handling raw JSON from APIs often leads to runtime `undefined` errors.
3. **The "Registry" Bottleneck:** In standard apps, adding a new domain (like 'Payroll') requires modifying a central file, creating merge conflicts and tight coupling.

## The Solution (Architectural Patterns)

This project demonstrates a **Pluggable Architecture** to solve these issues:

### 1. Strategy Pattern (Domain Logic)

Instead of a central logic block, each domain (e.g., `Expenses`) defines its own "Domain rules".

- **Benefit:** High cohesion. Business rules for Expenses stay isolated in the Expense folder.
- **Implementation:** Uses **Mapped Types** (`[K in Category]`) to ensure the compiler forces a handler for every possible category.

### 2. Factory Pattern (The Engine)

A generic `createApprovalEngine` factory bridges the gap between **Runtime Validation** and **Static Types**.

- **Benefit:** DRY (Don't Repeat Yourself). The factory handles the boilerplate of validation and routing.
- **Implementation:** Uses **Type Predicates** (`data is T`) to safely narrow `unknown` API data.

### 3. Inversion of Control / IoC (The Registry)

Instead of a hard-coded "Hub," we use an **IoC Container**.

- **Benefit:** **True Decoupling.** The "Core" doesn't need to know which domains exist. Each domain (Expense, Hiring) "plugs itself in" during the app startup.
- **Implementation:** A singleton **Container** that manages a registry of engines, allowing squads to scale independently without touching core files.

---

## Technical Stack

- **TypeScript (Strict Mode):** Leveraging advanced features:
  - **Discriminated Unions** for safe result handling.
  - **Type Predicates** for bridging the gap between API data and types.
  - **Mapped Types & Generics** for exhaustive business logic.

- **Jest:**
  - **Table-driven testing** for business edge cases.
  - **Mocking & Spy logic** to verify the IoC Container registration.

- **Zero Dependencies:** Pure TypeScript to demonstrate core language mastery.

## Project Structure

```text
/src
  /core        # The "Framework" (Factory, IoC Container, Types)
  /domains     # The "Plugins" (Expense and Hiring logic)
  bootstrap.ts # The "Initializer" (Plug everything in)
  router.ts    # The "Dispatcher" (Entry point logic)
  server.ts    # The "Transport Layer" (Express API)

```

## Testing

The project ensures 100% coverage by testing both the **Business Rules** (Table-driven) and the **Infrastructure** (Container/Mocks).

```bash
npm test

```

## End-to-End Integration

This repository includes a reference implementation of a REST API. It demonstrates how the Registry Pattern allows for 'Thin Controllers' by **delegating all validation and business logic to domain-specific engines**. This ensures that the transport layer (Express) remains decoupled from the core business rules.

I have included a `requests.http` file. This allows for rapid architectural probing. You can observe how the system differentiates between **Schema Validation failures** (via Type Guards), **Business Logic rejections** (via Strategies), and **Routing errors** (via the IoC Registry).
