import express from "express";
import {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} from "../controllers/carsController.js";

const router = express.Router();

// 🟢 Get all cars
router.get("/", getCars);

// 🟢 Get a single car by ID
router.get("/:id", getCarById);

// 🟡 Create a new car
router.post("/", createCar);

// 🟠 Update an existing car
router.put("/:id", updateCar);

// 🔴 Delete a car
router.delete("/:id", deleteCar);

export default router;
