import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

interface Dog {
  id: string;
  breed: string;
  name: string;
  age: number;
}

interface DogTableProps {
  dogData: Dog[];
  isLoading: boolean;
}

const DogTable: React.FC<DogTableProps> = ({ dogData, isLoading }) => {
  return (
    <TableContainer
      component={Paper}
      //   style={{ maxHeight: "300px", overflowY: "auto" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Breed</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dogData.map((dog) => (
            <TableRow key={dog.id}>
              <TableCell>{dog.breed}</TableCell>
              <TableCell>{dog.name}</TableCell>
              <TableCell>{dog.age}</TableCell>
            </TableRow>
          ))}
          {isLoading && <CircularProgress style={{ display: "block" }} />}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DogTable;
