import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { removeAuth } from "@/redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Routes } from "@/models";

export const SearchAppBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: "Estas seguro de querer cerrar la session?",
            showCancelButton: true,
            confirmButtonText: "Si",
            confirmButtonColor: '#6bc44a',
            cancelButtonText: "cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeAuth());
                navigate(Routes.AUTH);
            }
        });
    };

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Gestor de Tareas
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Cerrar sesión
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
