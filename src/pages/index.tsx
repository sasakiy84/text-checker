import { Link as ChakraLink, Stack } from '@chakra-ui/react';

import { Hero } from 'components/Hero';
import { Container } from 'components/Container';
import { Main } from 'components/Main';
import FeatureCard from 'components/FeatureCard';
import Link from 'next/link';

const Index = () => (
  <Container>
    <Hero title="表記チェッカー" />
    <Main>
      <Stack spacing={8}>
        <Link href="/check">
          <ChakraLink>
            <FeatureCard
              title="表記チェック"
              desc="表記ルールグループによる表記チェックを行えます"
            />
          </ChakraLink>
        </Link>
        <Stack spacing={3}>
          <Link href="/setting">
            <ChakraLink>
              <FeatureCard
                title="表記統一管理"
                desc="表記ルールグループの管理を行えます"
              />
            </ChakraLink>
          </Link>
        </Stack>
      </Stack>
    </Main>
  </Container>
);

export default Index;
