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
    return res.status(200).json(values)
  } catch (error: any) { 
    return res.status(400).json({ error: error.message });
  }
};
