import fs from 'fs'
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js'

export const addBlog = async(req,res) => {
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;

        //check if all fields are present
        if(!title || !subTitle || !description || !category || !imageFile){
            return res.status(400).json({
                success: false,
                message: "missing required fields!"
            })
        }

        const fileBuffer = fs.readFileSync(imageFile.path)

        //upload image to ImageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        })

        //image optimization through ImageKit URL transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'}, //auto compression
                {format: 'webp'}, //convert to modern format
                {width: '1280'} //width resizing
            ]
        });

        const image = optimizedImageUrl;

        await Blog.create({
            title,
            subTitle,
            description,
            category, 
            image,
            isPublished
        })

        return res.status(200).json({
            success: true,
            message: "Blog added successfully!"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}