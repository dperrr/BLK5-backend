import Motorcycle from "../models/Motorcycle.js";
import cloudinary from "../config/cloudinary.js";

export const createMotorcycle = async (req, res) => {
  try {
    const { name, brand, model, year, plateNumber, color, mileage, datePurchased } = req.body;

    const motorcycleData = {
      owner: req.user._id,
      name,
      brand,
      model,
      year,
      plateNumber,
      color,
      mileage,
      datePurchased,
    };

    if (req.file) {
      motorcycleData.imageUrl = req.file.path;
    }

    const motorcycle = await Motorcycle.create(motorcycleData);

    res.status(201).json(motorcycle);
  } catch (error) {
    res.status(500).json({ message: "Error creating motorcycle", error: error.message });
  }
};

export const updateMotorcycle = async (req, res) => {
  try {
    const updateData = { ...req.body };


    if (req.file) {
      const motorcycle = await Motorcycle.findOne({
        _id: req.params.id,
        owner: req.user._id,
      });

      if (motorcycle?.imageUrl) {
        const publicId = motorcycle.imageUrl.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }

      updateData.imageUrl = req.file.path;
    }

    const updatedMotorcycle = await Motorcycle.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      updateData,
      { new: true }
    );

    if (!updatedMotorcycle) {
      return res.status(404).json({ message: "Motorcycle not found" });
    }

    res.json(updatedMotorcycle);
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


    if (motorcycle.imageUrl) {
      const publicId = motorcycle.imageUrl.split('/').slice(-2).join('/').split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    res.json({ message: "Motorcycle deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting motorcycle", error: error.message });
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