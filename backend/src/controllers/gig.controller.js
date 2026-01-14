import Gig from '../models/gig.model.js';

export const createGig = async (req, res) => {
 const { title, description, budget } = req.body;

 console.log(title)
 console.log(description)
 console.log(budget)

 if (!title || !description || !budget) {
  return res.status(400).json({ message: "All fields are required" });
 }

 const gig = await Gig.create({
  title,
  description,
  budget,
  ownerId: req.userId
 });

 res.status(201).json(gig);
}

export const getGigs = async (req, res) => {
 const { search } = req.query;
 
 const filter = {
  status: "open"
 };

 if (search) {
  filter.title = { $regex: search, $options: "i" };
 }

 const gigs = await Gig.find(filter).sort({ createdAt: -1 });

 res.json(gigs);
}
