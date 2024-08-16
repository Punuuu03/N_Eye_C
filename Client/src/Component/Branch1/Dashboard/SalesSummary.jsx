import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SalesSummary.css';

const SalesSummary = () => {
  const [summaryData, setSummaryData] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalStock: 0,
    totalDiscount: 0, // Changed from productsSold to totalDiscount
    newCustomers: 0,
  });

  useEffect(() => {
    // Fetch summary data from the server
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/summary');
        setSummaryData(response.data);
      } catch (error) {
        console.error('Error fetching sales summary:', error); // Log the error
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="sales-summary">
      <h2>Sales</h2>
      <div className="summary-card total-sales">
        <div className="icon">📊</div>
        <div className="details">
          <div className="number">{summaryData.totalSales}</div>
          <div className="label">Total Sales</div>
          {/* <div className="change">+8% from yesterday</div> */}
        </div>
      </div>
      <div className="summary-card total-orders">
        <div className="icon">🛒</div>
        <div className="details">
          <div className="number">{summaryData.totalOrders}</div>
          <div className="label">Total Orders</div>
          {/* <div className="change">+5% from yesterday</div> */}
        </div>
      </div>
      <div className="summary-card total-stock">
        <div className="icon">📈</div>
        <div className="details">
          <div className="number">{summaryData.totalStock}</div>
          <div className="label">Total Stock</div>
          {/* <div className="change">+8.2% from yesterday</div> */}
        </div>
      </div>
      <div className="summary-card total-discount">
        <div className="icon">💸</div> {/* Updated icon to better represent discounts */}
        <div className="details">
          <div className="number">{summaryData.totalDiscount}</div>
          <div className="label">Total Discount</div> {/* Updated label to reflect discount */}
          {/* <div className="change">+1.2% from yesterday</div> */}
        </div>
      </div>
      <div className="summary-card new-customers">
        <div className="icon">👤</div>
        <div className="details">
          <div className="number">{summaryData.newCustomers}</div>
          <div className="label">Total Customer</div>
          {/* <div className="change">+0.5% from yesterday</div> */}
        </div>
      </div>
    </div>
  );
};

export default SalesSummary;
