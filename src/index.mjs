import express from 'express';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { body } from 'express-validator';
import { mockUsers } from './utils/constants.mjs';

const app = express();

const loggingMiddleware = function (req, res, next) {
  // console.log(`${req.method} - ${req.url} `);

  next();
};

app.use(express.json());
app.use(loggingMiddleware);
app.use(cookieParser('helloworld'));
app.use(
  session({
    secret: 'bryanvengwa',
    // this is ideal to be saved to false
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 60 * 24,
    },
  })
);
app.use(routes);

const PORT = process.env.PORT || 3000;

app.get('/', (request, response) => {
  response.cookie('hello', 'world', { maxAge: 60000 * 60 * 60, signed: true });
  console.log(request.session);
  console.log(request.sessionID);
  console.log(request.session.id);
  request.session.visited = true;

  return response.status(201).send({ msg: 'Hello world!' });
});

app.post('/api/auth', (request, response) => {
  const {
    body: { userName, password },
  } = request;
  const findUser = mockUsers.find((user) => user.userName === userName);
  console.log(findUser);
  if (!findUser) return response.status(401).send({ msg: 'BAD CREDENTIALS ' });
  if (!findUser.password === password)
    return response.status(401).send({ msg: `invalid password ${password}` });
  request.session.user = findUser;
  return response.status(200).send(findUser);
});
app.post('/api/auth/status', (request, response) => {
  return request.session.user
    ? response.status(200).send(request.session.user)
    : response.status(401).send({ msg: 'user not authenticated' });
});

app.post('/api/cart', (request, response) => {
  if (!request.session.user) return response.sendStatus(401);
  const { body: item } = request;
  const { cart } = request.session;
  if (cart) {
    cart.push(item);
  } else {
    request.session.cart = [item];
  }
  return response.status(201).send(item);
});

app.get('/api/cart', (request, response) => {
  if (!request.session.user) return response.sendStatus(401);
  return response.send(request.session.cart ?? []);
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
