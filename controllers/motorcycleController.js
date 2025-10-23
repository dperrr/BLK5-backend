import Motorcycle from "../models/Motorcycle.js";


export const createMotorcycle = async (req, res) => {
  try {
    const { name, brand, model, year, plateNumber, color, mileage, datePurchased } = req.body;

    const motorcycle = await Motorcycle.create({
      owner: req.user._id,
      name,
      brand,
      model,
      year,
      plateNumber,
      color,
      mileage,
      datePurchased,
    });

    res.status(201).json(motorcycle);
  } catch (error) {
    res.status(500).json({ message: "Error creating motorcycle", error: error.message });
  }
};


export const getMotorcycles = async (req, res) => {
  try {
    const motorcycles = await Motorcycle.find({ owner: req.user._id });
    res.json(motorcycles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching motorcycles", error: error.message });
  }
};


export const getMotorcycleById = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!motorcycle) {
      return res.status(404).json({ message: "Motorcycle not found" });
    }

    res.json(motorcycle);
  } catch (error) {
    res.status(500).json({ message: "Error fetching motorcycle", error: error.message });
  }
};


export const updateMotorcycle = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );

    if (!motorcycle) {
      return res.status(404).json({ message: "Motorcycle not found" });
    }

    res.json(motorcycle);
  } catch (error) {
    res.status(500).json({ message: "Error updating motorcycle", error: error.message });
  }
};


export const deleteMotorcycle = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!motorcycle) {
      return res.status(404).json({ message: "Motorcycle not found" });
    }

    res.json({ message: "Motorcycle deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting motorcycle", error: error.message });
  }
};
