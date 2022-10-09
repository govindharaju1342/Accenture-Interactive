import { Router } from 'express';
import { getProductList } from '../product/controller';

const router = Router();

router.get('/products', getProductList);

export default router;
