import Group from "./schema.js";

export const createGroup = (group) => Group.create(group);

export const deleteGroup = (groupId) => Group.deleteOne({ id: groupId });

export const updateGroup = (groupId, groupData) =>
  Group.updateOne({ id: groupId }, { $set: groupData });

export const findAllGroups = () => Group.find();

export const findGroupById = (groupId) => Group.findOne({ id: groupId });
