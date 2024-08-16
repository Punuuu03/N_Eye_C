import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons
import './CustomerList.css';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [customersPerPage] = useState(7);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCustomerId, setExpandedCustomerId] = useState(null);
    const [expandedEye, setExpandedEye] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/branch1/customers')
            .then(result => {
                if (result.data.Status) {
                    setCustomers(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.error('Error fetching customers:', err));
    }, []);

    const handleDelete = (customer_id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            axios.delete(`http://localhost:3000/branch1/customers/${customer_id}`)
                .then(result => {
                    if (result.data.Status) {
                        setCustomers(prevCustomers => prevCustomers.filter(customer => customer.customer_id !== customer_id));
                    } else {
                        alert(result.data.Error);
                    }
                })
                .catch(err => console.error('Error deleting customer:', err));
        }
    };

    const handleEdit = (customer_id) => {
        navigate(`/Component/Branch1/EditCustomer/EditCustomer/${customer_id}`);
    };

    const handleDotsClick = (customer_id, eye) => {
        if (expandedCustomerId === customer_id) {
            if (expandedEye === eye) {
                setExpandedCustomerId(null);
                setExpandedEye(null);
            } else {
                setExpandedEye(eye);
            }
        } else {
            setExpandedCustomerId(customer_id);
            setExpandedEye(eye);
        }
    };

    const handleOutsideClick = (event) => {
        if (!event.target.closest('.dots-icon') && !event.target.closest('.eye-details-table')) {
            setExpandedCustomerId(null);
            setExpandedEye(null);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const filterCustomers = (customers, query) => {
        const normalizedQuery = query.toLowerCase();
        if (normalizedQuery.trim() === '') return customers;

        const queryParts = normalizedQuery.split(' ');

        const filteredCustomers = customers.filter(customer => {
            const customerName = customer.name.toLowerCase();
            if (queryParts.length > 1) {
                return queryParts.every(part => customerName.includes(part));
            } else {
                return customerName.includes(queryParts[0]);
            }
        });

        return filteredCustomers;
    };

    const filteredCustomers = filterCustomers(customers, searchQuery);

    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredCustomers.length / customersPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="customer-container">
            <Link to="/Component/Branch1/AddCustomer/AddCustomer" className="add-customer-link">Add Customer</Link>

            <h3 id='hd'>Customer List</h3>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by customer name"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                />
            </div>

            <div>
                <table id="customer-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Date of Birth</th>
                            <th>Gender</th>
                            <th>Left Eye</th>
                            <th>Right Eye</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCustomers.map(customer => (
                            <React.Fragment key={customer.customer_id}>
                                <tr>
                                    <td>{customer.customer_id}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.address}</td>
                                    <td>{new Date(customer.date_of_birth).toLocaleDateString()}</td>
                                    <td>{customer.gender}</td>
                                    <td>
                                        <span
                                            className="dots-icon"
                                            onClick={() => handleDotsClick(customer.customer_id, 'left')}
                                        >
                                            &#8226;&#8226;&#8226;
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className="dots-icon"
                                            onClick={() => handleDotsClick(customer.customer_id, 'right')}
                                        >
                                            &#8226;&#8226;&#8226;
                                        </span>
                                    </td>
                                    <td>
                                        <FaEdit
                                            className="action-icon edit-icon"
                                            onClick={() => handleEdit(customer.customer_id)}
                                        />
                                        <FaTrash
                                            className="action-icon delete-icon"
                                            onClick={() => handleDelete(customer.customer_id)}
                                        />
                                    </td>
                                </tr>
                                {expandedCustomerId === customer.customer_id && expandedEye === 'left' && (
                                    <tr className="eye-details-row">
                                        <td colSpan="10">
                                            <table className="eye-details-table">
                                                <thead>
                                                    <tr>
                                                        <th>Eye</th>
                                                        <th>Spherical</th>
                                                        <th>Cylindrical</th>
                                                        <th>Axis</th>
                                                        <th>V/N</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Left Eye DV</td>
                                                        <td>{customer.left_eye_dv_spherical}</td>
                                                        <td>{customer.left_eye_dv_cylindrical}</td>
                                                        <td>{customer.left_eye_dv_axis}°</td>
                                                        <td>{customer.left_eye_dv_vn}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Left Eye NV</td>
                                                        <td>{customer.left_eye_nv_spherical}</td>
                                                        <td>{customer.left_eye_nv_cylindrical}</td>
                                                        <td>{customer.left_eye_nv_axis}°</td>
                                                        <td>{customer.left_eye_nv_vn}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Left Eye Addition</td>
                                                        <td colSpan="4" className="add">{customer.left_eye_addition}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                )}
                                {expandedCustomerId === customer.customer_id && expandedEye === 'right' && (
                                    <tr className="eye-details-row">
                                        <td colSpan="10">
                                            <table className="eye-details-table">
                                                <thead>
                                                    <tr>
                                                        <th>Eye</th>
                                                        <th>Spherical</th>
                                                        <th>Cylindrical</th>
                                                        <th>Axis</th>
                                                        <th>V/N</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Right Eye DV</td>
                                                        <td>{customer.right_eye_dv_spherical}</td>
                                                        <td>{customer.right_eye_dv_cylindrical}</td>
                                                        <td>{customer.right_eye_dv_axis}°</td>
                                                        <td>{customer.right_eye_dv_vn}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Right Eye NV</td>
                                                        <td>{customer.right_eye_nv_spherical}</td>
                                                        <td>{customer.right_eye_nv_cylindrical}</td>
                                                        <td>{customer.right_eye_nv_axis}°</td>
                                                        <td>{customer.right_eye_nv_vn}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Right Eye Addition</td>
                                                        <td colSpan="4" className="add">{customer.right_eye_addition}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
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

export default CustomerList;
