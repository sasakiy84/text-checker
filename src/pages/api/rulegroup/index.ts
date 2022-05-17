import { NextApiRequest, NextApiResponse } from 'next';
import {
  createRuleGroup,
  getAllRuleGroups,
} from 'domain/ruleGroup/ruleGroup.service';
import { isRuleGroupCreateDto } from 'domain/ruleGroup/ruleGroup.types';

const ruleGroupHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const ruleGroups = await getAllRuleGroups();
        res.status(200).json(ruleGroups);
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    case 'POST':
      try {
        const ruleGroupCreateDto = req.body as unknown;
        if (!isRuleGroupCreateDto(ruleGroupCreateDto)) {
          res
            .status(400)
            .json({ message: 'request body must be ruleGroup type' });
          break;
        }

        const newRuleGroup = await createRuleGroup(ruleGroupCreateDto);

        res.status(200).json(newRuleGroup);
      } catch (error: unknown) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    default:
      break;
  }
};

export default ruleGroupHandler;
