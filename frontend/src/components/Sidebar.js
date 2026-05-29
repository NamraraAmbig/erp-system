import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon     from '@mui/icons-material/Dashboard';
import InventoryIcon     from '@mui/icons-material/Inventory';
import PeopleIcon        from '@mui/icons-material/People';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon  from '@mui/icons-material/ShoppingCart';
import ReceiptIcon       from '@mui/icons-material/Receipt';
import AssignmentIcon    from '@mui/icons-material/Assignment';
import DescriptionIcon   from '@mui/icons-material/Description';

const menu = [
  { text: 'Dashboard',        icon: <DashboardIcon />,     path: '/' },
  { text: 'Products',         icon: <InventoryIcon />,     path: '/products' },
  { text: 'Customers',        icon: <PeopleIcon />,        path: '/customers' },
  { text: 'Suppliers',        icon: <LocalShippingIcon />, path: '/suppliers' },
  { text: 'Sales Orders',     icon: <ShoppingCartIcon />,  path: '/sales-orders' },
  { text: 'Purchase Orders',  icon: <AssignmentIcon />,    path: '/purchase-orders' },
  { text: 'GRN',              icon: <ReceiptIcon />,       path: '/grn' },
  { text: 'Invoices',         icon: <DescriptionIcon />,   path: '/invoices' },
];

function Sidebar({ open }) {
  const navigate = useNavigate();
  return (
    <Drawer variant="persistent" open={open} sx={{
      width: 240,
      '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', backgroundColor: '#1e1e2d', color: 'white' },
    }}>
      <Toolbar>
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>ERP System</span>
      </Toolbar>
      <List>
        {menu.map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.path)}
            sx={{ color: 'white', '&:hover': { backgroundColor: '#2d2d3f' } }}>
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;