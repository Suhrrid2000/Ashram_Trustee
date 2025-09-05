import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String },
    contactNumber: { type: String, required: true },
    message: { type: String, required: true }
}, { 
    timestamps: true,
}); 


const Feedback = mongoose.model('Feedback', FeedbackSchema);

export default Feedback;
