import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Component/Login/Login';
import Dashboard1 from './Component/Branch1/Dashboard/Dashboard';
import Dashboard2 from './Component/Branch2/Dashboard/Dashboard';
import Dashboard3 from './Component/Branch3/Dashboard/Dashboard';
import Dashboard4 from './Component/Branch4/Dashboard/Dashboard';
import Dashboard5 from './Component/Branch5/Dashboard/Dashboard';
import Dashboard6 from './Component/Branch6/Dashboard/Dashboard';
import Layout1 from './Component/Branch1/Layout1/Layout1';
import ProductList1 from './Component/Branch1/ProductList/ProductList';
import AddProduct1 from './Component/Branch1/AddProduct/AddProduct';
import EditProduct1 from './Component/Branch1/EditProduct/EditProduct';
import CustomerList1 from './Component/Branch1/CustomerList/CustomerList';
import AddCustomer1 from './Component/Branch1/AddCustomer/AddCustomer';
import EditCustomer1 from './Component/Branch1/EditCustomer/EditCustomer';
import SaleList1 from './Component/Branch1/SaleList/SaleList';
import AddSale1 from './Component/Branch1/AddSale/AddSale';

import SupplierList1 from './Component/Branch1/SupplierList/SupplierList';
import AddSupplier1 from './Component/Branch1/AddSupplier/AddSupplier';
import PurchaseList1 from './Component/Branch1/PurchaseList/PurchaseList';
import AddPurchase1 from './Component/Branch1/AddPurchase/AddPurchase';
import TransactionList1 from './Component/Branch1/TransactionList/TransactionList';
import BarcodeScanner1 from './Component/Branch1/BarcodeScanner/BarcodeScanner';
// import BarcodeAddSale1 from './Component/Branch1/BarcodeAddSale/BarcodeAddSale';
// import BillPrint from './Component/Branch1/BillPrint/BillPrint';
// import SingleRow1 from './Component/Branch1/SingleRow/SingleRow';
import SaleDetails1 from './Component/Branch1/SaleDetails/SaleDetails';
import PurchaseDetails1 from './Component/Branch1/PurchaseDetails/PurchaseDetails';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/Component/Branch1/Dashboard/Dashboard',
    element: <Layout1><Dashboard1 /></Layout1>
  },
  {
    path: '/Component/Branch1/ProductList/ProductList',
    element: <Layout1><ProductList1 /></Layout1>
  },
  {
    path: '/Component/Branch1/AddProduct/AddProduct',
    element: <Layout1><AddProduct1 /></Layout1>
  },
  {
    path: '/Component/Branch1/EditProduct/EditProduct/:id',
    element: <Layout1><EditProduct1 /></Layout1>
  },
  {
    path: '/Component/Branch1/CustomerList/CustomerList',  // Corrected path
    element: <Layout1><CustomerList1 /></Layout1>
  },
  {
    path: '/Component/Branch1/AddCustomer/AddCustomer',
    element: <Layout1><AddCustomer1 /></Layout1>
  },
  {
    path: '/Component/Branch1/EditCustomer/EditCustomer/:customer_id',
    element: <Layout1><EditCustomer1 /></Layout1>
  },
  {
    path: '/Component/Branch1/SaleList/SaleList',  // Corrected path
    element: <Layout1><SaleList1 /></Layout1>
  },
  {
    path: '/Component/Branch1/AddSale/AddSale',
    element: <Layout1><AddSale1 /></Layout1>
  },
  
  {
    path: '/Component/Branch1/SupplierList/SupplierList',  // Corrected path
    element: <Layout1><SupplierList1 /></Layout1>
  },
  {
    path: '/Component/Branch1/AddSupplier/AddSupplier',
    element: <Layout1><AddSupplier1 /></Layout1>
  },
  {
    path: '/Component/Branch1/PurchaseList/PurchaseList',
    element: <Layout1><PurchaseList1 /></Layout1>
  },
  {
    path: '/Component/Branch1/AddPurchase/AddPurchase',
    element: <Layout1><AddPurchase1 /></Layout1>
  },
  {
    path: '/Component/Branch1/TransactionList/TransactionList',
    element: <Layout1><TransactionList1 /></Layout1>
  },
  {
    path: '/Component/Branch1/BarcodeScanner/BarcodeScanner',
    element: <Layout1><BarcodeScanner1 /></Layout1>
  },

  {
    path: '/Component/Branch1/SaleDetails/SaleDetails/:id',
    element: <SaleDetails1 />
  },
  {
    path: '/Component/Branch1/PurchaseDetails/PurchaseDetails/:id',
    element: <PurchaseDetails1 />
  },
  
  // {
  //   path: '/Component/Branch1/BarcodeAddSale/BarcodeAddSale',
  //   element: <Layout1><BarcodeAddSale1 /></Layout1>
  // },
  
  {
    path: '/Component/Branch2/Dashboard/Dashboard',
    element: <Dashboard2 />
  },
  {
    path: '/Component/Branch3/Dashboard/Dashboard',
    element: <Dashboard3 />
  },
  {
    path: '/Component/Branch4/Dashboard/Dashboard',
    element: <Dashboard4 />
  },
  {
    path: '/Component/Branch5/Dashboard/Dashboard',
    element: <Dashboard5 />
  },
  {
    path: '/Component/Branch6/Dashboard/Dashboard',
    element: <Dashboard6 />
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
