import {v2 as cloudinary} from "cloudinary";
//multer-storage-cloudinary library automatically attaches the Cloudinary metadata to the req.file object after the upload is successful.
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from 'multer';
import dotenv from "dotenv";

dotenv.config();

//configure cloudinary
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET,
});
console.log('cloudinary configured');
//setting storage engine
const storage = new CloudinaryStorage({
    cloudinary:cloudinary, 
    //When you are forced to include a parameter because the library (CloudinaryStorage) requires it, but you don't actually need to use it, you prefix the variable with an underscore (_). This tells TypeScript: "I know this is here, but I'm intentionally ignoring it."
    params: async (_req:Request,file:Express.Multer.File) => {
        return{
            folder : 'user_profile_imgs', //this folder will be automatically created at cloudinary dashboard while first upload
            allowed_formats: ['jpg', 'png', 'webp'],
            public_id: `${file.originalname.split('.')[0]}_${Date.now()}`, //unique name for the file
        }
    }
});
console.log('cloudinary storage implemented');

export const upload = multer({ storage: storage });

