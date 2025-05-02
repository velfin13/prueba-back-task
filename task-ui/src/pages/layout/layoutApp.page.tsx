import { ProtectedRoute, SearchAppBar } from '@/components';
import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';


export const Layout: React.FC = () => {
    return (
        <ProtectedRoute>
            <div style={{ width: '100%', height: '100vh' }}>
                <SearchAppBar />

                <Box sx={{ display: 'flex' }}>
                    <Outlet />
                </Box>
            </div>
        </ProtectedRoute>
    );
};

export default Layout;
