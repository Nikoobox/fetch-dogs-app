import { FC } from "react";
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

import { DogProps } from "../../api";

interface DogTableProps {
  dogData: DogProps[];
  isLoading: boolean;
  tableRef?: React.Ref<HTMLDivElement>; // Add ref prop for forwarding
}

const DogTable: FC<DogTableProps> = ({ dogData, isLoading, tableRef }) => {
  return (
    <div style={{ position: "relative" }}>
      {isLoading && (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
        />
      )}
      <TableContainer
        component={Paper}
        ref={tableRef}
        sx={{ maxHeight: "350px", overflowY: "auto" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Breed</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Age</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Zip Code</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dogData.map(({ id, breed, name, age, zip_code, img }) => (
              <TableRow key={id}>
                <TableCell>{breed}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{age}</TableCell>
                <TableCell>{zip_code}</TableCell>
                <TableCell>
                  <img
                    src={img}
                    alt="Dog"
                    style={{
                      borderRadius: "50%",
                      width: "56px",
                      height: "56px",
                      objectFit: "cover",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DogTable;
