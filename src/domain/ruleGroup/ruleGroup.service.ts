import dbConnect from 'lib/dbConnect';
import {
  RuleGroup,
  Rule,
  RuleGroupCreateDto,
  RuleGroupUpdateDto,
} from './ruleGroup.types';
import ruleGroupModel from './ruleGroup.model';

// 作成系
export const createRuleGroup = async (
  ruleGroupCreateDto: RuleGroupCreateDto,
): Promise<RuleGroup> => {
  await dbConnect();

  try {
    const newRuleGroup = await ruleGroupModel.create(ruleGroupCreateDto);

    return newRuleGroup;
  } catch (error) {
    throw new Error(`creating new rule group failed`);
  }
};

// 取得系
export const getAllRuleGroups = async (): Promise<RuleGroup[]> => {
  await dbConnect();

  try {
    return await ruleGroupModel.find({}, { 'rules._id': 0 }).lean();
  } catch (error) {
    throw new Error('getting all rule groups failed');
  }
};

export const getRuleGroupById = async ({
  id,
}: {
  id: string;
}): Promise<RuleGroup | null> => {
  await dbConnect();

  const targetRuleGroup = await ruleGroupModel.findById(id).lean();
  !targetRuleGroup && console.warn(`ObjectId: ${id} does not exists`);

  return targetRuleGroup;
};

export const getRuleGroupBySearch = async ({
  ids,
}: {
  ids: string[];
}): Promise<RuleGroup[]> => {
  await dbConnect();

  const targetRuleGroups = await ruleGroupModel
    .find({ _id: { $in: ids } })
    .lean();
  targetRuleGroups.length === 0 &&
    console.warn(`ObjectIds: ${String(ids)} does not exists`);

  return targetRuleGroups;
};

// 更新系
export const updateRuleGroupById = async (
  ruleGroupUpdateDto: RuleGroupUpdateDto,
): Promise<RuleGroup | null> => {
  await dbConnect();

  const {
    _id: id,
    authPassword: _authpassword,
    ...updateData
  } = ruleGroupUpdateDto;

  const newRuleGroup = await ruleGroupModel
    .findByIdAndUpdate(id, {
      $set: updateData,
    })
    .lean();
  !newRuleGroup && console.warn(`ObjectId: ${id} does not exists`);

  return newRuleGroup;
};

export const pushRuleToRuleGroup = async ({
  id,
  newRules,
}: {
  id: string;
  newRules: Rule[];
}): Promise<RuleGroup | null> => {
  await dbConnect();

  const targetRuleGroup = await ruleGroupModel.findByIdAndUpdate(id, {
    $push: { rules: newRules },
  });
  !targetRuleGroup && console.warn(`ObjectId: ${id} does not exists`);

  return targetRuleGroup;
};
