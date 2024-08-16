import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditCustomer.css';
import {
    FaUser,
    FaPhoneAlt,
    FaMailBulk,
    FaAddressBook,
    FaCalendar,
    FaPersonBooth,
    FaEye,
    FaAngleDown,
  FaAngleUp
} from 'react-icons/fa';

const EditCustomer = () => {
    const { customer_id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [leftEyeDV, setLeftEyeDV] = useState({
        spherical: '',
        cylindrical: '',
        axis: '',
        vn: '',
    });
    const [leftEyeNV, setLeftEyeNV] = useState({
        spherical: '',
        cylindrical: '',
        axis: '',
        vn: '',
    });
    const [rightEyeDV, setRightEyeDV] = useState({
        spherical: '',
        cylindrical: '',
        axis: '',
        vn: '',
    });
    const [rightEyeNV, setRightEyeNV] = useState({
        spherical: '',
        cylindrical: '',
        axis: '',
        vn: '',
    });
    const [leftEyeAddition, setLeftEyeAddition] = useState('');
    const [rightEyeAddition, setRightEyeAddition] = useState('');
    const [message, setMessage] = useState('');
    const [showEyeData, setShowEyeData] = useState(false);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/branch1/customers/${customer_id}`);
                if (response.data.Status) {
                    const customer = response.data.Result;
                    setName(customer.name);
                    setPhone(customer.phone);
                    setEmail(customer.email);
                    setAddress(customer.address);
                    setDateOfBirth(customer.date_of_birth.split('T')[0]);
                    setGender(customer.gender || '');
                    setLeftEyeDV({
                        spherical: customer.left_eye_dv_spherical || '',
                        cylindrical: customer.left_eye_dv_cylindrical || '',
                        axis: customer.left_eye_dv_axis || '',
                        vn: customer.left_eye_dv_vn || '',
                    });
                    setLeftEyeNV({
                        spherical: customer.left_eye_nv_spherical || '',
                        cylindrical: customer.left_eye_nv_cylindrical || '',
                        axis: customer.left_eye_nv_axis || '',
                        vn: customer.left_eye_nv_vn || '',
                    });
                    setRightEyeDV({
                        spherical: customer.right_eye_dv_spherical || '',
                        cylindrical: customer.right_eye_dv_cylindrical || '',
                        axis: customer.right_eye_dv_axis || '',
                        vn: customer.right_eye_dv_vn || '',
                    });
                    setRightEyeNV({
                        spherical: customer.right_eye_nv_spherical || '',
                        cylindrical: customer.right_eye_nv_cylindrical || '',
                        axis: customer.right_eye_nv_axis || '',
                        vn: customer.right_eye_nv_vn || '',
                    });
                    setLeftEyeAddition(customer.left_eye_addition || '');
                    setRightEyeAddition(customer.right_eye_addition || '');
                } else {
                    setMessage(`Error: ${response.data.Error}`);
                }
            } catch (error) {
                console.error('Error fetching customer:', error);
                setMessage('Error fetching customer. Please try again.');
            }
        };

        fetchCustomer();
    }, [customer_id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedCustomer = {
            name,
            phone,
            email,
            address,
            date_of_birth: `${dateOfBirth}T00:00:00.000Z`,
            gender,
            left_eye_dv_spherical: leftEyeDV.spherical,
            left_eye_dv_cylindrical: leftEyeDV.cylindrical,
            left_eye_dv_axis: leftEyeDV.axis,
            left_eye_dv_vn: leftEyeDV.vn,
            left_eye_nv_spherical: leftEyeNV.spherical,
            left_eye_nv_cylindrical: leftEyeNV.cylindrical,
            left_eye_nv_axis: leftEyeNV.axis,
            left_eye_nv_vn: leftEyeNV.vn,
            right_eye_dv_spherical: rightEyeDV.spherical,
            right_eye_dv_cylindrical: rightEyeDV.cylindrical,
            right_eye_dv_axis: rightEyeDV.axis,
            right_eye_dv_vn: rightEyeDV.vn,
            right_eye_nv_spherical: rightEyeNV.spherical,
            right_eye_nv_cylindrical: rightEyeNV.cylindrical,
            right_eye_nv_axis: rightEyeNV.axis,
            right_eye_nv_vn: rightEyeNV.vn,
            left_eye_addition: leftEyeAddition,
            right_eye_addition: rightEyeAddition,
        };

        try {
            const response = await axios.put(`http://localhost:3000/branch1/customers/${customer_id}`, updatedCustomer);
            if (response.data.Status) {
                setMessage('Customer updated successfully!');
                setTimeout(() => {
                    navigate('/Component/Branch1/CustomerList/CustomerList');
                }, 1000);
            } else {
                setMessage(`Error: ${response.data.Error}`);
            }
        } catch (error) {
            console.error('Error updating customer:', error);
            setMessage('Error updating customer. Please try again.');
        }
    };

    return (
        <div className='customer-form-overlay'>
            <div className="customer-form-container">
                <h2 className='customer-form-heading'>
                    <FaUser /> Edit Customer
                </h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="customer-form-row">
                        <div className="customer-form-group">
                            <label htmlFor="customer-name-input"><FaUser /> Name</label>
                            <input
                                type="text"
                                id="customer-name-input"
                                className="customer-input-field"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="customer-form-group">
                            <label htmlFor="customer-phone-input"><FaPhoneAlt /> Phone</label>
                            <input
                                type="text"
                                id="customer-phone-input"
                                className="customer-input-field"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="customer-form-row">
                        <div className="customer-form-group">
                            <label htmlFor="customer-email-input"><FaMailBulk /> Email</label>
                            <input
                                type="email"
                                id="customer-email-input"
                                className="customer-input-field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="customer-form-group">
                            <label htmlFor="customer-address-input"><FaAddressBook /> Address</label>
                            <textarea
                                type="text"
                                id="customer-address-input"
                                className="customer-input-textarea"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            ></textarea>
                        </div>
                    </div>
                    <div className="customer-form-row">
                        <div className="customer-form-group">
                            <label htmlFor="customer-dob-input"><FaCalendar /> Date of Birth</label>
                            <input
                                type="date"
                                id="customer-dob-input"
                                className="customer-input-field"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                required
                            />
                        </div>
                        <div className="customer-form-group">
                            <label htmlFor="customer-gender-input"><FaPersonBooth /> Gender</label>
                            <select
                                id="customer-gender-input"
                                className="customer-input-field"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="toggle-button-container">
            <button
              type="button"
              className="customer-form-toggle-button"
              onClick={() => setShowEyeData(!showEyeData)}
            >
              {showEyeData ? <FaAngleUp /> : <FaAngleDown />} Eye Data
            </button>
          </div>
                    {showEyeData && (
                        <>
                            <label htmlFor="left-eye-dv-spherical-input" className="left-label">
                                <b><FaEye /> Left Eye(DV)</b>
                            </label>
                            <div className="customer-form-row">
                                <div className="customer-form-group">
                                    <label htmlFor="left-eye-dv-spherical-input">Spherical</label>
                                    <input
                                        type="text"
                                        id="left-eye-dv-spherical-input"
                                        className="customer-input-field"
                                        value={leftEyeDV.spherical}
                                        onChange={(e) => setLeftEyeDV({ ...leftEyeDV, spherical: e.target.value })}
                                    />
                                </div>
                                <div className="customer-form-group">
                                    <label htmlFor="left-eye-dv-cylindrical-input">Cylindrical</label>
                                    <input
                                        type="text"
                                        id="left-eye-dv-cylindrical-input"
                                        className="customer-input-field"
                                        value={leftEyeDV.cylindrical}
                                        onChange={(e) => setLeftEyeDV({ ...leftEyeDV, cylindrical: e.target.value })}
                                    />
                                </div>
                                <div className="customer-form-group">
                                    <label htmlFor="left-eye-dv-axis-input">Axis</label>
                                    <input
                                        type="text"
                                        id="left-eye-dv-axis-input"
                                        className="customer-input-field"
                                        value={leftEyeDV.axis}
                                        onChange={(e) => setLeftEyeDV({ ...leftEyeDV, axis: e.target.value })}
                                    />
                                </div>
                                <div className="customer-form-group">
                                    <label htmlFor="left-eye-dv-vn-input">V.N.</label>
                                    <input
                                        type="text"
                                        id="left-eye-dv-vn-input"
                                        className="customer-input-field"
                                        value={leftEyeDV.vn}
                                        onChange={(e) => setLeftEyeDV({ ...leftEyeDV, vn: e.target.value })}
                                    />
                                </div>
                            </div>

                            <label htmlFor="left-eye-nv-spherical-input" className="left-label">
                                <b><FaEye /> Left Eye(NV)</b>
                            </label>
                            <div className="customer-form-row">
                                <div className="customer-form-group">
                                    <label htmlFor="left-eye-nv-spherical-input">Spherical</label>
                                    <input
                                        type="text"
                                        id="left-eye-nv-spherical-input"
                                        className="customer-input-field"
                                        value={leftEyeNV.spherical}
                                        onChange={(e) => setLeftEyeNV({ ...leftEyeNV, spherical: e.target.value })}
                                    />
                                </div>
                                <div className="customer-form-group">
                                    <label htmlFor="left-eye-nv-cylindrical-input">Cylindrical</label>
                                    <input
                                        type="text"
                                        id="left-eye-nv-cylindrical-input"
                                        className="customer-input-field"
                                        value={leftEyeNV.cylindrical}
                                        onChange={(e) => setLeftEyeNV({ ...leftEyeNV, cylindrical: e.target.value })}
                                    />
                                </div>
                                <div className="customer-form-group">
                                    <label htmlFor="left-eye-nv-axis-input">Axis</label>
                                    <input
                                        type="text"
                                        id="left-eye-nv-axis-input"
                                        className="customer-input-field"
                                        value={leftEyeNV.axis}
                                        onChange={(e) => setLeftEyeNV({ ...leftEyeNV, axis: e.target.value })}
                                    />
                                </div>
                                <div className="customer-form-group">
                                    <label htmlFor="left-eye-nv-vn-input">V.N.</label>
                                    <input
                                        type="text"
                                        id="left-eye-nv-vn-input"
                                        className="customer-input-field"
                                        value={leftEyeNV.vn}
                                        onChange={(e) => setLeftEyeNV({ ...leftEyeNV, vn: e.target.value })}
                                    />
                                </div>
                            </div>

                            <label htmlFor="right-eye-dv-spherical-input" className="right-label">
                                <b><FaEye /> Right Eye(DV)</b>
                            </label>
                            <div className="customer-form-row">
                                <div className="customer-form-group">
                                    <label htmlFor="right-eye-dv-spherical-input">Spherical</label>
                                    <input
                                        type="text"
                                        id="right-eye-dv-spherical-input"
                                        className="customer-input-field"
                                        value={rightEyeDV.spherical}
                                        onChange={(e) => setRightEyeDV({ ...rightEyeDV, spherical: e.target.value })}
                                    />
                                </div>
                                <div className="customer-form-group">
                                    <label htmlFor="right-eye-dv-cylindrical-input">Cylindrical</label>
                                    <input
                                        type="text"
                                        id="right-eye-dv-cylindrical-input"
                                        className="customer-input-field"
                                        value={rightEyeDV.cylindrical}
                                        onChange={(e) => setRightEyeDV({ ...rightEyeDV, cylindrical: e.target.value })}
                                    />
                                </div>
                                <div className="customer-form-group">
                                    <label htmlFor="right-eye-dv-axis-input">Axis</label>
                                    <input
                                        type="text"
                                        id="right-eye-dv-axis-input"
                                        className="customer-input-field"
                                        value={rightEyeDV.axis}
                                        onChange={(e) => setRightEyeDV({ ...rightEyeDV, axis: e.target.value })}
                                    />
                                </div>
                                <div className="customer-form-group">
                                    <label htmlFor="right-eye-dv-vn-input">V.N.</label>
                                    <input
                                        type="text"
                                        id="right-eye-dv-vn-input"
                                        className="customer-input-field"
                                        value={rightEyeDV.vn}
                                        onChange={(e) => setRightEyeDV({ ...rightEyeDV, vn: e.target.value })}
                                    />
                                </div>
                            </div>

                            <label htmlFor="right-eye-nv-spherical-input" className="right-label">
                                <b><FaEye /> Right Eye(NV)</b>
                            </label>
                            <div className="customer-form-row">
                                <div className="customer-form-group">
                                    <label htmlFor="right-eye-nv-spherical-input">Spherical</label>
                                    <input
                                        type="text"
                                        id="right-eye-nv-spherical-input"
                                        className="customer-input-field"
                                        value={rightEyeNV.spherical}
                                        onChange={(e) => setRightEyeNV({ ...rightEyeNV, spherical: e.target.value })}
                                    />
                                </div>
                                <div className="customer-form-group">
                                    <label htmlFor="right-eye-nv-cylindrical-input">Cylindrical</label>
                                    <input
                                        type="text"
                                        id="right-eye-nv-cylindrical-input"
                                        className="customer-input-field"
                                        value={rightEyeNV.cylindrical}
                                        onChange={(e) => setRightEyeNV({ ...rightEyeNV, cylindrical: e.target.value })}
                                    />
                                </div>
                                <div className="customer-form-group">
                                    <label htmlFor="right-eye-nv-axis-input">Axis</label>
                                    <input
                                        type="text"
                                        id="right-eye-nv-axis-input"
                                        className="customer-input-field"
                                        value={rightEyeNV.axis}
                                        onChange={(e) => setRightEyeNV({ ...rightEyeNV, axis: e.target.value })}
                                    />
                                </div>
                                <div className="customer-form-group">
                                    <label htmlFor="right-eye-nv-vn-input">V.N.</label>
                                    <input
                                        type="text"
                                        id="right-eye-nv-vn-input"
                                        className="customer-input-field"
                                        value={rightEyeNV.vn}
                                        onChange={(e) => setRightEyeNV({ ...rightEyeNV, vn: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="customer-form-row">
                                <div className="customer-form-group">
                                    <label htmlFor="left-eye-addition-input">Left Eye Addition</label>
                                    <input
                                        type="text"
                                        id="left-eye-addition-input"
                                        className="customer-input-field"
                                        value={leftEyeAddition}
                                        onChange={(e) => setLeftEyeAddition(e.target.value)}
                                    />
                                </div>
                                <div className="customer-form-group">
                                    <label htmlFor="right-eye-addition-input">Right Eye Addition</label>
                                    <input
                                        type="text"
                                        id="right-eye-addition-input"
                                        className="customer-input-field"
                                        value={rightEyeAddition}
                                        onChange={(e) => setRightEyeAddition(e.target.value)}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    <div className="customer-form-footer">
                        <button type="submit" className="customer-submit-button">Save</button>
                    </div>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default EditCustomer;
