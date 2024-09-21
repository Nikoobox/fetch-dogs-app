// import React from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../hooks"; // Adjust the path as necessary
import { onLogoutUser } from "../../features/auth"; // Adjust the path as necessary

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { userName } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(onLogoutUser());
  };

  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Fetch a 🐶
          </Typography>
          {userName && (
            <>
              <Typography variant="body1" style={{ marginRight: "20px" }}>
                {userName}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
                onClick={handleLogout}
                disableElevation
              >
                Log Out
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
