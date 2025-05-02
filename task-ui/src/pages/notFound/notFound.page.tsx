import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Routes } from "@/models";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      sx={{ bgcolor: "#f5f5f5", px: 2 }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: "#d32f2f", mb: 2 }} />
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        404 - Página no encontrada
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Lo sentimos, no pudimos encontrar la página que buscas.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate(Routes.TASK)}>
        Ir al inicio
      </Button>
    </Box>
  );
};
