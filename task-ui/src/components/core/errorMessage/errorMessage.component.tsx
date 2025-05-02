import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Button, Typography } from "@mui/material";
import styles from "./styles.module.css";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message = "Algo salió mal.", onRetry }: ErrorMessageProps) => {
  return (
    <Box className={styles.errorContainer}>
      <ErrorOutlineIcon color="error" sx={{ fontSize: 48, marginBottom: 2 }} />
      <Typography variant="h6" gutterBottom color="error">
        ¡Ups! Ocurrió un error
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        {message}
      </Typography>
      {onRetry && (
        <Button variant="outlined" color="error" onClick={onRetry}>
          Reintentar
        </Button>
      )}
    </Box>
  );
};
