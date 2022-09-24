import path from "path";
import { promises as fs } from 'fs';
import processImageResize from "../image-processing";



export const imagesThumbPath = path.resolve(__dirname, '../../assets/images/thumb');
export const imagesPath = path.resolve(__dirname, '../../assets/images/full');

export interface ImageQueryResize {
    filename?: string;
    height?: string;
    width?: string;
  }

export async function getImageFullPath(params : ImageQueryResize ): Promise<null | string>  { 
    if (!params.filename) return null; 

    const filePathName: string =  params.width && params.height ? path.resolve(
        imagesThumbPath, `${params.filename}-${params.height}x${params.width}-${"fwd"}.jpg`
    ) : path.resolve(imagesPath, `${params.filename}.jpg`);
    try { 
        await fs.access(filePathName);
        return filePathName;
      } catch {
        return null;
      }
 }


 export async function getAvailableImageNames(): Promise<string[]> {
    try {
        return (await fs.readdir(imagesPath)).map(
          (filename: string): string => filename.split('.')[0]
        );
      } catch {
        return [];
      }
      
 }

  export async function isImageAvailable(filename: string = ''): Promise<boolean> {
    if (!filename)  return false;
    
    return (await getAvailableImageNames()).includes(filename);
  }

 export async function isThumbAvailable(params: ImageQueryResize): Promise<boolean> {
    if (!params.filename || !params.height || !params.width) return false; 

    // Set appropriate path
    const filePath: string = path.resolve(
      imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}-${"fwd"}.jpg`
    );

    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }


  export async function createThumbPath(): Promise<void> {
    try {
      await fs.access(imagesThumbPath);
    } catch {
      fs.mkdir(imagesThumbPath);
    }
  }


  export async function createThumbImg(params: ImageQueryResize): Promise<null | string> {
    if (!params.filename || !params.width || !params.height) {
      return null; // Nothing to do
    }

    const filePathFull: string = path.resolve(
      imagesPath,
      `${params.filename}.jpg`
    );
    const filePathThumb: string = path.resolve(
      imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}-${"fwd"}.jpg`
    );

    console.log(`Creating thumb ${filePathThumb}`);

    return await processImageResize({
      source: filePathFull,
      target: filePathThumb,
      width: parseInt(params.width),
      height: parseInt(params.height)
    });
  }


