// importing express and routes
import express from 'express';
import routes from './routes/index';
import File from './file';

const app: express.Application = express();
const port: number = 3000;
app.use(routes);

// Start server
app.listen(port, async (): Promise<void> => {
  await File.createThumbPath();
  console.log(`The Api is Working on: ${port}`);
});

export default app;
