import { Flex, Heading } from '@chakra-ui/react';

export const Hero = ({ title }: { title: string }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    bgGradient="linear(to-l, primary.main, secondary.main)"
    bgClip="text"
  >
    <Heading fontSize="60px">{title}</Heading>
  </Flex>
);
