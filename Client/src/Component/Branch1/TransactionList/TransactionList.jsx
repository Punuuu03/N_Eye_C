import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TransactionList.css';

const TransactionList = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('All');
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [salesPerPage] = useState(7);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('http://localhost:3000/hamara/transaction');
        setSales(response.data);
        setFilteredSales(response.data);
      } catch (error) {xa
        setError('Error fetching sales.');
        console.error('Error fetching sales:', error);
      }
    };

    fetchSales();
  }, []);

  useEffect(() => {
    const filtered = sales.filter(sale => {
      const matchesSearchTerm = sale.customer_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPaymentMode = selectedPaymentMode === 'All' || sale.payment_method === selectedPaymentMode;
      return matchesSearchTerm && matchesPaymentMode;
    });
    setFilteredSales(filtered);
  }, [searchTerm, selectedPaymentMode, sales]);

  // Pagination logic
  const indexOfLastSale = currentPage * salesPerPage;
  const indexOfFirstSale = indexOfLastSale - salesPerPage;
  const currentSales = filteredSales.slice(indexOfFirstSale, indexOfLastSale);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredSales.length / salesPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= pageNumbers.length) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div id="transaction-list-container" className="transaction-list-container">
      <div id="heading-filters-container" className="heading-filters-container">
        <h1 id="transaction-list-heading" className="transaction-list-heading">Transaction List</h1>
        <div id="filters-container" className="filters-container">
          <input 
            id="search-input" 
            className="search-input"
            type="text" 
            placeholder="Search by customer name" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <select 
            id="payment-mode-select"
            className="payment-mode-select"
            value={selectedPaymentMode} 
            onChange={(e) => setSelectedPaymentMode(e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            <option value="All">All</option>
            <option value="UPI">UPI</option>
            <option value="Cash">Cash</option>
          </select>
        </div>
      </div>

      {error && <p id="transaction-list-error" className="transaction-list-error">{error}</p>}

      <table id="transaction-list-table" className="transaction-list-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Sale ID</th>
            <th>Product Names</th>
            <th>Date</th>
            <th>Payment Mode</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(currentSales) && currentSales.map((sale) => (
            <tr key={sale.sale_id} id={`sale-${sale.sale_id}`} className="transaction-list-row">
              <td>{sale.customer_name}</td>
              <td>{sale.sale_id}</td>
              <td>{sale.product_names}</td>
              <td>{new Date(sale.created_at).toLocaleDateString()}</td>
              <td>{sale.payment_method}</td>
              <td>{sale.paid}</td> {/* Ensure amount is handled */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="footer-container">
        <div className="pagination">
          <ul>
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
            </li>
            {pageNumbers.map(number => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={currentPage === number ? 'active' : ''}
                >
                  {number}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === pageNumbers.length}
              >
                &gt;
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
