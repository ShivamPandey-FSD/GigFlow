import express from 'express';
import { createGig, getGigs } from '../controllers/gig.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get("/", authMiddleware, getGigs);
router.post("/", authMiddleware, createGig);

export default router;
