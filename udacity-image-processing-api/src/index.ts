// importing express and routes
import express from 'express';
import routes from './routes/index';


import {createThumbPath } from './utils/utils';


const app = express();
const port: number = 3000;

app.use(routes);

// Start server
app.listen(port, async (): Promise<void> => {
  await createThumbPath();
  console.log(`The Api is Working on: ${port}`);
});

export default app;
