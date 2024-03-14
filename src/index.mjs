import express, { query, response } from 'express';
import { request } from 'http';

const app = express();

const loggingMiddleware = function (req, res, next) {
  console.log(`${req.method} - ${req.url} `);
  next();
};

app.use(express.json());
app.use(loggingMiddleware);

const PORT = process.env.PORT || 3000;

const resolveIndexByUserId = function (request, response, next) {
  const {
    params: { id },
  } = request;
  console.log(id);
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);
  request.findUserIndex = findUserIndex;
};

const mockUsers = [
  { id: 1, userName: 'John', displayName: 'John' },
  { id: 2, userName: 'John', displayName: 'John' },
  { id: 3, userName: 'John', displayName: 'John' },
];

app.get('/', (request, response) => {
  response.status(201).send({ msg: 'Hello world!' });
});

app.get('/api/users', (request, response) => {
  console.log(request.query);
  console.log('I am runnning');
  const {
    query: { filter, value },
  } = request;

  if (filter && value) {
    console.log('ran too');
    return response.send(
      mockUsers.filter((user) => {
        return user[filter].includes(value);
      })
    );
  } else {
    return response.send(mockUsers);
  }
});

app.get('/api/users/:id', (request, response) => {
  //   console.log(request.params);
  const parsedId = parseInt(request.params.id);
  console.log(parsedId);
  if (isNaN(parsedId)) {
    return response.status(404).send({ msg: 'Bad request , invalid Id' });
  }

  const findUser = mockUsers.find((user) => user.id === parsedId);
  if (!findUser) return response.sendStatus(404);
  response.send(findUser);
});

app.post('/api/users', (request, response) => {
  console.log(request.body);
  const newUser = {
    id: mockUsers[mockUsers.length - 1].id + 1,
    userName: request.body.userName,
    displayName: request.body.displayName,
  };
  mockUsers.push(newUser);

  response.status(201).send(newUser);
});

app.get('/api/products', (request, response) => {
  response.send([{ id: 1, name: 'chicken breast' }]);
});

app.put('/api/users/:id', resolveIndexByUserId, (request, response) => {
  const {  body, findUserIndex } = request;

  mockUsers[findUserIndex] = { id:findUserIndex, ...body };
  return response.send(mockUsers).status(200);
});

app.delete('/api/users/:id', function (req, res) {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  console.log('delete method run' + id);
  if (isNaN(parsedId)) return res.sendStatus(404);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);

  mockUsers.splice(findUserIndex);
  return res.sendStatus(200);
});

app.patch('/api/users/:id', (request, response) => {
  const {
    body,
    params: { id },
  } = request;
  console.log(id);
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);
  mockUsers[findUserIndex] = { ...body };
  return response.send(mockUsers).status(200);
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
