import { Router } from 'express';

const router = Router();



router.get('/api/products', (request, response) => {
    response.send([{ id: 1, name: 'chicken breast' }]);
  });
  
export default router;