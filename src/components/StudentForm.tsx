import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { Student } from '../types/Student';
import { addStudent, getStudentById, updateStudent } from '../services/studentService';

interface Props {
  onSuccess: () => void;
  studentId?: string; // Make studentId prop optional
  onClose: () => void;
}

const StudentForm: React.FC<Props> = ({ onSuccess, studentId, onClose }) => {
  const [formData, setFormData] = useState<Student>({
    name: '',
    email: '',
    phoneNumber: '',
    enrollmentNo: '',
    dateOfAdmission: '',
  });

  useEffect(() => {
    if (studentId) {
      // Fetch student data if studentId is provided (for editing)
      fetchStudentData();
    }
  }, [studentId]);

  const fetchStudentData = async () => {
    try {
      const student = await getStudentById(studentId!); // Use '!' to assert non-nullability
      setFormData(student);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId) {
      // If studentId is provided, update the existing student
      await updateStudent(studentId, formData);
    } else {
      // If studentId is not provided, add a new student
      await addStudent(formData);
    }
    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      enrollmentNo: '',
      dateOfAdmission: '',
    });
    onSuccess();
  };

  return (
    <Box mb={5}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input name="email" value={formData.email} onChange={handleChange} />
          </FormControl>
          <FormControl id="phoneNumber">
            <FormLabel>Phone Number</FormLabel>
            <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </FormControl>
          <FormControl id="enrollmentNo">
            <FormLabel>Enrollment No</FormLabel>
            <Input name="enrollmentNo" value={formData.enrollmentNo} onChange={handleChange} />
          </FormControl>
          <FormControl id="dateOfAdmission">
            <FormLabel>Date of Admission</FormLabel>
            <Input name="dateOfAdmission" type="date" value={formData.dateOfAdmission} onChange={handleChange} />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            {studentId ? 'Update Student' : 'Add Student'} {/* Conditional text based on whether studentId is provided */}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default StudentForm;
