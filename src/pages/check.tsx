import useAspidaSWR from '@aspida/swr';
import { Box, Textarea, Flex } from '@chakra-ui/react';
import RuleGroupCard from 'components/ruleGroup/RuleGroupCard';
import { RuleGroup } from 'domain/ruleGroup/ruleGroup.types';
import useTextCheck, { checkResult } from 'hooks/useTextCheck';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Container } from 'components/Container';
import RuleGroupSelectModal from 'components/ruleGroup/RuleGroupSelectModal';
import { client } from 'lib/axios';
import CheckAlertPanel from 'components/check/CheckAlertPanel';

const Check: React.FC = () => {
  const [targetRuleGroups, setTargetRuleGroups] = useState<RuleGroup[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { data } = useAspidaSWR(client.rulegroup, 'get');
  const allRuleGroups = useMemo(() => {
    return data ? data.body : [];
  }, [data]);

  const allTargetRules = targetRuleGroups
    .map((targetRuleGroup) =>
      targetRuleGroup.rules.map((rule) => {
        return { ...rule, groupName: targetRuleGroup.name };
      }),
    )
    .flat();

  const [inputText, checkResults, setText] = useTextCheck({
    rules: allTargetRules,
  });

  const targetRuleGroupIds = useMemo(
    () => targetRuleGroups.map((targetRuleGroup) => targetRuleGroup._id),
    [targetRuleGroups],
  );

  const toggleTargetRuleGroup = useCallback(
    (ruleGroup: RuleGroup) => {
      const isSelected = targetRuleGroupIds.includes(ruleGroup._id);
      if (isSelected) {
        setTargetRuleGroups((prevTargetRuleGroups) =>
          prevTargetRuleGroups.filter(
            (prevTargetRuleGroup) => prevTargetRuleGroup._id !== ruleGroup._id,
          ),
        );
      } else {
        setTargetRuleGroups((prevTargetRuleGroups) => [
          ...prevTargetRuleGroups,
          ruleGroup,
        ]);
      }
    },
    [targetRuleGroupIds, setTargetRuleGroups],
  );

  const selectIncorrectRange = useCallback((checkResult: checkResult): void => {
    const textArea = textAreaRef.current;
    if (!textArea) return;
    const startAt = checkResult.startAt;
    const endAt = startAt + checkResult.incorrect.length;
    textArea.focus();
    // カーソル位置にスクロールするため（闇の魔術）
    const fullText = textArea.value;
    textArea.value = fullText.substring(0, endAt);
    textArea.scrollTop = textArea.scrollHeight;
    textArea.value = fullText;

    textArea.setSelectionRange(startAt, endAt);
  }, []);

  return (
    <>
      <Container width="100%">
        <RuleGroupSelectModal
          selectedRuleGroupIds={targetRuleGroupIds}
          ruleGroups={allRuleGroups}
          ruleGroupSetter={(newRuleGroup: RuleGroup) =>
            toggleTargetRuleGroup(newRuleGroup)
          }
        ></RuleGroupSelectModal>
        <Flex w="100%" flexWrap="wrap">
          {targetRuleGroups.map((targetRuleGroup) => (
            <RuleGroupCard
              key={`${targetRuleGroup._id}`}
              ruleGroup={targetRuleGroup}
              styleProps={{
                w: 'calc(50% - 10px)',
                m: '5px',
              }}
            ></RuleGroupCard>
          ))}
        </Flex>
        <Flex
          direction="row"
          justifyContent="space-around"
          wrap="wrap"
          width="100%"
          mt={5}
        >
          <Textarea
            width={{ base: '90%', md: '45%' }}
            height="80vh"
            value={inputText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setText(e.target.value)
            }
            ref={textAreaRef}
          ></Textarea>
          <Box
            width={{ base: '90%', md: '45%' }}
            maxHeight="100vh"
            minHeight="100%"
            overflowY="auto"
          >
            {checkResults.map((checkResult, index) => (
              <CheckAlertPanel
                key={`${checkResult.incorrect}-${index}`}
                checkResult={checkResult}
                clickHandler={() => selectIncorrectRange(checkResult)}
              ></CheckAlertPanel>
            ))}
          </Box>
        </Flex>
      </Container>
    </>
  );
};
export default Check;
