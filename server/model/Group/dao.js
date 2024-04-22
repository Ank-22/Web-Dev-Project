import model from './model.js';

export const createGroup = async (group) => model.create(group);
export const findAllGroups = () => model.find();
export const findGroupById = (groupId) => model.findById(groupId).populate('members.userId');
export const updateGroup = (groupId, groupData) => model.findByIdAndUpdate(groupId, { $set: groupData }, { new: true });
export const deleteGroup = (groupId) => model.deleteOne({ _id: groupId });
export const addMember = (groupId, member) => model.findByIdAndUpdate(groupId, { $push: { members: member }, $inc: { memberCount: 1 } }, { new: true });
export const removeMember = (groupId, userId) => model.findByIdAndUpdate(groupId, { $pull: { members: { userId } }, $inc: { memberCount: -1 } }, { new: true });