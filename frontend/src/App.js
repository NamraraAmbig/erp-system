import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login          from './pages/Auth/Login';
import Register       from './pages/Auth/Register';
import Dashboard      from './pages/Dashboard/Dashboard';
import Products       from './pages/Products/Products';
import Customers      from './pages/Customers/Customers';
import Suppliers      from './pages/Suppliers/Suppliers';
import SalesOrders    from './pages/SalesOrders/SalesOrders';
import PurchaseOrders from './pages/PurchaseOrders/PurchaseOrders';
import GRN            from './pages/GRN/GRN';
import Invoices       from './pages/Invoices/Invoices';
import Layout         from './components/Layout';

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index                  element={<Dashboard />} />
          <Route path="products"        element={<Products />} />
          <Route path="customers"       element={<Customers />} />
          <Route path="suppliers"       element={<Suppliers />} />
          <Route path="sales-orders"    element={<SalesOrders />} />
          <Route path="purchase-orders" element={<PurchaseOrders />} />
          <Route path="grn"             element={<GRN />} />
          <Route path="invoices"        element={<Invoices />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;