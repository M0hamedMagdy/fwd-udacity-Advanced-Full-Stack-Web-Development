import { promises as fs } from 'fs';

import path from 'path';
import File from './../file';

describe('Testing image processing via Sharp', (): void => {
  it('There is an error with width', async (): Promise<void> => {
    const error: null | string = await File.createThumbImg({
      filename: 'test',
      width: '-1000',
      height: '-1000'
    });
    expect(error).not.toBeNull();
  });

  it('there is an error with file name', async (): Promise<void> => {
    const error: null | string = await File.createThumbImg({
      filename: 'test',
      width: '100',
      height: '500'
    });
    expect(error).not.toBeNull();
  });

  it('succeeds to Create resized thumb filename', async (): Promise<void> => {
    await File.createThumbImg({ filename: 'fjord', height: '300', width: '300' });

    const resizedImagePath: string = path.resolve(
      File.imagesThumbPath,
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
    File.imagesThumbPath,
      `fjord-300x300-fwd.jpg`
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    return null;
  }
});
