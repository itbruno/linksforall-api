import express from 'express';
const DEFAULT_PORT = 3001;

const app = express();

app.listen(DEFAULT_PORT, () => {
  console.log('Server is running at 3000');
});
