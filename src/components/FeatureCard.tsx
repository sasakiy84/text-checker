import { Box, BoxProps, Heading, Text } from '@chakra-ui/react';

const FeatureCard = ({
  title,
  desc,
  ...rest
}: {
  title: string;
  desc: string;
  rest?: BoxProps;
}) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" backgroundColor="white" {...rest}>
      <Heading fontSize="xl" noOfLines={2}>
        {title}
      </Heading>
      <Text noOfLines={3}>{desc}</Text>
    </Box>
  );
};

export default FeatureCard;
