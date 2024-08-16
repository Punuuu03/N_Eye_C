import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './SaleList.css';

const SaleList = () => {
  const [sales, setSales] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [salesPerPage] = useState(7);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedId) {
      fetchSaleById(selectedId);
    } else {
      fetchSales();
    }
  }, [selectedId]);

  const fetchSales = async () => {
    try {
      const response = await axios.get('http://localhost:3000/shala/sales');
      console.log(response.data); // Debug: check the fetched data
      setSales(response.data);
    } catch (error) {
      console.error('Error fetching sales:', error.response ? error.response.data : error.message);
    }
  };

  const fetchSaleById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/shala/sales/${id}`);
      console.log(response.data); // Debug: check the fetched data for specific ID
      setSales([response.data]); // Assuming you only fetch one sale, wrap it in an array
    } catch (error) {
      console.error('Error fetching sale by ID:', error.response ? error.response.data : error.message);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filterSales = (sales, query) => {
    const normalizedQuery = query.toLowerCase();
    if (normalizedQuery.trim() === '') return sales;

    return sales.filter(sale =>
      sale.customer_name.toLowerCase().includes(normalizedQuery)
    );
  };

  const filteredSales = filterSales(sales, searchQuery);

  const indexOfLastSale = currentPage * salesPerPage;
  const indexOfFirstSale = indexOfLastSale - salesPerPage;
  const currentSales = filteredSales.slice(indexOfFirstSale, indexOfLastSale);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredSales.length / salesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrintBillClick = (saleId) => {
    setSelectedId(saleId);
    navigate(`/Component/Branch1/SaleDetails/SaleDetails/${saleId}`);
  };

  return (
    <div className="sale-container">
      <Link to="/Component/Branch1/AddSale/AddSale" className="add-sale-link">New Sale</Link>
      
      <div className="heading-search-container">
        <h1 className="sale-heading">Sale List</h1>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by customer name"
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>

      <table className="sale-table">
        <thead className="sale-table-head">
          <tr>
            <th className="sale-table-th">Sale Date</th>
            <th className="sale-table-th">Customer Name</th>
            <th className="sale-table-th">Customer Phone Number</th>
            <th className="sale-table-th">Sale ID</th>
            <th className="sale-table-th sale-table-th-product-names">Product Names</th>
            <th className="sale-table-th">Discount</th>
            <th className="sale-table-th">Amount Paid</th>
            <th className="sale-table-th">Payment Mode</th>
            <th className="sale-table-th">Action</th>
          </tr>
        </thead>
        <tbody className="sale-table-body">
          {currentSales.map((sale, index) => (
            <tr className="sale-table-tr" key={sale.sale_id}>
              <td className="sale-table-td">{new Date(sale.created_at).toLocaleDateString('en-GB')}</td>
              <td className="sale-table-td">{sale.customer_name}</td>
              <td className="sale-table-td">{sale.customer_phone}</td>
              <td className="sale-table-td">{sale.sale_id}</td>
              <td className="sale-table-td sale-table-td-product-names">{sale.product_names}</td>
              <td className="sale-table-td">{sale.order_discount}</td>
              <td className="sale-table-td">{sale.paid}</td>
              <td className="sale-table-td">{sale.payment_method}</td>
              <td className="sale-table-td" id={`sale-table-td-action-${sale.sale_id}`}>
                <button className='bl' onClick={() => handlePrintBillClick(sale.sale_id)}>
                  Print Bill
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="footer-container">
        <div className="pagination">
          <ul className="pagination-list">
            <li className="pagination-item">
              <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
            </li>
            {pageNumbers.map(number => (
              <li className="pagination-item" key={number}>
                <button
                  className={`pagination-button ${currentPage === number ? 'active' : ''}`}
                  onClick={() => handlePageChange(number)}
                >
                  {number}
                </button>
              </li>
            ))}
            <li className="pagination-item">
              <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage + 1)}
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

export default SaleList;
