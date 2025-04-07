import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';
export const sendImageToCloudinary = async (
  imageName: string,
  path: string,
): Promise<Record<string, unknown>> => {
  // Configuration
  cloudinary.config({
    cloud_name: 'dluxn37lw',
    api_key: '667457563465524',
    api_secret: 'B8zIPmYg-0gSRbv0x3LOy7QnpkU', // Click 'View API Keys' above to copy your API secret
  });
  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: imageName,
    })
    .catch(error => {
      console.log(error);
    });

  fs.unlink(path, err => {
    if (err) {
      console.log(err);
    } else {
      console.log('File is deleted');
    }
  });

  return uploadResult as UploadApiResponse;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
