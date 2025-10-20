import { pool } from "./database.js";
import dotenv from "dotenv";

dotenv.config();

async function createLookupTables() {
  const query = `
    DROP TABLE IF EXISTS cars CASCADE;
    DROP TABLE IF EXISTS exteriors CASCADE;
    DROP TABLE IF EXISTS roofs CASCADE;
    DROP TABLE IF EXISTS wheels CASCADE;
    DROP TABLE IF EXISTS interiors CASCADE;

    CREATE TABLE exteriors (
      name VARCHAR(255) PRIMARY KEY,
      cost DECIMAL(10, 2) NOT NULL,
      image TEXT NOT NULL
    );

    CREATE TABLE roofs (
      name VARCHAR(255) PRIMARY KEY,
      cost DECIMAL(10, 2) NOT NULL,
      image TEXT NOT NULL
    );

    CREATE TABLE wheels (
      name VARCHAR(255) PRIMARY KEY,
      cost DECIMAL(10, 2) NOT NULL,
      image TEXT NOT NULL
    );

    CREATE TABLE interiors (
      name VARCHAR(255) PRIMARY KEY,
      cost DECIMAL(10, 2) NOT NULL,
      image TEXT NOT NULL
    );

    CREATE TABLE cars (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      exterior VARCHAR(255) NOT NULL REFERENCES exteriors(name),
      roof VARCHAR(255) NOT NULL REFERENCES roofs(name),
      wheels VARCHAR(255) NOT NULL REFERENCES wheels(name),
      interior VARCHAR(255) NOT NULL REFERENCES interiors(name),
      price DECIMAL(10, 2) NOT NULL
    );
  `;

  try {
    await pool.query(query);
    console.log("🎉 Lookup and cars tables created successfully");
  } catch (err) {
    console.error("⚠️ Error creating tables:", err);
  }
}

async function seedLookupTables() {
  const insertQueries = [
    // --- EXTERIORS ---
    `INSERT INTO exteriors (name, cost, image) VALUES 
      ('Red Paint', 2000, 'https://img.freepik.com/free-vector/dark-deep-red-gradient-background_78370-3496.jpg?semt=ais_hybrid&w=740&q=80'),
      ('Matte Black', 2500, 'https://img.freepik.com/premium-vector/soft-vignette-gradient-lightens-from-black-edges-dark-grey-center_1211457-2703.jpg?semt=ais_hybrid&w=740&q=80'),
      ('Pearl White', 2700, 'https://images.unsplash.com/photo-1707209856575-a80b9dff5524?ixlib=rb-4.1.0&fm=jpg&q=60&w=3000'),
      ('Deep Blue Metallic', 2600, 'https://img.freepik.com/free-vector/grainy-gradient-background-dark-blue_78370-4994.jpg?semt=ais_hybrid&w=740&q=80'),
      ('Silver Frost', 2300, 'https://media.istockphoto.com/id/1704870086/vector/abstract-gray-and-white-color-gradient-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=U_tzoW8Rktdydkc8Ng-O-1kPI-r7BcJun-o2O3n2nvM='),
      ('Emerald Green', 2400, 'https://static.vecteezy.com/system/resources/previews/004/771/729/non_2x/abstract-gradient-background-with-green-color-spotlight-pattern-illustration-free-vector.jpg');`,

    // --- ROOFS ---
    `INSERT INTO roofs (name, cost, image) VALUES 
      ('Convertible', 3000, 'https://www.shutterstock.com/image-photo/szczecinpolandfebruary-2022porsche-911-convertible-top-600nw-2127285125.jpg'),
      ('Hardtop', 1500, 'https://www.putco.com/wp-content/uploads/The-Sky-View-top-provides-a-full-panoramic-view-that-offers-unobstructed-visibility-of-the-sky-and-surrounding-landscape-creating-an-immersive-driving-experience.-e1686589883506.jpg'),
      ('Panoramic Glass', 2800, 'https://cms.motorcomplete.co.uk/media/kfml2viy/model3-781.jpg?width=1200&height=630&quality=90&mode=crop&scale=both&center=0,0'),
      ('Carbon Fiber Roof', 3500, 'https://static0.carbuzzimages.com/wordpress/wp-content/uploads/gallery-images/original/887000/900/887966.jpg'),
      ('Sunroof', 2200, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYPqo20crtV3HmL3UxOGRhAogbx07Snz2zdA&s');`,

    // --- WHEELS ---
    `INSERT INTO wheels (name, cost, image) VALUES 
      ('Sport', 1200, 'https://www.ozracing.com/cache/images/images/products/wheels/challenge-hlt/matt-black/02_challenge-hlt-matt-black-jpg_1000x750_400x333.jpg'),
      ('Standard', 800, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUY3M4qaLLE3fv4ltnEZnSfHhtnAzNUQhfvA&s'),
      ('21-inch Performance', 2000, 'https://forzaaa.com/cdn/shop/files/21-inch-forged-wheels-rims-for-zeekr-001_1.jpg?v=1751975925'),
      ('Carbon Alloy', 2500, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqlqA4WjHu1bVKHTdkRlLT3W-_g9L0SQ942Q&s'),
      ('Chrome Finish', 1800, 'https://cdn.shopify.com/s/files/1/0114/8803/4874/files/IMG_5979_2_480x480.jpg?v=1688411634');`,

    // --- INTERIORS ---
    `INSERT INTO interiors (name, cost, image) VALUES 
      ('Leather', 1800, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrEe4968tWCogbL-IEmdyZN2iIZTU2VX5_UA&s'),
      ('Fabric', 1000, 'https://www.thedrive.com/wp-content/uploads/content-b/message-editor/1613663272467-inlinea.jpg?strip=all&quality=85'),
      ('Black Leather', 2000, 'https://m.media-amazon.com/images/I/81fJPqpC7fL.jpg'),
      ('Tan Premium Leather', 2200, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbYKJctCwFkOiiNzSe1CKpBD2AHwT2HJtJUA&s'),
      ('Vegan Interior', 1900, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ0bfA22jABv6L0k_w-PRnB0P6YX-4RUnfkA&s');`,
  ];

  try {
    for (const q of insertQueries) {
      await pool.query(q);
    }
    console.log("🚗 Lookup tables seeded successfully with all options");
  } catch (err) {
    console.error("⚠️ Error seeding lookup tables:", err);
  }
}

async function seedCarsTable() {
  const insertQuery = `
    INSERT INTO cars (name, exterior, roof, wheels, interior, price)
    VALUES 
      ('Speedster', 'Matte Black', 'Convertible', 'Sport', 'Leather', 68000 + 2500 + 3000 + 1200 + 1800),
      ('Cruiser', 'Red Paint', 'Hardtop', 'Standard', 'Fabric', 68000 + 2000 + 1500 + 800 + 1000);
  `;

  try {
    await pool.query(insertQuery);
    console.log("✅ Cars table seeded successfully");
  } catch (err) {
    console.error("⚠️ Error seeding cars table:", err);
  }
}

async function main() {
  await createLookupTables();
  await seedLookupTables();
  await seedCarsTable();

  const { rows } = await pool.query("SELECT * FROM cars;");
  console.table(rows);

  await pool.end();
}

main();
