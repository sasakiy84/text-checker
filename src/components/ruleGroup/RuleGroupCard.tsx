import { Box, BoxProps } from '@chakra-ui/react';
import { RuleGroup } from 'domain/ruleGroup/ruleGroup.types';

const RuleGroupCard: React.FC<{
  ruleGroup: RuleGroup;
  styleProps?: BoxProps;
}> = ({ ruleGroup, styleProps }) => (
  <Box
    w="100%"
    borderWidth="3px"
    borderRadius="lg"
    overflow="hidden"
    {...styleProps}
  >
    <Box p="6">
      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        {ruleGroup.name}
      </Box>
      <Box>{ruleGroup.createdBy}</Box>
      <Box mt="1" as="p" lineHeight="tight" isTruncated>
        {ruleGroup.description}
      </Box>
    </Box>
  </Box>
);
export default RuleGroupCard;
