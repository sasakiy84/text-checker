import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  Select,
  Box,
  Stack,
  Button,
  Flex,
} from '@chakra-ui/react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { RuleGroup } from 'domain/ruleGroup/ruleGroup.types';

const RuleGroupFormRow = ({
  register,
  remove,
  errors,
  index,
}: {
  register: UseFormRegister<RuleGroup>;
  remove: (index?: number | number[]) => void;
  errors: FieldErrors<RuleGroup>;
  index: number;
}) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" boxShadow="base" p={2} mt={2}>
      <Stack direction={['column', 'row']} spacing="24px">
        <FormControl
          isInvalid={!!(errors.rules && errors.rules[index].correct)}
        >
          <FormLabel htmlFor={`rules.${index}.correct`}>正表記</FormLabel>
          <Input
            id={`rules.${index}.correct`}
            placeholder="LINE"
            {...register(`rules.${index}.correct` as const, {
              required: '正表記は必須です',
            })}
          />
          <FormErrorMessage>
            {errors.rules &&
              errors.rules[index].correct &&
              errors.rules[index].correct?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!(errors.rules && errors.rules[index].incorrect)}
        >
          <FormLabel htmlFor={`rules.${index}.incorrect`}>誤表記</FormLabel>
          <Input
            id={`rules.${index}.incorrect`}
            placeholder="line"
            {...register(`rules.${index}.incorrect` as const, {
              required: '誤表記は必須です',
            })}
          />
          <FormErrorMessage>
            {errors.rules &&
              errors.rules[index].incorrect &&
              errors.rules[index].incorrect?.message}
          </FormErrorMessage>
        </FormControl>
      </Stack>
      <FormControl isInvalid={!!(errors.rules && errors.rules[index].note)}>
        <FormLabel htmlFor={`rules.${index}.note`}>説明</FormLabel>
        <Textarea
          id={`rules.${index}.note`}
          placeholder="企業名の場合、大文字で書きます"
          {...register(`rules.${index}.note` as const)}
        />
        <FormErrorMessage>
          {errors.rules &&
            errors.rules[index].note &&
            errors.rules[index].note?.message}
        </FormErrorMessage>
      </FormControl>
      <Flex wrap={['wrap', 'nowrap']}>
        <FormControl isInvalid={!!(errors.rules && errors.rules[index].level)}>
          <FormLabel htmlFor={`rules.${index}.level`}>注意レベル</FormLabel>
          <Select
            id={`rules.${index}.level`}
            {...register(`rules.${index}.level` as const, {
              required: '注意レベルは必須です',
            })}
          >
            <option value="info">提案</option>
            <option value="warning">忠告</option>
            <option value="error">警告</option>
          </Select>
          <FormErrorMessage>
            {errors.rules &&
              errors.rules[index].level &&
              errors.rules[index].level?.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          type="button"
          colorScheme="red"
          mt="30px"
          ml={[0, 3]}
          onClick={() => remove(index)}
        >
          削除
        </Button>
      </Flex>
    </Box>
  );
};
export default RuleGroupFormRow;
