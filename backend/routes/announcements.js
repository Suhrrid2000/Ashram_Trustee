import express from "express";
import Announcement from "../models/Announcement.js";

const router = express.Router();

/**
 * @route   POST /api/announcements
 * @desc    Add a new announcement
 */
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const newAnnouncement = new Announcement({ title, description });
    await newAnnouncement.save();

    res.status(201).json(newAnnouncement);
  } catch (error) {
    console.error("Error adding announcement:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   GET /api/announcements
 * @desc    Get all announcements (no pagination)
 */
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 }); // newest first
    res.json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   PUT /api/announcements/:id
 * @desc    Update an announcement
 */
router.put("/:id", async (req, res) => {
  try {
    const { title, description } = req.body;

    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating announcement:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   DELETE /api/announcements/:id
 * @desc    Delete an announcement
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
