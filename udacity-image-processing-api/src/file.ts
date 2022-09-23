import path from 'path';
import { promises as fs } from 'fs';


import processImageResize from './image-processing'; // Image handling


// Image Types 
interface ImageQueryResize {
  filename?: string;
  height?: string;
  width?: string;
}

// images DirNames.
 class File {
  static imagesThumbPath = path.resolve(__dirname, '../assets/images/thumb');
  static imagesPath = path.resolve(__dirname, '../assets/images/full');

  // Image path
  /**
   * @param {ImageQueryResize} params Parameters.
   * @param {string} [params.filename] Filename.
   * @param {string} [params.height]  height.
   * @param {string} [params.width]  width.
   * @return {null|string} Path, if image available, else null.
   */


  static async getImageFullPath(params: ImageQueryResize): Promise<null | string> {
    // Cheking if there is no file and return null 
    if (!params.filename) return null ;


    // Return File name And save it in file paths
    const filePathName: string =
      params.width && params.height
        ? path.resolve(
            File.imagesThumbPath,
            `${params.filename}-${params.height}x${params.width}-${"fwd"}.jpg`
          )
        : path.resolve(File.imagesPath, `${params.filename}.jpg`);

    try {
      await fs.access(filePathName);
      return filePathName;
    } catch {
      return null;
    }
  }


  /**
   * Checking image is available.
   * @param {string} [filename=''] (without file extension).
   * @return {boolean}
   */
  static async isImageAvailable(filename: string = ''): Promise<boolean> {
    // if there is no file name return false 
    if (!filename)  return false;
    
    return (await File.getAvailableImageNames()).includes(filename);
  }

  /**
   * @return {string[]} (without file extension).
   */
  static async getAvailableImageNames(): Promise<string[]> {
    try {
      return (await fs.readdir(File.imagesPath)).map(
        (filename: string): string => filename.split('.')[0]
      );
    } catch {
      return [];
    }
  }

  /**
   * @param {ImageQueryResize} params Parameters.
   * @param {string} [params.filename] Filename.
   * @param {string} [params.height]  height.
   * @param {string} [params.width]  width.
   * @return {boolean} True, if thumb is available, else false.
   */
  static async isThumbAvailable(params: ImageQueryResize): Promise<boolean> {
    if (!params.filename || !params.height || !params.width) return false; 

    // Set appropriate path
    const filePath: string = path.resolve(
      File.imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}-${"fwd"}.jpg`
    );

    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }


  //  Creating thumb path.

  static async createThumbPath(): Promise<void> {
    try {
      await fs.access(File.imagesThumbPath);
    } catch {
      fs.mkdir(File.imagesThumbPath);
    }
  }

  /**
   * @param {ImageQueryResize} params Parameters.
   * @param {string} [params.filename] Filename.
   * @param {string} [params.height]  height.
   * @param {string} [params.width]  width.
   * @return {null|string} Error message or null.
   */
  static async createThumbImg(params: ImageQueryResize): Promise<null | string> {
    if (!params.filename || !params.width || !params.height) {
      return null; // Nothing to do
    }

    const filePathFull: string = path.resolve(
      File.imagesPath,
      `${params.filename}.jpg`
    );
    const filePathThumb: string = path.resolve(
      File.imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}-${"fwd"}.jpg`
    );

    console.log(`Creating thumb ${filePathThumb}`);

    // Resize original image and store as thumb
    return await processImageResize({
      source: filePathFull,
      target: filePathThumb,
      width: parseInt(params.width),
      height: parseInt(params.height)
    });
  }
}

export default File;