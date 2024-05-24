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
      <Button  onClick={onOpen}
      colorScheme="green"
     width="auto"
      fontSize={["xs", "sm", "md"]} 
      px={["22"]} 
      py={["auto"]}
    

      textAlign={"center"}
      whiteSpace="normal"
      
    >
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
          <ModalFooter width="100%" display="flex" justifyContent="center">
            <Button colorScheme="red" onClick={onClose} px={48}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StudentModal;
