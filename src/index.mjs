import express from 'express';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';

const app = express();

const loggingMiddleware = function (req, res, next) {
  // console.log(`${req.method} - ${req.url} `);

  next();
};

app.use(express.json());
app.use(loggingMiddleware);
app.use(cookieParser());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.get('/', (request, response) => {
  console.log(request.headers.cookie);
  response.cookie('hello', 'world', { maxAge: 60000 * 60 * 60 });
  return response.status(201).send({ msg: 'Hello world!' });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
