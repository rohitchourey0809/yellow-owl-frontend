// src/components/StudentModal.tsx
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
} from '@chakra-ui/react';
import StudentForm from './StudentForm';

interface Props {
  onSuccess: () => void;
}

const StudentModal: React.FC<Props> = ({ onSuccess }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="green"  
          w={["100px", "100px", "300px"]}>
        ADD NEW STUDENT
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <StudentForm onSuccess={onSuccess} onClose={onClose} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StudentModal;
