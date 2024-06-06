import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, FormErrorMessage } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (studentId) {
      // Fetch student data if studentId is provided (for editing)
      fetchStudentData();
    }
  }, [studentId]);

  const fetchStudentData = async () => {
    try {
      const student = await getStudentById(studentId!); // Use '!' to assert non-nullability
      setFormData({
        ...student,
        dateOfAdmission: student.dateOfAdmission ? new Date(student.dateOfAdmission).toISOString().split('T')[0] : ''
      });
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear errors on change
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number is invalid';
    }
    if (!formData.enrollmentNo) {
      newErrors.enrollmentNo = 'Enrollment number is required';
    }
    if (!formData.dateOfAdmission) {
      newErrors.dateOfAdmission = 'Date Of Admission is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (studentId) {
        // If studentId is provided, update the existing student
        await updateStudent(studentId, formData);
        toast.success('Student updated successfully!');
      } else {
        // If studentId is not provided, add a new student
        await addStudent(formData);
        toast.success('Student added successfully!');
      }
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        enrollmentNo: '',
        dateOfAdmission: '',
      });
      onSuccess();
      setTimeout(() => {
        onClose();
        navigate('/');
      }, 2000); // Delay to allow the user to see the notification
    } catch (error) {
      console.error('Error saving student data:', error);
      toast.error('Error saving student data');
    }
  };

  return (
    <Box mb={5}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormControl id="name" isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={formData.name} onChange={handleChange} />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>
          <FormControl id="email" isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input name="email" value={formData.email} onChange={handleChange} />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl id="phoneNumber" isInvalid={!!errors.phoneNumber}>
            <FormLabel>Phone Number</FormLabel>
            <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
          </FormControl>
          <FormControl id="enrollmentNo" isInvalid={!!errors.enrollmentNo}>
            <FormLabel>Enrollment No</FormLabel>
            <Input name="enrollmentNo" value={formData.enrollmentNo} onChange={handleChange} />
            <FormErrorMessage>{errors.enrollmentNo}</FormErrorMessage>
          </FormControl>
          <FormControl id="dateOfAdmission" isInvalid={!!errors.dateOfAdmission}>
            <FormLabel>Date of Admission</FormLabel>
            <Input name="dateOfAdmission" type="date" value={formData.dateOfAdmission} onChange={handleChange} />
            <FormErrorMessage>{errors.dateOfAdmission}</FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="blue">
            {studentId ? 'Update Student' : 'Add Student'} {/* Conditional text based on whether studentId is provided */}
          </Button>
        </Stack>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default StudentForm;
