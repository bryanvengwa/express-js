import express from 'express';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { mockUsers } from './utils/constants.mjs';
import passport from 'passport';
import './strategies/local-strategy.mjs'

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

// passport  has to be initalized after registration of session and before registration of routes
app.use(passport.initialize());
app.use(passport.session());
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

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
