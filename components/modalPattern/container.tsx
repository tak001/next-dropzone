import { Container, Heading } from '@chakra-ui/react';
import { Contents } from './contents/contents';

export const ModalPatternContainer = () => {
  return (
    <Container>
      <Heading>dropzone</Heading>
      <Contents />
    </Container>
  );
};
