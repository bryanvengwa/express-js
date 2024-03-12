import express, { response } from 'express';
import { request } from 'http';

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (request, response) => {
  response.status(201).send({ msg: 'Hello world!' });
});

app.get('/api/users', (request, response) => {
  response.send([
    { id: 1, userName: 'John', displayName: 'John' },
    { id: 2, userName: 'John', displayName: 'John' },
  ]);
});

app.get("/api/users/:id", (request, response) => {
    

});

app.get('/api/products', (request, response) => {
  response.send([{ id: 1, name:'chicken breast'}]);
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
