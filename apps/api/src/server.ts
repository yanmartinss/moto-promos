import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { routes } from "./routes/main.js";

const server = express();

server.use(cors());
server.use(express.static("public"));
server.use(express.json());

server.use("/api", routes);

server.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  return res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
