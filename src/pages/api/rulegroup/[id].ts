import {
  getRuleGroupById,
  updateRuleGroupById,
} from 'domain/ruleGroup/ruleGroup.service';
import { isRuleGroupUpdateDto } from 'domain/ruleGroup/ruleGroup.types';
import { NextApiRequest, NextApiResponse } from 'next';

const ruleGroupIdHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { method } = req;
  const {
    query: { id },
  } = req;

  if (typeof id !== 'string') {
    res.status(400).json({ message: 'invalid id parameter' });
    throw new Error('invalid id parameter');
  }

  switch (method) {
    case 'GET':
      try {
        const ruleGroup = await getRuleGroupById({ id });
        res.status(200).json(ruleGroup);
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    case 'PATCH':
      try {
        const ruleGroupUpdateDto = req.body as unknown;
        if (!isRuleGroupUpdateDto(ruleGroupUpdateDto)) {
          res
            .status(400)
            .json({ message: 'request body must be ruleGroupUpdateDto type' });
          break;
        }
        const updatedRuleGroup = await updateRuleGroupById(ruleGroupUpdateDto);

        res.status(200).json(updatedRuleGroup);
      } catch (error: unknown) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    default:
      console.error(`unexpected method : ${method || 'undefined'}`);
      break;
  }
};

export default ruleGroupIdHandler;
