import { Router } from 'express';

const router = Router();



router.get('/api/products', (request, response) => {
  console.log(request.headers.cookie);
  console.log(request.cookies)
  if(request.signedCookies.hello && request.signedCookies.hello === 'world'){

    return  response.send([{ id: 1, name: 'chicken breast' ,}]);
  }
  return response.send('Sorry you need the correct cookie')
  });
  
export default router;