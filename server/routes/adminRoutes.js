import express from 'express';
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard, getProfile } from '../controllers/adminController.js';
import auth from '../middleware/auth.js'

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/profile",auth,getProfile);
adminRouter.get("/comments",auth, getAllComments);
adminRouter.get("/blogs",auth, getAllBlogsAdmin);
adminRouter.delete("/delete-comment/:id",auth, deleteCommentById);
adminRouter.put("/approve-comment/:id",auth, approveCommentById);
adminRouter.get("/dashboard",auth, getDashboard);

export default adminRouter;