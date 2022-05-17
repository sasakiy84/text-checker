import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import RuleGroupCard from 'components/ruleGroup/RuleGroupCard';
import { RuleGroup } from 'domain/ruleGroup/ruleGroup.types';

const RuleGroupSelectModal: React.FC<{
  selectedRuleGroupIds: string[];
  ruleGroups: RuleGroup[];
  ruleGroupSetter: (ruleGroup: RuleGroup) => void;
}> = ({ ruleGroups, ruleGroupSetter, selectedRuleGroupIds }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button mt={3} onClick={onOpen}>
        ルールグループを選択
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalHeader>ルールグループ選択</ModalHeader>
          <ModalBody>
            {ruleGroups.map((ruleGroup, index) => (
              <div
                key={`${ruleGroup.name}_${index}`}
                onClick={() => ruleGroupSetter(ruleGroup)}
              >
                <RuleGroupCard
                  ruleGroup={ruleGroup}
                  styleProps={{
                    as: 'button',
                    borderColor: selectedRuleGroupIds.includes(ruleGroup._id)
                      ? 'primary.main'
                      : undefined,
                    mb: '5px',
                  }}
                ></RuleGroupCard>
              </div>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RuleGroupSelectModal;
