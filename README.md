# Multi-Domain Approval Engine (TypeScript)

A production-grade, type-safe architectural pattern for handling complex business approval logic across multiple domains (Expenses, Hiring, etc.).

## 🚀 The Problem

As platforms scale, business rules (e.g., "Auto-approve software under £500") often become a "spaghetti" of nested `if/else` or `switch` statements. This makes the code:

1. **Fragile:** Adding a new rule risks breaking existing ones.
2. **Untyped:** Handling raw JSON from APIs often leads to runtime `undefined` errors.
3. **Hard to Scale:** New domains require modifying core routing logic.

## 🏗️ The Solution (Architectural Patterns)

This project demonstrates three patterns to solve these issues:

### 1. Strategy Pattern (Domain Logic)

Instead of a central logic block, each domain (e.g., `Expenses`) defines its own "Domain rules".

- **Benefit:** High cohesion. Business rules for Expenses stay isolated in the Expense folder.
- **Implementation:** Uses **Mapped Types** (`[K in Category]`) to ensure the compiler forces a handler for every possible category.

### 2. Factory Pattern (The Engine)

A generic `createApprovalEngine` factory bridges the gap between **Runtime Validation** and **Static Types**.

- **Benefit:** DRY (Don't Repeat Yourself). The factory handles the boilerplate of validation and routing.
- **Implementation:** Uses **Type Predicates** (`data is T`) to safely narrow `unknown` API data.

### 3. Registry Pattern (The Hub)

A central `ApprovalHub` acts as a router for the entire application.

- **Benefit:** Decoupled architecture. The API controller only interacts with the Hub, not the individual engines.

---

## 🛠️ Technical Stack

- **TypeScript (Strict Mode):** Leveraging advanced features:
  - **Discriminated Unions** for safe result handling.
  - **Type Predicates** for bridging the gap between API data and types.
  - **Mapped Types & Generics** for exhaustive business logic.

- **Jest:** **Table-driven testing** for business edge cases.

- **Zero Dependencies:** Pure TypeScript to demonstrate core language mastery.

## 📂 Project Structure

```text
/src
  /core        # Reusable abstractions (The "Framework")
  /domains     # Specific business units (The "Plugins")
  registry.ts  # The glue connecting everything

```

## 🧪 Testing

The project uses table-driven tests to ensure 100% coverage of approval logic.

```bash
npm test
```
