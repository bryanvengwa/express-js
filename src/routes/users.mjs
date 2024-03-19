import { Router } from 'express';
import { query } from 'express-validator';


const router = Router();

router.get(
    '/api/users',
    query('filter')
      .isString()
      .notEmpty()
      .withMessage('must not be empty')
      .isLength()
      .withMessage('Must be at least 3 to 10 characters'),
    (request, response) => {
      const result = validationResult(request);
      console.log(result);
      const {
        query: { filter, value },
      } = request;
  
      if (filter && value) {
        return response.send(
          mockUsers.filter((user) => {
            return user[filter].includes(value);
          })
        );
      } else {
        return response.send(mockUsers);
      }
    }
  );


  export default router;