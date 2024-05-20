// src/services/studentService.ts
import axios from "axios";
import { Student } from "../types/Student";

const API_URL = "https://backend-yellow-owl.vercel.app/students";

export const getStudents = async () => {
  const response = await axios.get<Student[]>(API_URL);
  return response.data;
};

export const addStudent = async (student: Student) => {
  const response = await axios.post<Student>(API_URL, student);
  return response.data;
};

export const updateStudent = async (id: string, student: Student) => {
  const response = await axios.put<Student>(`${API_URL}/${id}`, student);
  return response.data;
};

export const getStudentsByName = async (searchValue?: string): Promise<Student[]> => {
  try {
    let url = API_URL;
    if (searchValue) {
      // If searchValue is provided, include it in the API request as a query parameter
      url += `?name=${searchValue}`;
    }
    const response = await axios.get<Student[]>(url);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching students: ");
  }
};



export const deleteStudent = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};


export const getStudentById = async (id: string) => {
  const response = await axios.get<Student>(`${API_URL}/${id}`);
  return response.data;
};
