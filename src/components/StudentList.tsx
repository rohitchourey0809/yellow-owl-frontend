import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Heading,
  Input,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  TableContainer,
} from "@chakra-ui/react";
import { Student } from "../types/Student";
import {  deleteStudent, getStudents, getStudentsByName } from "../services/studentService";
import StudentForm from "./StudentForm";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import StudentModal from "./StudentModal";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentId, setStudentId] = useState<string>("");
 const [searchInput, setSearchInput] = useState<string>("")
   useEffect(() => {
    loadStudents();
  }, [searchInput]);

  const loadStudents = async () => {
    try {
      let data;
      if (searchInput) {
        data = await getStudentsByName(searchInput);
      } else {
        data = await getStudents();
      }
      setStudents(data);
    } catch (error) {
      console.error("Error loading students:", error);
    } finally {
      setLoading(false);
    }
  };


   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStudent(id);
      loadStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const openEditModal = (id: string) => {
    setStudentId(id);
    setEditModalOpen(true);
  };

  const openDeleteModal = (id: string) => {
    setStudentId(id);
    setDeleteModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    loadStudents();
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    loadStudents();
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box bg={"#E5E7EB"} height={"90vh"}>
      <VStack h={"90vh"} p={5}>
        <HStack
          w={"100%"}
          py={2}
          borderRadius={"10px"}
          px={5}
          justify={"space-between"}
        >
          <Box>
            <Heading as="h2" size="lg">
              Students
            </Heading>
          </Box>
          <Flex maxW={"70%"} gap={"10px"}>
            <Input
              type="text"
              placeholder="Search..."
              bgColor={"white"}
             value={searchInput}
              onChange={handleSearchChange}
            />
            
            <StudentModal onSuccess={loadStudents}  />
          </Flex>
        </HStack>
        <TableContainer
          w={"100%"}
          shadow={
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"
          }
          borderRadius={"8px"}
        >
          <Table variant="simple">
            <Thead bg={"#F9FAFB"} padding={"10px"} textAlign={"center"}>
              <Tr>
                <Th textAlign={"center"}>NAME</Th>
                <Th textAlign={"center"}>EMAIL</Th>
                <Th textAlign={"center"}>PHONE</Th>
                <Th textAlign={"center"}>ENROLL NUMBER</Th>
                <Th textAlign={"center"}>DATE OF ADMISSION</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody bg={"#FFFFFF"} m={"10px"}>
              {students.map((student) => (
                <Tr key={student._id}>
                  <Td textAlign={"left"}>{student.name}</Td>
                  <Td textAlign={"center"}>{student.email}</Td>
                  <Td textAlign={"center"}>{student.phoneNumber}</Td>
                  <Td textAlign={"center"}>{student.enrollmentNo}</Td>
                  <Td textAlign={"center"}>{student.dateOfAdmission}</Td>
                  <Td textAlign={"center"}>
                    <Flex justifyContent={"start"} gap={"10px"}>
                      <EditIcon
                        color="blue"
                        onClick={() => openEditModal(String(student._id))}
                        _hover={{
                          cursor: "pointer",
                        }}
                      />
                      <DeleteIcon
                        color="red"
                        onClick={() => openDeleteModal(String(student._id))}
                        _hover={{
                          cursor: "pointer",
                        }}
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <EditModal
          onSuccess={loadStudents}
          studentId={studentId}
          isOpen={editModalOpen}
          onClose={handleCloseEditModal}
        />
        <DeleteModal
          studentId={studentId}
          isOpen={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          handleDelete={handleDelete}
        />
      </VStack>
    </Box>
  );
};

export default StudentList;
