import express from 'express';
import productsRouter from './routes/products.mjs';
import usersRouter from './routes/users.mjs';

const app = express();

const loggingMiddleware = function (req, res, next) {
  // console.log(`${req.method} - ${req.url} `);
  next();
};

app.use(express.json());
app.use(loggingMiddleware);
app.use(usersRouter);
app.use(productsRouter);

const PORT = process.env.PORT || 3000;

app.get('/', (request, response) => {
  response.status(201).send({ msg: 'Hello world!' });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
