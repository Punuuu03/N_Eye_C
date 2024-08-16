import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddPurchase.css';
import { useNavigate } from 'react-router-dom';

const createNewPurchaseItem = () => ({
  productId: '',
  productDetails: { price: '0', stock: '0' },
  purchasePrice: '0',
  quantity: '0',
  itemTotal: 0,
});

const AddPurchase = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [supplierId, setSupplierId] = useState('');
  const [supplierPhone, setSupplierPhone] = useState('');
  const [purchaseItems, setPurchaseItems] = useState([createNewPurchaseItem()]);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [orderDiscount, setOrderDiscount] = useState(0);
  const [paid, setPaid] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3000/follow/suppliers')
      .then(response => {
        setSuppliers(response.data);
      })
      .catch(error => {
        console.error('Error fetching suppliers:', error);
      });

    axios.get('http://localhost:3000/follow/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    calculateTotals(purchaseItems);
  }, [orderDiscount, purchaseItems]);

  const handleSupplierChange = async (event) => {
    const id = event.target.value;
    setSupplierId(id);
    try {
      const response = await axios.get(`http://localhost:3000/follow/suppliers/${id}`);
      const { phone_number } = response.data;
      setSupplierPhone(phone_number);
    } catch (error) {
      console.error('Error fetching supplier details:', error);
      setSupplierPhone(''); // Clear phone number if error occurs
    }
  };

  const handleProductChange = async (index, event) => {
    const id = event.target.value;
    const newPurchaseItems = [...purchaseItems];
    newPurchaseItems[index].productId = id;
    try {
      const response = await axios.get(`http://localhost:3000/follow/products/${id}`);
      const { price, stock } = response.data;
      if (stock === 0) {
        alert('Stock is not available. Select another product.');
        newPurchaseItems[index] = createNewPurchaseItem();
        setPurchaseItems(newPurchaseItems);
        return;
      }
      newPurchaseItems[index].productDetails = { price, stock };
      newPurchaseItems[index].purchasePrice = '';
      newPurchaseItems[index].quantity = '';
      newPurchaseItems[index].itemTotal = 0;
      setPurchaseItems(newPurchaseItems);
      calculateTotals(newPurchaseItems);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handlePurchaseItemChange = (index, field, value) => {
    const newPurchaseItems = [...purchaseItems];
    
    if (field === 'quantity') {
      const quantity = parseFloat(value) || 0;
      const stock = parseFloat(newPurchaseItems[index].productDetails.stock) || 0;
  
      if (quantity > stock) {
        alert('Quantity exceeds available stock. Please adjust.');
        return; // Prevent further updates if the quantity exceeds stock
      }
    }
  
    newPurchaseItems[index][field] = value;
    calculateItemTotal(index, newPurchaseItems);
    setPurchaseItems(newPurchaseItems);
  };
  

  const calculateItemTotal = (index, purchaseItems) => {
    const price = parseFloat(purchaseItems[index].purchasePrice) || 0;
    const quantity = parseFloat(purchaseItems[index].quantity) || 0;
    purchaseItems[index].itemTotal = price * quantity;
    calculateTotals(purchaseItems);
  };

  const calculateTotals = (purchaseItems) => {
    const total = purchaseItems.reduce((sum, item) => sum + item.itemTotal, 0);
    const discountAmount = total * (orderDiscount / 100);
    const totalAfterDiscount = total - discountAmount;
    setOrderTotal(total);
    setTotalAfterDiscount(totalAfterDiscount);
  };

  const handleAddProduct = () => {
    setPurchaseItems([...purchaseItems, createNewPurchaseItem()]);
  };

  const handleRemoveProduct = (index) => {
    const newPurchaseItems = purchaseItems.filter((_, i) => i !== index);
    setPurchaseItems(newPurchaseItems);
    calculateTotals(newPurchaseItems);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const purchaseData = purchaseItems.map(item => ({
      product_id: item.productId,
      purchase_price: item.purchasePrice,
      quantity: item.quantity,
    }));

    axios.post('http://localhost:3000/follow/purchases', {
      supplier_id: supplierId,
      supplier_phone: supplierPhone,
      purchase_data: purchaseData,
      payment_method: paymentMethod,
      order_discount: orderDiscount,
      paid,
    })
    .then(response => {
      alert(response.data.message);
      navigate('/Component/Branch1/PurchaseList/PurchaseList'); // Navigate to the Sale List page
    })
    // .then(response => alert(response.data.message))
    .catch(error => console.error('Error submitting purchase:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="add-purchase-form">
      <h2>Purchase Order</h2>
      <div className="supplier-info">
        <div className="input-group">
          <label>Supplier:</label>
          <select value={supplierId} onChange={handleSupplierChange} required>
            <option value="">Select Supplier</option>
            {suppliers.map(supplier => (
              <option key={supplier.supplier_id} value={supplier.supplier_id}>{supplier.name}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Supplier Phone Number:</label>
          <input type="text" value={supplierPhone} readOnly />
        </div>
      </div>
      <button type="button" className="new-row-btn" onClick={handleAddProduct}>+ New Row</button>
      <table className="purchase-items-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Product MRP</th>
            <th>Purchase Price</th>
            <th>Quantity</th>
            <th>Stock</th>
            <th>Item Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchaseItems.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <select value={item.productId} onChange={(e) => handleProductChange(index, e)} required>
                  <option value="">Select Product</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                  ))}
                </select>
              </td>
              <td className='MRP'>{item.productDetails.price}</td>
              <td>
                <input
                  type="number"
                  value={item.purchasePrice}
                  onChange={(e) => handlePurchaseItemChange(index, 'purchasePrice', e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handlePurchaseItemChange(index, 'quantity', e.target.value)}
                  required
                />
              </td>
              <td className='MRP'>{item.productDetails.stock}</td>
              <td className='MRP'>{item.itemTotal.toFixed(2)}</td>
              <td>
                <button type="button" onClick={() => handleRemoveProduct(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="totals">
        <div className="input-group">
          <label>Payment Method:</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
          </select>
        </div>
        <div className="input-group">
          <label>Order Total:</label>
          <input type="text" value={orderTotal.toFixed(2)} readOnly />
        </div>
        <div className="input-group">
          <label>Order Discount (%):</label>
          <input
            type="number"
            value={orderDiscount}
            onChange={(e) => setOrderDiscount(parseFloat(e.target.value))}
            required
          />
        </div>
        <div className="input-group">
          <label>Total After Discount:</label>
          <input type="text" value={totalAfterDiscount.toFixed(2)} readOnly />
        </div>
        <div className="input-group">
          <label>Paid:</label>
          <input
            type="number"
            value={paid}
            onChange={(e) => setPaid(parseFloat(e.target.value))}
            required
          />
        </div>
      </div>
      <br></br>
      <button type="submit" id='addpurchase-save-btn'>Submit Purchase</button>
    </form>
  );
};

export default AddPurchase;
