import { promises as fs } from 'fs';
import path from 'path';
import File from './../file';

describe('Testing image processing via Sharp', (): void => {
  it('An error (invalid width value)', async (): Promise<void> => {
    const error: null | string = await File.createThumb({
      filename: 'test',
      width: '-100',
      height: '500'
    });
    expect(error).not.toBeNull();
  });

  it('An error (filename does not exist)', async (): Promise<void> => {
    const error: null | string = await File.createThumb({
      filename: 'test',
      width: '100',
      height: '500'
    });
    expect(error).not.toBeNull();
  });

  it('succeeds to write resized thumb file (existing file, valid size values)', async (): Promise<void> => {
    await File.createThumb({ filename: 'fjord', width: '99', height: '99' });

    const resizedImagePath: string = path.resolve(
      File.imagesThumbPath,
      `fjord-99x99.jpg`
    );
    let errorFile: null | string = '';

    try {
      await fs.access(resizedImagePath);
      errorFile = null;
    } catch {
      errorFile = 'File was not created';
    }

    expect(errorFile).toBeNull();
  });
});

afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    File.imagesThumbPath,
    'fjord-99x99.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    // intentionally left blank
  }
});
