import * as t from 'io-ts';

// Rule Array
export const IoTsRule = t.intersection([
  t.type({
    correct: t.string,
    incorrect: t.string,
    level: t.union([
      t.literal('warning'),
      t.literal('error'),
      t.literal('info'),
    ]),
  }),
  t.partial({
    note: t.string,
  }),
]);

export type Rule = t.TypeOf<typeof IoTsRule>;

// RuleGroup BasicInfo
const basicInfo = {
  name: t.string,
  description: t.string,
  createdBy: t.string,
  password: t.string,
};

export const IoTsRuleGroupBasicInfo = t.type(basicInfo);

export type RuleGroupBasicInfo = t.TypeOf<typeof IoTsRuleGroupBasicInfo>;

// RuleGroup Create Data Transfer Object
export const IoTsRuleGroupCreateDto = t.intersection([
  t.type({ rules: t.array(IoTsRule) }),
  IoTsRuleGroupBasicInfo,
]);

export type RuleGroupCreateDto = t.TypeOf<typeof IoTsRuleGroupCreateDto>;
export const isRuleGroupCreateDto: (w: unknown) => w is RuleGroupCreateDto =
  IoTsRuleGroupCreateDto.is;

// RuleGroup Object
export const IoTsRuleGroup = t.intersection([
  t.type({
    _id: t.string,
  }),
  IoTsRuleGroupCreateDto,
]);

export type RuleGroup = t.TypeOf<typeof IoTsRuleGroup>;

export const isRuleGroup: (w: unknown) => w is RuleGroup = IoTsRuleGroup.is;

// RuleGroup Basic Info Data Transfer Object
export const IoTsRuleGroupUpdateDto = t.intersection([
  t.type({
    _id: t.string,
  }),
  t.partial({
    authPassword: t.string,
  }),
  t.partial(basicInfo),
  t.partial({ rules: t.array(IoTsRule) }),
]);

export type RuleGroupUpdateDto = t.TypeOf<typeof IoTsRuleGroupUpdateDto>;

export const isRuleGroupUpdateDto: (w: unknown) => w is RuleGroupUpdateDto =
  IoTsRuleGroupUpdateDto.is;
