// pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(process.cwd(), 'public', 'uploads');
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Generate a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Middleware to handle multipart/form-data
const uploadMiddleware = upload.single('file');

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    uploadMiddleware(req, res, function (err: any) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ error: err.message });
        } else if (err) {
            return res.status(500).json({ error: 'An unknown error occurred!' });
        }

        // @ts-ignore
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Return the relative path to the uploaded file
        const filePath = `/uploads/${file.filename}`;
        return res.status(200).json({ filePath });
    });
}
