import { useEffect, useState, FC, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Container, TextField, Typography } from "@mui/material";
// import { useTheme } from "@mui/material/styles";

import { onAutenticateUser } from "../../features/auth";
import { useAppDispatch, useAppSelector } from "../../hooks";

export interface LoginFormData {
  userName: string;
  userEmail: string;
}

const Login: FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    userName: "",
    userEmail: "",
  });
  const navigate = useNavigate();
  //   const theme = useTheme();
  const dispatch = useAppDispatch();
  const { isAuthenticated, error } = useAppSelector((state) => state.auth);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(onAutenticateUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/search");
    }
  }, [isAuthenticated]);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography variant="h4" gutterBottom>
          User Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="userName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.userName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="userEmail"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.userEmail}
            onChange={handleChange}
            required
          />
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disableElevation
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
