import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Box } from '@mui/material';

function Layout() {
  const [open, setOpen] = useState(true);
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={open} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Topbar toggleSidebar={() => setOpen(!open)} />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;