import React, { useState } from 'react';
import './AddSupplier.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { FaUser, FaAddressCard, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'; // Import the icons you want to use

const AddSupplier = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/branch1/mala/addSupplier', {
                name,
                address,
                phone_number: phoneNumber,
                email
            });
            alert(response.data.message);
            // Reset form
            setName('');
            setAddress('');
            setPhoneNumber('');
            setEmail('');

            // Navigate to the Supplier List page
            navigate('/Component/Branch1/SupplierList/SupplierList');
        } catch (error) {
            console.error('There was an error adding the supplier!', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div id="add-supplier-container" className="centered-container">
            <form id="add-supplier-form" onSubmit={handleSubmit} className="supplier-form">
                <h2 id="add-supplier-heading" className="form-heading">Add Supplier</h2>
                <div className="two-field-row">
                    <div className="form-group">
                        <label htmlFor="supplier-name" className="form-label">Name:</label>
                        <div className="input-container">
                            <FaUser className="input-icon" />
                            <input 
                                id="supplier-name"
                                className="form-input"
                                type="text" 
                                placeholder='Enter Name'
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="supplier-phone-number" className="form-label">Phone Number:</label>
                        <div className="input-container">
                            <FaPhoneAlt className="input-icon" />
                            <input 
                                id="supplier-phone-number"
                                className="form-input"
                                placeholder='Enter Phone Number'
                                type="text" 
                                value={phoneNumber} 
                                onChange={(e) => setPhoneNumber(e.target.value)} 
                            />
                        </div>
                    </div>
                </div>
                <div className="two-field-row">
                    <div className="form-group">
                        <label htmlFor="supplier-address" className="form-label">Address:</label>
                        <div className="input-container">
                            <FaAddressCard className="input-icon" />
                            <input 
                                id="supplier-address"
                                className="form-input"
                                placeholder='Enter Address'
                                type="text" 
                                value={address} 
                                onChange={(e) => setAddress(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="supplier-email" className="form-label">Email:</label>
                        <div className="input-container">
                            <FaEnvelope className="input-icon" />
                            <input 
                                id="supplier-email"
                                className="form-input"
                                placeholder='Enter Email'
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>
                </div>
                <button id="submit-button" className="submit-button" type="submit">Add Supplier</button>
            </form>
        </div>
    );
};

export default AddSupplier;
