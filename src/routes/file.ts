import express from "express";
import * as FilesController from '../controllers/fileUpload'


const fileRouter = express.Router();

fileRouter.get("/", FilesController.getAllFiles);
fileRouter.get("/:id", FilesController.getSingleFile);
fileRouter.post('/', FilesController.uploadFile);
fileRouter.delete('/:id', FilesController.deleteFile);


export default fileRouter;