import { Model, model, models } from 'mongoose';
import { RuleGroup } from './ruleGroup.types';
import RuleGroupSchema from './ruleGroup.schema';

export default (models.RuleGroup as Model<RuleGroup>) ||
  model<RuleGroup>('RuleGroup', RuleGroupSchema);
