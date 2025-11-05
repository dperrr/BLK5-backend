import Part from "../models/Parts.js";
import Motorcycle from "../models/Motorcycle.js"

export const addPart = async (req, res) => {
  try {
    const { partName, price, dateBought, status, lastMaintenance, notes, motorcycle } = req.body;


    const moto = await Motorcycle.findOne({ _id: motorcycle, owner: req.user._id });
    if (!moto) {
      return res.status(400).json({ message: "Motorcycle not found or not owned by user" });
    }

    const newPart = await Part.create({
      partName,
      price,
      dateBought,
      status,
      lastMaintenance,
      notes,
      motorcycle,
      owner: req.user._id
    });

    res.status(201).json(newPart);
  } catch (error) {
    res.status(500).json({ message: "Error creating part", error: error.message });
  }
};

export const getParts = async (req, res) => {
  try {
    const { motorcycleId } = req.params;

    const parts = await Part.find({
      owner: req.user._id,
      motorcycle: motorcycleId
    }).populate("motorcycle", "brand model");

    res.status(200).json(parts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching parts", error: error.message });
  }
};


//  Update a specific part
export const updatePart = async (req, res) => {
  try {
    const { partId } = req.params;

    const part = await Part.findOneAndUpdate(
      { 
        _id: partId, 
        owner: 
        req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!part) {
      return res.status(404).json({ message: "Part not found" });
    }

    res.json({
      message: "Part updated successfully",
      part,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating part", error: error.message });
  }
};

export const deletePart = async (req, res) => {
  try {
    const { partId } = req.params;
    const part = await Part.findOneAndDelete({
      _id: partId,
      owner: req.user._id
    }, req.body);

    if (!part) {
      return res.status(400).json({ message: "Part not found" });
    }

    res.status(200).json({ message: "Part deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting part", error: error.message });
  }
};
