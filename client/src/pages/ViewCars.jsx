import React, { useEffect, useState } from "react";
import "../App.css";
import CarDetails from "./CarDetails";
import CarCard from "../components/CarCard";

const ViewCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cars from your backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("/api/cars");
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data = await response.json();
        setCars(data);
      } catch (err) {
        console.error("⚠️ Error fetching cars:", err);
        setError("Unable to load cars at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <p className="status-msg">Loading cars...</p>;
  if (error) return <p className="status-msg error">{error}</p>;

  return (
    <div className="cars-container">
      {cars.map((car) => (
        <CarCard 
            key={car.id}
            id={car.id}
            name={car.name}
            exterior={car.exterior}
            roof={car.roof}
            wheels={car.wheels}
            interior={car.interior}
            price={car.price}
        />
      ))}
    </div>
  );
};

export default ViewCars;
