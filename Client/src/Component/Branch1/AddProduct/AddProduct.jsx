import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("0");
  const [stock, setStock] = useState("0");
  const [productId, setProductId] = useState("0");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("product_id", productId);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.Status) {
        setMessage("Product added successfully!");
        setName("");
        setPrice("");
        setStock("");
        setProductId("");
        setImage(null);
        setPreview(null);
        navigate("/Component/Branch1/ProductList/ProductList"); // Navigate to the ProductList component
      } else {
        setMessage(`Error: ${response.data.Error}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Error adding product. Please try again.");
    }
  };

  return (
    <div className="product-form-overlay">
      <div id="product-form-container">
        <div className="product-form-content">
          <div className="image-preview-container">
            {preview ? (
              <img src={preview} alt="Preview" />
            ) : (
              <div className="file-upload-group">
                <input
                  type="file"
                  id="image-upload"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
          <div className="form-inputs">
            <h1 id="product-form-heading">Add New Product</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="product-name">Product Name</label>
                  <input
                    type="text"
                    id="product-name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="product-price">Price</label>
                  <input
                    type="number"
                    id="product-price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="product-stock">Stock</label>
                  <input
                    type="number"
                    id="product-stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="product-id">Product ID</label>
                  <input
                    type="text"
                    id="product-id"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" id="product-form-submit-button">
                Add Product
              </button>
            </form>
          </div>
        </div>
        {message && (
          <p
            id="product-form-message"
            className={
              message.includes("Error") ? "error-message" : "success-message"
            }
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
