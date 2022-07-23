import { Container, Heading } from '@chakra-ui/react';
import { Contents } from './contents/contents';

export const ContentsContainer = () => {
  return (
    <Container>
      <Heading>dropzone</Heading>
      <Contents />
    </Container>
  );
};
