import { RequestHandler } from "express";
import FileModel, { File } from "../models/file";
import { v2 as cloudinary } from 'cloudinary';
import { upload } from "../middlewares/uploadMiddleware";
import { extractPublicIdFromImageUrl } from "../utils/helpers/general";


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


export const uploadFile: RequestHandler = async (req, res, next) => {
  try {
    upload.single('image')(req, res, async (err: any) => {
      try {
        if (err) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File size exceeds the limit. Maximum file size allowed is <1MB.' });
          }
          if (err.message === 'Only JPG, PNG, and GIF files are allowed') {
            return res.status(400).json({ message: err.message });
          }
          throw err;
        }

        const fileData = req.body as File;

        const file = req.file;

        if (!file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }

        const randomString = `${'tobams_uploads'}_${Math.random().toString(36).substring(2)}_${Date.now()}`;

        const uploadResult = await cloudinary.uploader.upload(file.path, { folder: 'tobams-folder', public_id: randomString });
        
        const imageUrl = uploadResult.secure_url;

        fileData.image = imageUrl;

        const uploadFile = await FileModel.create(fileData);

        return res.status(201).json({ message: `file upload was successfully`, data: uploadFile });
        
      } catch (uploadError) {
        return next(uploadError);
      }
    });
  } catch (error) {
    next(error);
  }
};



export const getAllFiles: RequestHandler = async (req, res, next) => {
  try {
    const files = await FileModel.find();

    return res.status(200).json({ data: files });

  } catch (error) {
    next(error);
  }
};



export const getSingleFile: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const file = await FileModel.findById(id);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    return res.status(200).json({ data: file });

  } catch (error) {
    next(error);
  }
};



export const deleteFile: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const file = await FileModel.findById(id).exec();

    if (!file) {
      return res.status(404).json({ message: 'file not found' });
    }

    const imagePublicId = extractPublicIdFromImageUrl(file.image);

    try {
      const deletionResponse = await cloudinary.uploader.destroy(imagePublicId);

      if (deletionResponse.result !== 'ok') {
        return res.status(400).json({ message: 'Error deleting file from Cloudinary' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        ok: false,
        message: 'Error deleting file',
        errors: error,
      });
    }

    await FileModel.findByIdAndDelete(id).exec();

    res.status(200).json({ message: 'File erased!' });
  } catch (error) {
    next(error);
  }
};
