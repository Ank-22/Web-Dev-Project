// models/groupItemModel.js
import mongoose from 'mongoose';

const groupItemSchema = new mongoose.Schema({
  groupId: { type: String, ref: 'Group', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['post', 'question'], required: true },
  content: { type: String, required: true },
  createdBy: { type: String, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const GroupItem = mongoose.model('GroupItem', groupItemSchema);
export default GroupItem;