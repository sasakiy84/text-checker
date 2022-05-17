import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  Button,
  Text,
  Box,
  Divider,
} from '@chakra-ui/react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Container } from 'components/Container';
import RuleGroupFormRow from 'components/ruleGroup/RuleGroupFormRow';
import { client } from 'lib/axios';
import {
  isRuleGroupCreateDto,
  RuleGroup,
  RuleGroupCreateDto,
} from 'domain/ruleGroup/ruleGroup.types';
import { useRouter } from 'next/router';

const RuleGroupCreate = () => {
  const router = useRouter();
  const formDefaultValue: RuleGroupCreateDto = {
    name: '',
    description: '',
    createdBy: '',
    password: 'testtest',
    rules: [
      {
        correct: '',
        incorrect: '',
        note: '',
        level: 'error',
      },
    ],
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RuleGroup>({ defaultValues: formDefaultValue });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rules',
  });

  const onSubmit = async (data: unknown) => {
    if (!isRuleGroupCreateDto(data))
      throw new Error('post data must be RuleGroup type');

    await client.rulegroup.$post({ body: data });
    await router.push('/setting');
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: '95%', maxWidth: '600px' }}
      >
        <Text fontSize="xl" mt={4}>
          基礎情報
        </Text>

        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">名称</FormLabel>
          <Input
            id="name"
            placeholder="対外文書表記"
            {...register('name', {
              required: '名称は必須です',
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.description}>
          <FormLabel htmlFor="description">説明</FormLabel>
          <Textarea
            id="description"
            placeholder="対外文書用語の表記統一です"
            {...register('description', {
              required: '説明は必須です',
            })}
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.createdBy}>
          <FormLabel htmlFor="createdBy">作成者</FormLabel>
          <Input
            id="createdBy"
            placeholder="ななしのごんべえ"
            {...register('createdBy', {
              required: '作成者は必須です',
            })}
          />
          <FormErrorMessage>
            {errors.createdBy && errors.createdBy.message}
          </FormErrorMessage>
        </FormControl>

        <Text fontSize="xl" mt={8}>
          表記ルール
        </Text>
        {fields.map((field, index) => (
          <RuleGroupFormRow
            key={field.id}
            {...{ register, errors, index, remove }}
          />
        ))}
        <Box>
          <Button
            type="button"
            onClick={() =>
              append({ correct: '', incorrect: '', level: 'info' })
            }
            mt={4}
          >
            表記ルールを追加
          </Button>
        </Box>
        <Divider mt={10}></Divider>
        <Box mt={8}>
          <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
            送信
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default RuleGroupCreate;
