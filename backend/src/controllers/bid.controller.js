import Bid from '../models/bid.model.js';
import Gig from '../models/gig.model.js';
import mongoose from "mongoose";

export const createBid = async (req, res) => {
 const session = await mongoose.startSession();
 session.startTransaction();

 try {
  const { gigId, message, price } = req.body;

  if (!gigId || !message || !price) {
   return res.status(400).json({ message: "All fields are required" });
  }

  const gig = await Gig.findById(gigId).session(session);

  if (!gig || gig.status !== "open") {
   return res.status(400).json({ message: "Gig not available" });
  }

  if (gig.ownerId.toString() === req.userId) {
   return res.status(403).json({ message: "You cannot bid on your own gig" });
  }

  if (gig.budget < price) {
   return res.status(403).json({ message: "You cannot bid above the budget price" });
  }

  const existingBid = await Bid.findOne({
   gigId,
   freelancerId: req.userId
  });

  if (existingBid) {
   return res.status(400).json({ message: "You already placed a bid" });
  }

  const bid = await Bid.create([
   {
    gigId,
    freelancerId: req.userId,
    message,
    price
   }
  ], { session });

  await session.commitTransaction();
  session.endSession();

  res.status(201).json(bid);
 } catch (error) {
  await session.abortTransaction();
  session.endSession();

  res.status(400).json({
   message: err.message || "Bid failed",
  });
 }
}

export const getBidsForGig = async (req, res) => {
 const { gigId } = req.params;

 const gig = await Gig.findById(gigId);

 if (!gig) {
  return res.status(404).json({ message: "Gig not found" });
 }

 if (gig.ownerId.toString() !== req.userId) {
  return res.status(403).json({ message: "Not authorized" });
 }

 const bids = await Bid.find({ gigId }).populate(
  "freelancerId",
  "name email"
 );

 res.json(bids);
};

export const getAllBids = async (req, res) => {
 try {
  const freelancerId = req.userId;

  const bids = await Bid.find({ freelancerId }).populate(
   "gigId",
   "title description"
  );

  res.status(200).json(bids);
 } catch (err) {
  res.status(500).json({ message: "Failed to fetch bids" });
 }
}

export const hireBid = async (req, res) => {
 const { bidId } = req.params;

 const bid = await Bid.findById(bidId);
 if (!bid) {
  return res.status(404).json({ message: "Bid not found" });
 }

 const gig = await Gig.findById(bid.gigId);
 if (!gig) {
  return res.status(404).json({ message: "Gig not found" });
 }

 if (gig.ownerId.toString() !== req.userId) {
  return res.status(403).json({ message: "Not authorized to hire" });
 }

 if (gig.status === "assigned") {
  return res.status(400).json({ message: "Gig already assigned" });
 }

 bid.status = "hired";
 await bid.save();

 await Bid.updateMany(
  {
   gigId: gig._id,
   _id: { $ne: bid._id }
  },
  { status: "rejected" }
 );

 gig.status = "assigned";
 await gig.save();

 res.json({ message: "Freelancer hired successfully" });
};
