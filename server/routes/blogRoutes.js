import express from 'express';
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js'

const blogRouter = express.Router();

blogRouter.post("/add", upload.single('image'),auth, addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.delete("/:id", auth, deleteBlogById);
blogRouter.put("/toggle-publish/:id", auth, togglePublish);
blogRouter.post("/add-comment",addComment);
blogRouter.get("/:blogId/comments", getBlogComments);
blogRouter.post("/generate", auth, generateContent);

export default blogRouter;