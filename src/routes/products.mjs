import { Router } from 'express';

const router = Router();



router.get('/api/products', (request, response) => {
  
  return  response.send([{ id: 1, name: 'chicken breast' }]);
  });
  
export default router;