import { initializeDatabase } from './database/queries';
import express, { Express, Request, Response } from "express"

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  await initializeDatabase();
});