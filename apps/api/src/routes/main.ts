import { Router } from "express";

export const routes = Router();

routes.get("/ping", (_req, res) => {
  res.json({ pong: true });
});
