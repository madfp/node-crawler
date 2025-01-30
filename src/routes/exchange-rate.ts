import express, { Request, Response } from "express";
import { getExchangeRate, getExchangeRateHistory } from "../database/queries";

const router = express.Router()

// retrieves the most recent exchange rate
router.get('/current', async (req: Request, res: Response) => {
  try {
    const data = await getExchangeRate();
    // validating the response
    data ? res.send({
      rate: data?.rate,
      created_at: new Date(data?.created_at).toISOString().split('T')[0]
    }): res.status(404).send({
      message: 'Data not found'
    });
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error'
    });
  }
});


// router
router.get('/history', async (req: Request, res: Response) => {
  try{
    const {start_date, end_date} = req.query; 
    const data = await getExchangeRateHistory(start_date as string, end_date as string);
    // validating the response
    data ? res.send(data) : res.status(404).send({
      message: 'Data not found'
    })
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error'
    });
  }
})

export default router