import express, { query, response } from 'express';
import { request } from 'http';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, userName: 'John', displayName: 'John' },
  { id: 2, userName: 'John', displayName: 'John' },
  { id: 3, userName: 'John', displayName: 'John' },
];

app.get('/', (request, response) => {
  response.status(201).send({ msg: 'Hello world!' });
});

app.get('/api/users', (request, response) => {
  // thi are the query parameters and the  link to the parameters
  // http://localhost:3000/api/users?filter=userName&value=g
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

app.put('/api/users/:id', (request, response) => {
  const {
    body,
    params: { id },
  } = request;
  console.log(id);
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);
  mockUsers[findUserIndex] = { id: parsedId, ...body };
  return response.send(mockUsers).status(200);;
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
