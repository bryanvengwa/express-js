import express from 'express';
import routes from './routes/index.mjs';

const app = express();

const loggingMiddleware = function (req, res, next) {
  // console.log(`${req.method} - ${req.url} `);
  
  next();
};

app.use(express.json());
app.use(loggingMiddleware);
app.use(routes);

const PORT = process.env.PORT || 3000;

app.get('/', (request, response) => {
  // respo
  console.log('index function ran');
  return response.status(201).send({ msg: 'Hello world!' });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
