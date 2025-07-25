import jwt from 'jsonwebtoken'
import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found!",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials!",
            });
        }
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        return res.status(200).json({
            success: true,
            message: "Login Successful!",
            token
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const { email } = req.user;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            });
        }

        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllBlogsAdmin = async(req,res) => {
    try {
        const {id} = req.user;
        const blogs = await Blog.find({author: id}).sort({createdAt: -1})
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

export const getAllComments = async (req, res) => {
  try {
    const { id } = req.user;
    const userBlogs = await Blog.find({ author: id }).select('_id');
    const blogIds = userBlogs.map(blog => blog._id);
    const comments = await Comment.find({ blog: { $in: blogIds } })
      .populate('blog')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "All comments on your blogs fetched successfully!",
      comments,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDashboard = async (req, res) => {
    try {
        const { id } = req.user;
        const userBlogs = await Blog.find({ author: id }).select('_id');
        const blogIds = userBlogs.map(blog => blog._id);

        //dashboard data
        const recentBlogs = await Blog.find({ author: id }).sort({ createdAt: -1 }).limit(5);
        const blogs = userBlogs.length;
        const comments = await Comment.countDocuments({ blog: { $in: blogIds } });
        const drafts = await Blog.countDocuments({ author: id, isPublished: false });

        const dashboardData = {
            blogs,
            comments,
            drafts,
            recentBlogs
        };

        return res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully!",
            dashboardData
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


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

