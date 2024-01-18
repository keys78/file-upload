import { Document, Schema, Types, model } from 'mongoose';


export interface File extends Document {
  image: string;
}

const fileSchema = new Schema<File>({
  image: { type: String, required: true },
}, { timestamps: true });

export default model<File>('File', fileSchema);
