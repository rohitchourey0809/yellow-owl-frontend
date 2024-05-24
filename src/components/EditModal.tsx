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
         
   
           <ModalFooter width="100%" display="flex" justifyContent="center">
            <Button colorScheme="red" onClick={onClose} px={48}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
