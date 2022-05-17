import useAspidaSWR from '@aspida/swr';
import { client } from 'lib/axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
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
import {
  isRuleGroupUpdateDto,
  RuleGroup,
} from 'domain/ruleGroup/ruleGroup.types';

const RuleGroupId: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RuleGroup>({
    defaultValues: {
      _id: '',
      name: '',
      description: '',
      createdBy: '',
      password: '',
      rules: [],
    },
  });

  const { data } = useAspidaSWR(client.rulegroup._id(id as string), 'get', {
    enabled: typeof id === 'string',
  });
  useEffect(() => {
    reset(data?.body);
  }, [data]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rules',
  });

  if (typeof id !== 'string') return <p>id is not string</p>;
  if (!data) return <p>loading</p>;
  if (!data.body) return <p>data was not found</p>;

  const onSubmit = async (data: unknown) => {
    if (!isRuleGroupUpdateDto(data))
      throw new Error('post data must be RuleGroupUpdateDto type');

    const updatedRuleGroup = await client.rulegroup
      ._id(data._id)
      .$patch({ body: data });

    console.log(updatedRuleGroup);
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
            placeholder="名称"
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
            placeholder="説明"
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
            placeholder="作成者"
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

export default RuleGroupId;
