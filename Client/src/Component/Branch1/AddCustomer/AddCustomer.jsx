
// export default AddCustomer;
import React, { useState } from "react";
import axios from "axios";
import {
  FaMagento,
  FaUser,
  FaPhoneAlt,
  FaMailBulk,
  FaAddressBook,
  FaPersonBooth,
  FaCalendar,
  FaEye,
  FaAngleDown,
  FaAngleUp
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AddCustomer.css";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [leftEyeDV, setLeftEyeDV] = useState({
    spherical: "0",
    cylindrical: "0",
    axis: "0",
    vn: "0",
  });
  const [leftEyeNV, setLeftEyeNV] = useState({
    spherical: "0",
    cylindrical: "0",
    axis: "0",
    vn: "0",
  });
  const [rightEyeDV, setRightEyeDV] = useState({
    spherical: "0",
    cylindrical: "0",
    axis: "0",
    vn: "0",
  });
  const [rightEyeNV, setRightEyeNV] = useState({
    spherical: "0",
    cylindrical: "0",
    axis: "0",
    vn: "0",
  });
  const [leftEyeAddition, setLeftEyeAddition] = useState("0");
  const [rightEyeAddition, setRightEyeAddition] = useState("0");

  // State to manage visibility of eye data sections
  const [showEyeData, setShowEyeData] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      name,
      phone,
      email,
      address,
      date_of_birth: dateOfBirth,
      gender,
      left_eye_dv: leftEyeDV,
      left_eye_nv: leftEyeNV,
      right_eye_dv: rightEyeDV,
      right_eye_nv: rightEyeNV,
      left_eye_addition: leftEyeAddition,
      right_eye_addition: rightEyeAddition,
    };
    axios
      .post("http://localhost:3000/branch1/customers", newCustomer)
      .then((result) => {
        if (result.data.Status) {
          navigate("/Component/Branch1/CustomerList/CustomerList");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.error("Error adding customer:", err));
  };

  return (
    <div className="customer-form-overlay">
      <div className="customer-form-container">
        <h2 className="customer-form-heading">
          <FaMagento /> Add New Customer
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name and Phone */}
          <div className="customer-form-row">
            <div className="customer-form-group">
              <label htmlFor="customer-name-input">
                <FaUser /> Name
              </label>
              <input
                type="text"
                id="customer-name-input"

                className="customer-input-field"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="customer-form-group">
              <label htmlFor="customer-phone-input">
                <FaPhoneAlt /> Phone
              </label>
              <input
                type="text"
                id="customer-phone-input"
                className="customer-input-field"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Email and Address */}
          <div className="customer-form-row">
            <div className="customer-form-group">
              <label htmlFor="customer-email-input">
                <FaMailBulk /> Email
              </label>
              <input
                type="email"
                id="customer-email-input"
                className="customer-input-field"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="customer-form-group">
              <label htmlFor="customer-address-input">
                <FaAddressBook /> Address
              </label>
              <textarea
                id="customer-address-input"
                className="customer-input-textarea"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
          {/* Date of Birth and Gender */}
          <div className="customer-form-row">
            <div className="customer-form-group">
              <label htmlFor="customer-dob-input">
                <FaCalendar /> Date of Birth
              </label>
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
              <label htmlFor="customer-gender-input">
                <FaPersonBooth /> Gender
              </label>
              <select
                id="customer-gender-input"
                className="customer-input-field"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Toggle Button */}
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
              {/* Left Eye DV */}
              <label>
                <b>
                  <FaEye /> Left Eye (DV)
                </b>
              </label>
              <div className="customer-form-row">
                <div className="customer-form-group">
                  <label>Spherical</label>
                  <input
                    type="number"
                    step="0.01"
                    className="customer-input-field"
                    value={leftEyeDV.spherical}
                    onChange={(e) =>
                      setLeftEyeDV({ ...leftEyeDV, spherical: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="customer-form-group">
                  <label>Cylindrical</label>
                  <input
                    type="number"
                    step="0.01"
                    className="customer-input-field"
                    value={leftEyeDV.cylindrical}
                    onChange={(e) =>
                      setLeftEyeDV({ ...leftEyeDV, cylindrical: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="customer-form-group">
                  <label>Axis</label>
                  <input
                    type="number"
                    className="customer-input-field"
                    value={leftEyeDV.axis}
                    onChange={(e) =>
                      setLeftEyeDV({ ...leftEyeDV, axis: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="customer-form-group">
                  <label>V/N</label>
                  <input
                    type="text"
                    className="customer-input-field"
                    value={leftEyeDV.vn}
                    onChange={(e) =>
                      setLeftEyeDV({ ...leftEyeDV, vn: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Left Eye NV */}
              <label>
                <b>
                  <FaEye /> Left Eye (NV)
                </b>
              </label>
              <div className="customer-form-row">
                <div className="customer-form-group">
                  <label>Spherical</label>
                  <input
                    type="number"
                    step="0.01"
                    className="customer-input-field"
                    value={leftEyeNV.spherical}
                    onChange={(e) =>
                      setLeftEyeNV({ ...leftEyeNV, spherical: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="customer-form-group">
                  <label>Cylindrical</label>
                  <input
                    type="number"
                    step="0.01"
                    className="customer-input-field"
                    value={leftEyeNV.cylindrical}
                    onChange={(e) =>
                      setLeftEyeNV({
                        ...leftEyeNV,
                        cylindrical: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="customer-form-group">
                  <label>Axis</label>
                  <input
                    type="number"
                    className="customer-input-field"
                    value={leftEyeNV.axis}
                    onChange={(e) =>
                      setLeftEyeNV({ ...leftEyeNV, axis: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="customer-form-group">
                  <label>V/N</label>
                  <input
                    type="text"
                    className="customer-input-field"
                    value={leftEyeNV.vn}
                    onChange={(e) =>
                      setLeftEyeNV({ ...leftEyeNV, vn: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Right Eye DV */}
              <label>
                <b>
                  <FaEye /> Right Eye (DV)
                </b>
              </label>
              <div className="customer-form-row">
                <div className="customer-form-group">
                  <label>Spherical</label>
                  <input
                    type="number"
                    step="0.01"
                    className="customer-input-field"
                    value={rightEyeDV.spherical}
                    onChange={(e) =>
                      setRightEyeDV({ ...rightEyeDV, spherical: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="customer-form-group">
                  <label>Cylindrical</label>
                  <input
                    type="number"
                    step="0.01"
                    className="customer-input-field"
                    value={rightEyeDV.cylindrical}
                    onChange={(e) =>
                      setRightEyeDV({
                        ...rightEyeDV,
                        cylindrical: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="customer-form-group">
                  <label>Axis</label>
                  <input
                    type="number"
                    className="customer-input-field"
                    value={rightEyeDV.axis}
                    onChange={(e) =>
                      setRightEyeDV({ ...rightEyeDV, axis: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="customer-form-group">
                  <label>V/N</label>
                  <input
                    type="text"
                    className="customer-input-field"
                    value={rightEyeDV.vn}
                    onChange={(e) =>
                      setRightEyeDV({ ...rightEyeDV, vn: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Right Eye NV */}
              <label>
                <b>
                  <FaEye /> Right Eye (NV)
                </b>
              </label>
              <div className="customer-form-row">
                <div className="customer-form-group">
                  <label>Spherical</label>
                  <input
                    type="number"
                    step="0.01"
                    className="customer-input-field"
                    value={rightEyeNV.spherical}
                    onChange={(e) =>
                      setRightEyeNV({ ...rightEyeNV, spherical: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="customer-form-group">
                  <label>Cylindrical</label>
                  <input
                    type="number"
                    step="0.01"
                    className="customer-input-field"
                    value={rightEyeNV.cylindrical}
                    onChange={(e) =>
                      setRightEyeNV({
                        ...rightEyeNV,
                        cylindrical: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="customer-form-group">
                  <label>Axis</label>
                  <input
                    type="number"
                    className="customer-input-field"
                    value={rightEyeNV.axis}
                    onChange={(e) =>
                      setRightEyeNV({ ...rightEyeNV, axis: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="customer-form-group">
                  <label>V/N</label>
                  <input
                    type="text"
                    className="customer-input-field"
                    value={rightEyeNV.vn}
                    onChange={(e) =>
                      setRightEyeNV({ ...rightEyeNV, vn: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Addition Fields */}
              <div className="customer-form-row">
                <div className="customer-form-group">
                  <label htmlFor="left-eye-addition">Left Eye Addition</label>
                  <input
                    type="number"
                    step="0.01"
                    id="left-eye-addition"
                    className="customer-input-field"
                    value={leftEyeAddition}
                    onChange={(e) => setLeftEyeAddition(e.target.value)}
                    required
                  />
                </div>
                <div className="customer-form-group">
                  <label htmlFor="right-eye-addition">Right Eye Addition</label>
                  <input
                    type="number"
                    step="0.01"
                    id="right-eye-addition"
                    className="customer-input-field"
                    value={rightEyeAddition}
                    onChange={(e) => setRightEyeAddition(e.target.value)}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button type="submit" className="customer-form-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
