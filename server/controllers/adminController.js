import jwt from 'jsonwebtoken'
import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'

export const adminLogin = async(req,res) => {
    try{
        const {email, password} = req.body;
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials!"
            })
        }

        const token = jwt.sign(
            {email}, 
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        )
        return res.status(200).json({
            success: true,
            message: "Login Successful!",
            token
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message         
        })
    }
}

export const getAllBlogsAdmin = async(req,res) => {
    try {
        const blogs = await Blog.find({}).sort({createdAt: -1})
        return res.status(200).json({
            success: true,
            message: "All Blogs fetched successfully!",
            blogs
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllComments = async(req,res) => {
    try {
        const comments = await Comment.find({}).populate("blog").sort({createdAt: -1});
        return res.status(200).json({
            success: true,
            message: "All comments fetched successfully!",
            comments
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getDashboard = async(req,res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({createdAt: -1}).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({isPublished: false})

        const dashboardData = {
            blogs, comments, drafts, recentBlogs
        }

        return res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully!",
            dashboardData
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteCommentById = async(req,res) => {
    try {
        const {id} = req.params;
        await Comment.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully!"
        })
    } catch (error) {
       return res.status(400).json({
            success: false,
            message: error.message
       })
    }
}

export const approveCommentById = async(req,res) => {
    try {
        const {id} = req.params;
        await Comment.findByIdAndUpdate(id, {isApproved: true});
        return res.status(200).json({
            success: true,
            message: "Comment approved successfully!"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

