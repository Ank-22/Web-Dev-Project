import model from './model.js';

export const createGroup = async (groupData) => {
    // Create a new group instance
    const newGroup = new model({
      name: groupData.name,
      description: groupData.description,
      members: [{ userId: groupData.members[0].userId, role: 'admin' }],
      memberCount: 1, // Initialize the member count as 1
    });
  
    return await newGroup.save();
  };
export const findAllGroups = () => model.find();
export const findGroupById = (groupId) => model.findById(groupId);
export const updateGroup = (groupId, groupData) => model.findByIdAndUpdate(groupId, { $set: groupData }, { new: true });
export const deleteGroup = (groupId) => model.deleteOne({ _id: groupId });
export const addMember = (groupId, member) => model.findByIdAndUpdate(groupId, { $push: { members: member }, $inc: { memberCount: 1 } }, { new: true });
export const removeMember = (groupId, userId) => model.findByIdAndUpdate(groupId, { $pull: { members: { userId } }, $inc: { memberCount: -1 } }, { new: true });