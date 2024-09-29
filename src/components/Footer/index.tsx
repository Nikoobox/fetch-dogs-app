import { Box, Link, Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box
      width="100%"
      py={4}
      sx={{
        borderTop: "1px solid #EEEEEE",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="body2">
          <Link
            href="https://www.linkedin.com/in/nikolay-shatalov/"
            target="_blank"
            rel="noopener"
            sx={{ marginRight: 4 }}
          >
            LinkedIn
          </Link>

          <Link
            href="https://nikolayshatalov.com/"
            target="_blank"
            rel="noopener"
            sx={{ marginRight: 4 }}
          >
            Portfolio
          </Link>
          <Link
            href="https://github.com/Nikoobox/fetch-dogs-app"
            target="_blank"
            rel="noopener"
          >
            Github Repo
          </Link>
        </Typography>

        <Typography variant="body2">Built by Nikolay Shatalov</Typography>
      </Container>
    </Box>
  );
};

export default Footer;
