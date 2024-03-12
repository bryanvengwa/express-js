import express, { response } from 'express';
import { request } from 'http';

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [{ id: 1, userName: 'John', displayName: 'John' }];

app.get('/', (request, response) => {
  response.status(201).send({ msg: 'Hello world!' });
});

app.get('/api/users', (request, response) => {
  response.send([
    { id: 1, userName: 'John', displayName: 'John' },
    { id: 2, userName: 'John', displayName: 'John' },
  ]);
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

app.get('/api/products', (request, response) => {
  response.send([{ id: 1, name: 'chicken breast' }]);
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
