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
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { DogProps } from "../../api";

interface DogTableProps {
  dogData: DogProps[];
  isLoading: boolean;
  tableRef?: React.Ref<HTMLDivElement>;
  onSort: (field: "breed" | "name" | "age") => void;
  sortInfo: string | undefined;
}

const DogTable: FC<DogTableProps> = ({
  dogData,
  isLoading,
  tableRef,
  onSort,
  sortInfo,
}) => {
  const [sortField, sortDirection] = sortInfo
    ? sortInfo.split(":")
    : [null, null];

  const renderSortIcon = (field: string) => {
    if (sortField === field) {
      return sortDirection === "asc" ? (
        <ArrowUpwardIcon fontSize="small" />
      ) : (
        <ArrowDownwardIcon fontSize="small" />
      );
    }
    return null;
  };

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
        sx={{
          maxHeight: "350px",
          overflowY: "auto",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                onClick={() => onSort("breed")}
                sx={{ cursor: "pointer" }}
              >
                <Typography
                  sx={{ display: "flex", gap: 0.5, fontWeight: "bold" }}
                >
                  Breed {renderSortIcon("breed")}
                </Typography>
              </TableCell>
              <TableCell
                onClick={() => onSort("name")}
                sx={{ cursor: "pointer" }}
              >
                <Typography
                  sx={{ display: "flex", gap: 0.5, fontWeight: "bold" }}
                >
                  Name {renderSortIcon("name")}
                </Typography>
              </TableCell>
              <TableCell
                onClick={() => onSort("age")}
                sx={{ cursor: "pointer" }}
              >
                <Typography
                  sx={{ display: "flex", gap: 0.5, fontWeight: "bold" }}
                >
                  Age {renderSortIcon("age")}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography
                  sx={{ display: "flex", gap: 0.5, fontWeight: "bold" }}
                >
                  Zip Code
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{ display: "flex", gap: 0.5, fontWeight: "bold" }}
                >
                  Image
                </Typography>
              </TableCell>
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
                      width: "48px",
                      height: "48px",
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
