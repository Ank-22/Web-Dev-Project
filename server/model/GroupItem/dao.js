
import model from './schema.js';

export const createGroupItem = async (groupItem) => model.create(groupItem);
export const findAllGroupItems = () => model.find();
export const findGroupItemById = (id) => model.findById(id);
export const findGroupItemsByGroupId = (groupId) => model.find({ groupId });
export const updateGroupItem = (id, groupItemData) => model.findByIdAndUpdate(id, { $set: groupItemData }, { new: true });
export const deleteGroupItem = (id) => model.findByIdAndDelete(id);