import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa'; // Import the edit icon
import './ProductList.css'; // Ensure you have appropriate styles for the product list

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(7);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/products')
            .then(result => {
                if (result.data.Status) {
                    setProducts(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.error('Error fetching products:', err));
    }, []);

    const handleEdit = (id) => {
        navigate(`/Component/Branch1/EditProduct/EditProduct/${id}`);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filterProducts = (products, query) => {
        const normalizedQuery = query.toLowerCase();
        if (normalizedQuery.trim() === '') return products;

        return products.filter(product =>
            product.name.toLowerCase().includes(normalizedQuery)
        );
    };

    const filteredProducts = filterProducts(products, searchQuery);

    // Get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div id='productbody'>
            <div className="product-container">
                
                <Link to="/Component/Branch1/AddProduct/AddProduct" className="add-product-link">Add Product</Link>
                
                <h3 id='Product-heading-j1'>Product List</h3>

                {/* Search Bar */}
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by product name"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="search-input"
                    />
                </div>
                
                <div>
                    <table id="product-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Product ID</th>
                                {/* Removed Left Eye and Right Eye columns */}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td><img src={`http://localhost:3000${product.image}`} className="product-image" alt={product.name} /></td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.product_id}</td>
                                    {/* Removed Left Eye and Right Eye cells */}
                                    <td>
                                        <FaEdit
                                            className="action-icon edit-icon"
                                            onClick={() => handleEdit(product.id)}
                                        />
                                    </td>
                                </tr>
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
        </div>
    );
};

export default ProductList;
