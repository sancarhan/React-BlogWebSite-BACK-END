import express from 'express';
import { adminLogin, approveCommentaById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.post("/delete-comments", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveCommentaById);
adminRouter.get("/dashboard", auth, getDashboard);

export default adminRouter;