import express, { Request, Response } from "express";
import { routeRequest } from "./registry";
import { Domain } from "./core/types";

const app = express();
app.use(express.json());

/**
 * POST /approve/:domain
 * Example: POST /approve/EXPENSE or POST /approve/HIRING
 */
app.post("/approve/:domain", (req: Request, res: Response) => {
  const domain = req.params.domain as Domain;
  const payload = req.body;

  const result = routeRequest(domain, payload);

  // Narrowing the
  if (result.status === "APPROVED") {
    return res.status(200).json({
      message: "Request auto-approved by the engine.",
    });
  }

  // 3. Handle manual review
  return res.status(403).json({
    message: "Manual review required.",
    reason: result.reason,
  });
});

app.listen(3000, () => console.log("Approval API running on port 3000"));
