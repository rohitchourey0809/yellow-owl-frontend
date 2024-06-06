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

export const getStudentsByName = async (
  searchValue?: string
): Promise<Student[]> => {
  try {
    let url = `${API_URL}/search`;
    if (searchValue) {
      url += `?name=${searchValue}`;
    }
    const response = await axios.get<{ students: Student[] }>(url);
    return response.data.students; // Access the 'students' property
  } catch (error: any) {
    console.error("Error fetching students:", error);
    throw new Error("Error fetching students: " + error.message);
  }
};

export const getStudentsWithSearchSortPagination = async (
  searchValue?: string,
  sortField?: string,
  sortOrder?: "asc" | "desc",
  page?: number,
  limit?: number
): Promise<{
  students: Student[];
  totalPages: number;
  currentPage: number;
}> => {
  try {
    let url = `${API_URL}/search?`;

    if (searchValue) {
      url += `name=${searchValue}&`;
    }
    if (sortField) {
      url += `sortField=${sortField}&`;
    }
    if (sortOrder) {
      url += `sortOrder=${sortOrder}&`;
    }
    if (page) {
      url += `page=${page}&`;
    }
    if (limit) {
      url += `limit=${limit}&`;
    }

    // Remove trailing '&' or '?' if present
    url = url.replace(/[&?]$/, "");

    const response = await axios.get<{
      students: Student[];
      totalPages: number;
      currentPage: number;
    }>(url);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching students:", error);
    throw new Error("Error fetching students: " + error.message);
  }
};

export const deleteStudent = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const getStudentById = async (id: string) => {
  const response = await axios.get<Student>(`${API_URL}/${id}`);
  return response.data;
};
