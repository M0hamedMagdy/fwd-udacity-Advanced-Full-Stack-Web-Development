import express from 'express';
import images from './api/images';

const routes: express.Router = express.Router();

routes.use('/api/images', images);

routes.get(
  '/',
  (request: express.Request, response: express.Response): void => {
    response.send(
      `
      <h1>This is an api for udacity fwd course</h1>
      <p> Provide the api with <code>filename=" " and specify the width="" and height=""</code><p>
      <p>Examples:</p>
      <ul>
        <li><a href="/api/images?filename=fjord">/api/images?filename=fjord</a></li>
        <li><a href="/api/images?filename=fjord&width=100&height=100">/api/images?filename=fjord&width=100&height=100</a></li>
      </ul>
      `
    );
  }
);

export default routes;
