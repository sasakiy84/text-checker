import { Schema } from 'mongoose';
import { RuleGroup } from './ruleGroup.types';

const RuleGroupSchema = new Schema<RuleGroup>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    rules: {
      type: [
        {
          correct: {
            type: String,
            required: true,
          },
          incorrect: {
            type: String,
            required: true,
          },
          note: {
            type: String,
          },
          level: {
            type: String,
            enum: ['warning', 'error', 'info'],
          },
        },
      ],
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export default RuleGroupSchema;
