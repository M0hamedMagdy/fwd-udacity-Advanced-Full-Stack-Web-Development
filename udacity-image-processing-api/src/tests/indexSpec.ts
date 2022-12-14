import supertest from 'supertest';
import app from '../index';
import { promises as fs } from 'fs';


import {imagesThumbPath} from '../utils/utils';
import path from 'path';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test responses from endpoints', (): void => {
  describe('endpoint: /', (): void => {
    it('gets /', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /none', (): void => {
    it('returns 404 for invalid endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/foo');

      expect(response.status).toBe(404);
    });
  });
});

// Erase test file. Test should not run on productive system to avoid cache loss
afterAll(async (): Promise<null | void> => {
  const resizedImagePath: string = path.resolve(
    imagesThumbPath,
    'fjord-199x199-fwd.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    return null; 
  }
});
