import express from 'express';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();

const loggingMiddleware = function (req, res, next) {
  // console.log(`${req.method} - ${req.url} `);

  next();
};

app.use(express.json());
app.use(loggingMiddleware);
app.use(cookieParser('helloworld'));
app.use(session({
  secret: 'bryanvengwa',
  // this is ideal to be saved to false
  saveUninitialized:false,
  resave:false,
  cookie:{
    maxAge:60000 * 60 * 60 * 24 
  }
}));
app.use(routes);

const PORT = process.env.PORT || 3000;

app.get('/', (request, response) => {
  response.cookie('hello', 'world', { maxAge: 60000 * 60 * 60, signed: true });
  console.log(request.session)
  console.log(request.sessionID)
  console.log(request.session.id)
  request.session.visited = true;

  return response.status(201).send({ msg: 'Hello world!' });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
