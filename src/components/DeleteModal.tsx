// src/components/DeleteModal.tsx
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Flex,
  Center,
} from '@chakra-ui/react';

interface Props {
  studentId: string;
  isOpen: boolean;
  onClose: () => void;
  handleDelete: (id: string) => void;
}

const DeleteModal: React.FC<Props> = ({ studentId, isOpen, onClose, handleDelete }) => {
  const confirmDelete = () => {
    handleDelete(studentId);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent py={20}>
        {/* <ModalHeader>Delete Student</ModalHeader> */}
        <ModalCloseButton />
        <ModalBody>
         <Center> <Text>Are you sure you want to delete this student?</Text></Center>
        </ModalBody>

        <ModalFooter >
        <Flex  width="100%" justifyContent="center" gap={2}>
            <Button colorScheme="green" px={20} onClick={confirmDelete}>
            Yes
          </Button>
          <Button colorScheme="red" px={20}  onClick={onClose}>No</Button>
        </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
