import express from 'express'
import { initializeDatabase } from "./database/queries";
import {cronTask} from "./utils/crawler"
import router from "./routes/exchange-rate";

const port = process.env.PORT || 3000;
const app = express();

app.use('/api/rates',router);

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  await initializeDatabase();
  cronTask.start()
});