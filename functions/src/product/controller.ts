import { NextFunction, Request, Response } from 'express'; 
import service from './service';

/**
 * Controller functions to handler product list
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getProductList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const values = await service.getProductList();
    const result = {
      status: 200,
      data: {
        values: values
      }, 
    };
    console.log("result", result);
    return result
  } catch (error: any) { 
    return res.status(400).json({ error: error.message });
  }
};
