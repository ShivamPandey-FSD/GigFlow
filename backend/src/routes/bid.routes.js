import express from 'express';
import { createBid, getAllBids, getBidsForGig, hireBid } from '../controllers/bid.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/", authMiddleware, createBid);
router.get("/:gigId", authMiddleware, getBidsForGig);
router.get("/", authMiddleware, getAllBids);
router.patch("/:bidId/hire", authMiddleware, hireBid);

export default router;
