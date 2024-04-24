import mongoose from 'mongoose';

// Define the schema for members of the group
const memberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ['admin', 'member'], default: 'member' } // default role as admin for initial member
}, { _id: false }); // This prevents Mongoose from automatically creating an _id for each member



const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [memberSchema],
  memberCount: { type: Number, default: function() { return this.members.length; } },
  createdAt: { type: Date, default: Date.now }
});



export default groupSchema;