import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { options } from "../assets/options";

const CreateCar = () => {
  const basePrice = 68000;
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    exterior: "",
    roof: "",
    wheels: "",
    interior: "",
    price: basePrice,
  });

  const [openDropdown, setOpenDropdown] = useState(null);

  // 🔹 Handle attribute selection
  const handleSelect = (field, option) => {
    const updated = { ...formData, [field]: option.name };

    // Calculate total
    const total =
      basePrice +
      (options.exterior.find((o) => o.name === updated.exterior)?.price || 0) +
      (options.roof.find((o) => o.name === updated.roof)?.price || 0) +
      (options.wheels.find((o) => o.name === updated.wheels)?.price || 0) +
      (options.interior.find((o) => o.name === updated.interior)?.price || 0);

    updated.price = total;

    setFormData(updated);
    setOpenDropdown(null);
  };

  // 🔹 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("✅ Car created:", data);
    navigate('/customcars')
  };

  return (
    <div className="create-car-container">
      <form onSubmit={handleSubmit} className="create-car-form">
        <input
          type="text"
          placeholder="Car Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        {/* 🔹 Button group for toggling dropdowns */}
        <div className="button-row">
          {["exterior", "roof", "wheels", "interior"].map((field) => (
            <div key={field} className="dropdown">
              <button
                type="button"
                className="car-option-btn"
                onClick={() =>
                  setOpenDropdown(openDropdown === field ? null : field)
                }
              >
                {field.toUpperCase()}
              </button>

              {openDropdown === field && (
                <div className="dropdown-menu">
                  {options[field].map((opt) => (
                    <div
                      key={opt.name}
                      className="dropdown-item"
                      onClick={() => handleSelect(field, opt)}
                    >
                      <div className="option-image-container">
                        <img
                          src={opt.image}
                          alt={opt.name}
                          className="option-image"
                        />
                        <div className="hover-info">
                          <p>{opt.name}</p>
                          <p>${opt.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 🔹 Display selected attributes */}
        <div className="selection-summary">
          <p><strong>Exterior:</strong> {formData.exterior || "—"}</p>
          <p><strong>Roof:</strong> {formData.roof || "—"}</p>
          <p><strong>Wheels:</strong> {formData.wheels || "—"}</p>
          <p><strong>Interior:</strong> {formData.interior || "—"}</p>
        </div>

        {/* 🔹 Price display */}
        <p className="price-display">💰 Total: ${formData.price.toLocaleString()}</p>

        {/* Hidden price input for backend */}
        <input type="hidden" name="price" value={formData.price} />

        <button type="submit" className="nav-btn primary">Create Car</button>
      </form>
    </div>
  );
};

export default CreateCar;
