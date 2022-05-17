import {
  RuleGroup,
  RuleGroupCreateDto,
} from 'domain/ruleGroup/ruleGroup.types';

export type Methods = {
  get: {
    resBody: RuleGroup[];
  };
  post: {
    reqBody: RuleGroupCreateDto;

    resBody: RuleGroup;
  };
};
