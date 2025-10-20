import { pool } from "../config/database.js";

// ✅ Get all cars
export async function getCars(req, res) {
  try {
    const result = await pool.query("SELECT * FROM cars ORDER BY id ASC;");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("⚠️ Error fetching cars:", err);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
}

// ✅ Get a single car by ID
export async function getCarById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM cars WHERE id = $1;", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("⚠️ Error fetching car:", err);
    res.status(500).json({ error: "Failed to fetch car" });
  }
}

// ✅ Create a new car
export async function createCar(req, res) {
  const { name, exterior, roof, wheels, interior, price } = req.body;

  if (!name || !exterior || !roof || !wheels || !interior || !price) {
    return res.status(400).json({ error: "All fields including price are required" });
  }

  try {
    const query = `
      INSERT INTO cars (name, exterior, roof, wheels, interior, price)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [name, exterior, roof, wheels, interior, price];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("⚠️ Error creating car:", err);
    res.status(500).json({ error: "Failed to create car" });
  }
}


// ✅ Update an existing car
export async function updateCar(req, res) {
  const { id } = req.params;
  const updates = req.body; // expected: { exterior, interior, roof, wheels, ... }

  try {
    // Ensure the car exists first
    const check = await pool.query("SELECT * FROM cars WHERE id = $1", [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({ error: "Car not found" });
    }

    // Build dynamic SET clause
    const fields = [];
    const values = [];
    let i = 1;

    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) {
        fields.push(`${key} = $${i}`);
        values.push(value);
        i++;
      }
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "No valid fields provided to update" });
    }

    // Add id as the last parameter
    values.push(id);

    const query = `
      UPDATE cars
      SET ${fields.join(", ")}
      WHERE id = $${i}
      RETURNING *;
    `;

    const result = await pool.query(query, values);

    res.status(200).json({
      message: "Car updated successfully",
      car: result.rows[0],
    });
  } catch (err) {
    console.error("⚠️ Error updating car:", err);
    res.status(500).json({ error: "Failed to update car" });
  }
}


// ✅ Delete a car
export async function deleteCar(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM cars WHERE id = $1 RETURNING *;", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    console.error("⚠️ Error deleting car:", err);
    res.status(500).json({ error: "Failed to delete car" });
  }
}