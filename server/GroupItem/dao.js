import GroupItem from "./schema.js";

export const createGroupItem = (groupItem) => GroupItem.create(groupItem);

export const deleteGroupItem = (itemId) => GroupItem.deleteOne({ id: itemId });

export const updateGroupItem = (itemId, groupItemData) =>
  GroupItem.updateOne({ id: itemId }, { $set: groupItemData });

export const findAllGroupItems = () => GroupItem.find();

export const findGroupItemById = (itemId) => GroupItem.findOne({ id: itemId });
