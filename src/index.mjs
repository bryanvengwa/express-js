import express from 'express';
import { createUserValidationSchema } from './utils/validationSchemas.mjs';
import { matchedData, validationResult, checkSchema } from 'express-validator';

import usersRouter from './routes/users.mjs';

const app = express();

const loggingMiddleware = function (req, res, next) {
  // console.log(`${req.method} - ${req.url} `);
  next();
};

app.use(express.json());
app.use(loggingMiddleware);
app.use(usersRouter);

const PORT = process.env.PORT || 3000;


app.get('/', (request, response) => {
  response.status(201).send({ msg: 'Hello world!' });
});


app.get('/api/products', (request, response) => {
  response.send([{ id: 1, name: 'chicken breast' }]);
});



app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
