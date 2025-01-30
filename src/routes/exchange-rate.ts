import express, { Request, Response } from "express";
import { getExchangeRate, getExchangeRateHistory } from "../database/queries";

const router = express.Router()

// retrieves the most recent exchange rate
router.get('/current', async (req: Request, res: Response) => {
  const data = await getExchangeRate();
  res.send({
    rate: data.rate,
    created_at: new Date(data.created_at).toISOString().split('T')[0]
  });
});


// router
router.get('/history', async (req: Request, res: Response) => {
  const {start_date, end_date} = req.query; 
  const data = await getExchangeRateHistory(start_date as string, end_date as string);

  res.send({
    data: data
    
  });
})

export default router