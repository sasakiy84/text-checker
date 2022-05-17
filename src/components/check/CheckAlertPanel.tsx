import {
  Alert,
  AlertIcon,
  Box,
  AlertTitle,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import { checkResult } from 'hooks/useTextCheck';

const CheckAlertPanel = ({
  checkResult,
  clickHandler,
}: {
  checkResult: checkResult;
  clickHandler?: (checkResult: checkResult) => void;
}) => (
  <Alert
    onClick={() => !!clickHandler && clickHandler(checkResult)}
    cursor={clickHandler ? 'pointer' : 'auto'}
    variant="left-accent"
    status={checkResult.level}
    width="100%"
  >
    <AlertIcon />
    <Box flex="1">
      <AlertTitle>
        {checkResult.incorrect}({checkResult.startAt}文字目)
      </AlertTitle>
      <Accordion allowToggle>
        <AccordionItem>
          <p>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                正：
                {checkResult.correct.length > 20
                  ? `${checkResult.correct.slice(0, 20)}...`
                  : checkResult.correct}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </p>
          <AccordionPanel pb={4}>
            {checkResult.correct.length > 20 && (
              <p>正：{checkResult.correct}</p>
            )}
            {checkResult.groupName && (
              <p>ルールグループ：{checkResult.groupName}</p>
            )}
            {checkResult.note && <p>詳細メッセージ：{checkResult.note}</p>}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  </Alert>
);
export default CheckAlertPanel;
