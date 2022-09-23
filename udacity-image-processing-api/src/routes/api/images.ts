import express from 'express';
import File from './../../file';

// query segments
interface ImageQueryResize {
  filename?: string;
  width?: string;
  height?: string;
}

/**
 * @param {ImageQueryResize} query Query object passed by express.
 * @return {null|string} Null if valid or error message.
 */
const validate = async (query: ImageQueryResize): Promise<null | string> => {
  // Checking if file is available
  if (!(await File.isImageAvailable(query.filename))) {
    const availableImageNames: string = (
      await File.getAvailableImageNames()
    ).join(', ');
    return `Please provide a valid filename in the 'filename' . Available filenames are: ${availableImageNames}.`;
  }

  if (!query.width && !query.height) return null; 

  // Check if width is a valid value
  const width: number = parseInt(query.width || '');
  if (Number.isNaN(width) || width < 1) {
    return "Please provide a positive numerical value for the 'width' query segment.";
  }

  // Check if height is a valid value
  const height: number = parseInt(query.height || '');
  if (Number.isNaN(height) || height < 1) {
    return "Please provide a positive numerical value for the 'height' query segment.";
  }

  return null;
};

const images: express.Router = express.Router();

images.get(
  '/',
  async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    // Check whether request can be worked with
    const validationMessage: null | string = await validate(request.query);
    if (validationMessage) {
      response.send(validationMessage);
      return;
    }

    let error: null | string = '';

    // Create thumb if not yet available
    if (!(await File.isThumbAvailable(request.query))) {
      error = await File.createThumbImg(request.query);
    }

    // Handle image processing error
    if (error) {
      response.send(error);
      return;
    }

    // Retrieve appropriate image path and display image
    const path: null | string = await File.getImageFullPath(request.query);
    if (path) {
      response.sendFile(path);
    } else {
      response.send('This should not have happened');
    }
  }
);

export default images;
