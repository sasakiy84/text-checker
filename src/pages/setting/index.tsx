import {
  Stack,
  Link as ChakraLink,
  Divider,
  Grid,
  GridItem,
  Heading,
  Box,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Container } from 'components/Container';
import FeatureCard from 'components/FeatureCard';
import { client } from 'lib/axios';
import useAspidaSWR from '@aspida/swr';
import { useMemo } from 'react';

const Setting = () => {
  const { data } = useAspidaSWR(client.rulegroup, 'get');
  const allRuleGroups = useMemo(() => {
    return data ? data.body : [];
  }, [data]);

  return (
    <Container>
      <Stack spacing={8}>
        <Link href="/setting/new">
          <ChakraLink>
            <FeatureCard
              title="新規作成"
              desc="表記ルールグループの新規作成を行えます"
            />
          </ChakraLink>
        </Link>
      </Stack>
      <Divider mt="40px" mb="40px"></Divider>
      <Box textAlign="left" mb={10}>
        <Heading textAlign="left">編集</Heading>
      </Box>
      <Grid gap={3} templateColumns={['1fr', 'repeat(2,1fr)', 'repeat(3,1fr)']}>
        {allRuleGroups.map((ruleGroup) => {
          return (
            <GridItem key={ruleGroup._id}>
              <Link href={`/setting/${ruleGroup._id}`}>
                <ChakraLink>
                  <FeatureCard
                    title={ruleGroup.name}
                    desc={ruleGroup.description}
                  />
                </ChakraLink>
              </Link>
            </GridItem>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Setting;
