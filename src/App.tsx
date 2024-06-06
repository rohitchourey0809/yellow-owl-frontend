// src/App.tsx
import React from "react";
import {  Flex } from "@chakra-ui/react";
import StudentList from "./components/StudentList";
import Leftside from "./components/Leftside";
import Headercomp from "./components/Headercomp";
import { Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
  
      <Flex width={"100vw"}>
        <Leftside />
        <Flex flexGrow={1} direction={"column"} width={[7]}>
          <Headercomp />
            <Routes>
          <Route path="/" element={<StudentList />} />
          </Routes>
        </Flex>
      </Flex>
  
  );
};

export default App;
