import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/CarDetails.css";
import { options } from "../assets/options";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch car details
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`/api/cars/${id}`);
        if (!response.ok) throw new Error("Failed to fetch car details");
        const data = await response.json();
        setCar(data);
      } catch (err) {
        console.error("⚠️ Error fetching car:", err);
        setError("Unable to load car details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading) return <p className="status-msg">Loading car details...</p>;
  if (error) return <p className="status-msg error">{error}</p>;
  if (!car) return <p className="status-msg">No car found.</p>;

  const getOption = (category, name) =>
    options[category]?.find((opt) => opt.name === name);

  const parts = [
    { label: "Exterior", key: "exterior" },
    { label: "Interior", key: "interior" },
    { label: "Roof", key: "roof" },
    { label: "Wheels", key: "wheels" },
  ];

  const handlePartClick = (key) => {
    setSelectedPart(key);
    setShowModal(true);
  };

  const handleSelectOption = (optionName) => {
    setCar((prev) => ({ ...prev, [selectedPart]: optionName }));
    setShowModal(false);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(car),
      });
      if (!response.ok) throw new Error("Failed to update car");
      navigate(`/customcars/${id}`);
    } catch (err) {
      console.error("⚠️ Error saving car:", err);
      alert("Failed to save changes.");
    }
  };

  return (
    <div className="car-details">
      <h2>Edit: {car.name}</h2>
      <div className="car-info">
        <div className="col1">
          <strong>💰 ${car.price}</strong>
          <div className="btn-container">
            <button onClick={handleSave} className="btn">SAVE</button>
            <button onClick={() => navigate(`/customcars/${id}`)} className="btn-secondary">
              CANCEL
            </button>
          </div>
        </div>

        <div className="car-parts-grid">
          {parts.map(({ label, key }) => {
            const part = getOption(key, car[key]);
            if (!part) return null;
            return (
              <div
                key={key}
                className="part-card editable"
                onClick={() => handlePartClick(key)}
              >
                <img src={part.image} alt={part.name} className="part-image" />
                <div className="part-overlay">
                  <div className="part-info">
                    <p className="part-label">{label}</p>
                    <p className="part-name">{part.name}</p>
                    <p className="part-price">${part.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedPart && (
        <div className="modal">
          <div className="modal-content">
            {/* X Button */}
            <button
              className="modal-close"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>

            <h3>Choose {selectedPart}</h3>
            <div className="option-grid">
              {options[selectedPart].map((opt) => (
                <div
                  key={opt.name}
                  className="option-card"
                  onClick={() => handleSelectOption(opt.name)}
                >
                  <img src={opt.image} alt={opt.name} />
                  <p>{opt.name}</p>
                  <p>${opt.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCar;
