import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import User from '../models/User.js'; 
import Motorcycle from '../models/Motorcycle.js'; 
import Part from '../models/Parts.js'; 
import Maintenance from '../models/Maintenance.js';
import connectDB from "../config/db.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({ path: path.resolve(__dirname, '../.env') });

// --- Sample Data ---
const users = [
  { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password123', role: 'admin' },
  { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', password: 'password123', role: 'user' },
  { firstName: 'Mike', lastName: 'Johnson', email: 'mike@example.com', password: 'password123', role: 'user' }
];

const motorcycles = [
  { name: 'Red Dragon', brand: 'Honda', model: 'CBR600RR', year: 2022, plateNumber: 'ABC1234', color: 'Red', mileage: 5000, datePurchased: new Date('2022-06-15'), imageUrl: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f' },
  { name: 'Black Beast', brand: 'Yamaha', model: 'YZF-R1', year: 2021, plateNumber: 'XYZ5678', color: 'Black', mileage: 12000, datePurchased: new Date('2021-03-20'), imageUrl: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f' },
  { name: 'Blue Thunder', brand: 'Suzuki', model: 'GSX-R750', year: 2023, plateNumber: 'DEF9012', color: 'Blue', mileage: 2500, datePurchased: new Date('2023-01-10'), imageUrl: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f' }
];

const parts = [
  { partName: 'Front Brake Pads', price: 85.50, dateBought: new Date('2023-05-10'), status: 'good', notes: 'EBC HH Sintered pads' },
  { partName: 'Engine Oil Filter', price: 12.99, dateBought: new Date('2023-08-20'), status: 'good', notes: 'OEM filter' },
  { partName: 'Chain Kit', price: 145.00, dateBought: new Date('2022-11-05'), status: 'needs replacement', notes: 'DID chain kit' }
];

const maintenanceRecords = [
  { description: 'Regular oil change', cost: 75.00, mechanic: "Bob's Shop" },
  { description: 'Brake pad replacement', cost: 150.00, mechanic: 'Speed Garage' }
];


const seedDatabase = async () => {
  try {

    if (process.env.NODE_ENV === 'production') {
      console.error('ERROR: Cannot run seeder in production mode!');
      process.exit(1);
    }

    console.log('Connecting to database...');
    await connectDB();

    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Motorcycle.deleteMany({});
    await Part.deleteMany({});
    await Maintenance.deleteMany({});

    // 4. Create Users
    console.log('Hashing passwords and creating users...');
    const salt = await bcrypt.genSalt(10);
    const usersWithHashedPasswords = await Promise.all(users.map(async (u) => ({
      ...u,
      password: await bcrypt.hash(u.password, salt)
    })));
    const createdUsers = await User.insertMany(usersWithHashedPasswords);

    // 5. Create Motorcycles
    const createdMotorcycles = await Promise.all(motorcycles.map((m, i) => {
      return Motorcycle.create({
        ...m,
        owner: createdUsers[i % createdUsers.length]._id
      });
    }));

    // 6. Create Parts
    const createdParts = await Promise.all(parts.map((p, i) => {
      const bike = createdMotorcycles[i % createdMotorcycles.length];
      return Part.create({
        ...p,
        owner: bike.owner,
        motorcycle: bike._id
      });
    }));

    // 7. Create Maintenance Records
    await Promise.all(maintenanceRecords.map((mr, i) => {
      const bike = createdMotorcycles[i % createdMotorcycles.length];
      return Maintenance.create({
        ...mr,
        owner: bike.owner,
        motorcycle: bike._id,
        part: createdParts[i % createdParts.length]._id
      });
    }));

    console.log('\n✅ BLK5 Database Seeded Successfully!');
    process.exit(0);

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();