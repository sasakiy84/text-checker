import {
  RuleGroup,
  RuleGroupUpdateDto,
} from 'domain/ruleGroup/ruleGroup.types';

export type Methods = {
  get: {
    resBody: RuleGroup;
  };

  patch: {
    reqBody: RuleGroupUpdateDto;

    resBody: RuleGroup;
  };
};
