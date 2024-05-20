// src/App.tsx
import React from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import StudentList from './components/StudentList';
import Leftside from './components/Leftside';
import Headercomp from './components/Headercomp';

const App: React.FC = () => {
  return (
     <Flex width={"100vw"}>
      <Leftside/>
      <Flex flexGrow={1} direction={"column"} width={[7]}>
        <Headercomp />
        <StudentList/>
      </Flex>
    </Flex>
  );
};

export default App;
