import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// POST API to save feedback
router.post("/", async (req, res) => {
    try {
        const { name, address, email, contactNumber, message } = req.body;

        // Basic validation
        if (!name || !address || !contactNumber || !message) {
            return res.status(400).json({ error: "Please fill all mandatory fields" });
        }

        // Create new feedback entry
        const newFeedback = new Feedback({
            name,
            address,
            email,
            contactNumber,
            message
        });

        await newFeedback.save();
        res.status(201).json({ message: "Feedback submitted successfully!" });

    } catch (error) {
        console.error("Error saving feedback:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});

export default router;
