import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../css/CarDetails.css";
import { options } from "../assets/options"; // make sure this path matches your setup

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this car?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete car");

      alert("✅ Car deleted successfully.");
      navigate("/customcars"); // or "/" if that's your main page
    } catch (err) {
      console.error("⚠️ Error deleting car:", err);
      alert("Failed to delete the car. Please try again.");
    }
  };

  if (loading) return <p className="status-msg">Loading car details...</p>;
  if (error) return <p className="status-msg error">{error}</p>;
  if (!car) return <p className="status-msg">No car found.</p>;

  // Helper function to find the correct option
  const getOption = (category, name) => {
    return options[category]?.find((opt) => opt.name === name);
  };

  const parts = [
    { label: "Exterior", key: "exterior" },
    { label: "Interior", key: "interior" },
    { label: "Roof", key: "roof" },
    { label: "Wheels", key: "wheels" },
  ];

  return (
    <div className="car-details">
      <h2>{car.name}</h2>
      <div className="car-info">
        <div className="col1">
          <strong>💰 ${car.price}</strong>
          <div className="btn-container">
            <button>
              <Link className="btn" to={`/edit/${car.id}`}>
                EDIT
              </Link>
            </button>
            <button onClick={handleDelete} className="delete-btn">
              DELETE
            </button>
          </div>
        </div>

        <div className="car-parts-grid">
          {parts.map(({ label, key }) => {
            const part = getOption(key, car[key]);
            if (!part) return null;
            return (
              <div key={key} className="part-card">
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
    </div>
  );
};

export default CarDetails;
