// EditModal.tsx
import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Flex } from "@chakra-ui/react";
import StudentForm from "./StudentForm";

interface EditModalProps {
  studentId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ onSuccess, studentId, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Student</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <StudentForm onSuccess={onSuccess} studentId={studentId} onClose={onClose}  />
        </ModalBody>
        <ModalFooter>
         
       <Flex justify="center" mr={10}>
            <Button colorScheme="blue"  onClick={onClose}>
              Close
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
