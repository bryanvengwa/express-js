import { Router } from 'express';
import {
  matchedData,
  query,
  validationResult,
  checkSchema,
} from 'express-validator';
import { mockUsers } from '../utils/constants.mjs';
import { createUserValidationSchema } from '../utils/validationSchemas.mjs';
import { resolveIndexByUserId } from '../utils/middlewares.mjs';
import session from 'express-session';

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
    console.log(request.session);
    request.sessionStore.get(request.session.id, (err, sessionData) => {
      if (err) {
        console.log(err);
      }
      console.log(sessionData);
    });
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

router.get('/api/users/:id', resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;

  const findUser = mockUsers[findUserIndex];
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

router.post(
  '/api/users',
  checkSchema(createUserValidationSchema),
  (request, response) => {
    const result = validationResult(request);
    console.log(result);
    if (!result.isEmpty())
      return response.status(400).send({ errors: result.errors });
    const data = matchedData(request);

    const newUser = {
      id: mockUsers[mockUsers.length - 1].id + 1,
      userName: data.userName,
      displayName: data.displayName,
    };

    mockUsers.push(newUser);

    response.status(201).send(newUser);
  }
);

router.put('/api/users/:id', resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;

  mockUsers[findUserIndex] = { id: findUserIndex, ...body };
  return response.send(mockUsers).status(200);
});

router.patch('/api/users/:id', resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.send(mockUsers).status(200);
});

router.delete('/api/users/:id', resolveIndexByUserId, function (req, res) {
  const { findUserIndex } = req;
  mockUsers.splice(findUserIndex);
  return res.sendStatus(200);
});

export default router;
