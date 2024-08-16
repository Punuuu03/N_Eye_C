import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './SaleDetails.css';
import kolo from '../../../assets/logo.jpg';

const SaleDetails = () => {
  const { id } = useParams();
  const [sale, setSale] = useState(null);
  const [customerEyeDetails, setCustomerEyeDetails] = useState({
    left_eye_addition: '',
    right_eye_addition: '',
  });
  const [customerDetails, setCustomerDetails] = useState({ name: '', phone: '' });

  useEffect(() => {
    const fetchSaleDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/wala/shala/sale-details/${id}`);
        console.log('API Response:', response.data);
        
        const saleData = response.data;

        if (typeof saleData.product_details === 'string') {
          saleData.products = JSON.parse(saleData.product_details);
        } else {
          saleData.products = saleData.product_details;
        }

        setSale(saleData);

        const customerResponse = await axios.get(`http://localhost:3000/shala/customers/${saleData.customer_id}`);
        setCustomerDetails({
          name: customerResponse.data.name,
          phone: customerResponse.data.phone,
        });

        setCustomerEyeDetails({
          left_eye_dv_spherical: customerResponse.data.left_eye_dv_spherical,
          left_eye_dv_cylindrical: customerResponse.data.left_eye_dv_cylindrical,
          left_eye_dv_axis: customerResponse.data.left_eye_dv_axis,
          left_eye_dv_vn: customerResponse.data.left_eye_dv_vn,
          left_eye_nv_spherical: customerResponse.data.left_eye_nv_spherical,
          left_eye_nv_cylindrical: customerResponse.data.left_eye_nv_cylindrical,
          left_eye_nv_axis: customerResponse.data.left_eye_nv_axis,
          left_eye_nv_vn: customerResponse.data.left_eye_nv_vn,
          right_eye_dv_spherical: customerResponse.data.right_eye_dv_spherical,
          right_eye_dv_cylindrical: customerResponse.data.right_eye_dv_cylindrical,
          right_eye_dv_axis: customerResponse.data.right_eye_dv_axis,
          right_eye_dv_vn: customerResponse.data.right_eye_dv_vn,
          right_eye_nv_spherical: customerResponse.data.right_eye_nv_spherical,
          right_eye_nv_cylindrical: customerResponse.data.right_eye_nv_cylindrical,
          right_eye_nv_axis: customerResponse.data.right_eye_nv_axis,
          right_eye_nv_vn: customerResponse.data.right_eye_nv_vn,
          // Fetching addition data
          left_eye_addition: customerResponse.data.left_eye_addition,
          right_eye_addition: customerResponse.data.right_eye_addition,
        });
      } catch (error) {
        console.error('Error fetching sale details or customer details:', error);
      }
    };

    if (id) {
      fetchSaleDetails();
    }
  }, [id]);

  if (!sale) {
    return <div>Loading...</div>;
  }

  const finalTotal = sale.products.reduce((total, product) => {
    const productTotal = product.product_price * product.quantity;
    return total + productTotal;
  }, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="sale-details-container">
      <div className="bor">
        <header className="invoice-header">
          <div className="logo">
            <img src={kolo} className="kolo" alt="Company Logo" />
          </div>
          <div className="company-details">
            <h2>New Eye Care</h2>
            <p>9922177297</p>
          </div>
          <div className="gst-number">
            <p>GSTIN: </p>
          </div>
        </header>

        <hr />

        <div className="customer-info">
          <div className="customer-row">
            <p><strong>Name:</strong> {customerDetails.name}</p>
            <p><strong>Receipt No:</strong> {sale.sale_id}</p>
          </div>

          <div className="customer-row1">
            <p><strong>Mobile No:</strong> {customerDetails.phone}</p>
            <p><strong>Receipt Date:</strong> {new Date(sale.created_at).toLocaleDateString()}</p>
          </div>

          <div className="customer-row2">
            <p><strong>Time:</strong> {new Date(sale.created_at).toLocaleTimeString()}</p>
          </div>
        </div>

        <div className="products-section">
          <table className="products-table">
            <thead>
              <tr>
                <th>Sn.</th>
                <th>Particulars</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Dis.</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {sale.products.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.product_name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.product_price}</td>
                  <td>{sale.order_discount}</td>
                  <td>{(product.product_price * product.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <hr />

        <div className="payment-details">
          <div className="payment-itm1">
            <p><strong>Payment Mode:</strong> {sale.payment_method}</p>
            <p><strong>Total Amt:</strong> {finalTotal.toFixed(2)}</p>
          </div>
          <div className="payment-itm2">
            <p><strong>Paid Amt:</strong> {sale.paid}</p>
            <p><strong>Balance Amt:</strong> {(finalTotal - sale.paid).toFixed(2)}</p>
          </div>
        </div>

        <div className="eye-details-container">
          <table className="eye-details-table">
            <caption>Right Eye</caption>
            <thead>
              <tr>
                <th>Eye</th>
                <th>SPH</th>
                <th>CYL</th>
                <th>AXIS</th>
                <th>V/N</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>DV</td>
                <td>{customerEyeDetails.right_eye_dv_spherical}</td>
                <td>{customerEyeDetails.right_eye_dv_cylindrical}</td>
                <td>{customerEyeDetails.right_eye_dv_axis}</td>
                <td>{customerEyeDetails.right_eye_dv_vn}</td>
              </tr>
              <tr>
                <td>NV</td>
                <td>{customerEyeDetails.right_eye_nv_spherical}</td>
                <td>{customerEyeDetails.right_eye_nv_cylindrical}</td>
                <td>{customerEyeDetails.right_eye_nv_axis}</td>
                <td>{customerEyeDetails.right_eye_nv_vn}</td>
              </tr>
              <tr>
                <td>Right Eye Addition</td>
                <td colSpan="4" className="add">{customerEyeDetails.right_eye_addition}</td>
              </tr>
            </tbody>
          </table>

          <table className="eye-details-table">
            <caption>Left Eye</caption>
            <thead>
              <tr>
                <th>Eye</th>
                <th>SPH</th>
                <th>CYL</th>
                <th>AXIS</th>
                <th>V/N</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>DV</td>
                <td>{customerEyeDetails.left_eye_dv_spherical}</td>
                <td>{customerEyeDetails.left_eye_dv_cylindrical}</td>
                <td>{customerEyeDetails.left_eye_dv_axis}</td>
                <td>{customerEyeDetails.left_eye_dv_vn}</td>
              </tr>
              <tr>
                <td>NV</td>
                <td>{customerEyeDetails.left_eye_nv_spherical}</td>
                <td>{customerEyeDetails.left_eye_nv_cylindrical}</td>
                <td>{customerEyeDetails.left_eye_nv_axis}</td>
                <td>{customerEyeDetails.left_eye_nv_vn}</td>
              </tr>
              <tr>
                <td>Left Eye Addition</td>
                <td colSpan="4" className="add">{customerEyeDetails.left_eye_addition}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr></hr>
        <div className='term'>
          <p><strong>Termas & Conditions:</strong></p>
        </div>
        
      </div>
      <button className="print-button" onClick={handlePrint}>Print</button>
    </div>
  );
};

export default SaleDetails;
