import { promises as fs } from 'fs';

import path from 'path';
import {createThumbImg, imagesThumbPath} from '../utils/utils';

describe('Testing image processing via Sharp', (): void => {

  it('has an error with file name', async (): Promise<void> => {
    const error: null | string = await createThumbImg({
      filename: 'Test-fwd',
      width: '100',
      height: '500'
    });
    expect(error).not.toBeNull();
  });

  it('Created resized thumb filename', async (): Promise<void> => {
    await createThumbImg({ filename: 'fjord-fwd', height: '300', width: '300' });
    const resizedImagePath: string = path.resolve(
      imagesThumbPath,
      `fjord-300x300-fwd.jpg`
    );
    let errorFile: null | string = '';

    try {
      await fs.access(resizedImagePath);
      errorFile = null;
    } catch {
      errorFile = `File is not created`;
    }

    expect(errorFile).toBeNull();
  });

});

afterAll(async (): Promise<null | void> => {
  const resizedImagePath: string = path.resolve(
    imagesThumbPath,
      `fjord-300x300-fwd.jpg`
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    return null;
  }
});
