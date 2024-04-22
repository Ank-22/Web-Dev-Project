import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: { type: String, enum: ['admin', 'member'], default: 'member' }
});

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [memberSchema],
  memberCount: { type: Number, default: function() { return this.members.length; } },
  createdAt: { type: Date, default: Date.now }
});

export default groupSchema;