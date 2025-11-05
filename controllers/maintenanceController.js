import Maintenance from "../models/Maintenance.js"
import Part from "../models/Parts.js";
import Motorcycle from "../models/Motorcycle.js"


export const addMaintenance = async (req, res) => {
    try {

        const { motorcycle, part, description, date, cost, nextMaintenance, mechanic } = req.body;
        const moto = await Motorcycle.findOne({
            _id: motorcycle,
            owner: req.user._id
        });
        if(!moto) {
            return res.status(400).json({ message: "Motorcycle not found or not owned by user"})
        };
        const maintenance = await Maintenance.create({
            owner: req.user._id,
            motorcycle,
            part,
            description,
            date,
            cost,
            nextMaintenance,
            mechanic
        });
        res.status(201).json(maintenance);


    }catch(error) {
        res.status(500).json({ message: "Error creating Maintenance", error: error.message });
    }
}

export const getMaintenances = async (req, res) => {
  try {
    const records = await Maintenance.find({ owner: req.user._id })
      .populate("motorcycle", "brand")
      .populate("part", "partName status");

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching maintenance records", error: error.message });
  }
};

export const updateMaintenance = async (req, res) => {
    try{
        const updated = await Maintenance.findOneAndUpdate(
            { _id: req.params.id,owner: req.user._id },
            req.body,
            { new: true, runValidators: true}
        );
        if (!updated) {
            return res.status(404).json({ message: "Maintenance record not found" });
        }
        res.json(updated);
    }catch (error) {
        res.status(500).json({ message: "Error Updating maintenance records", error: error.message });
    }
}

export const deleteMaintenance = async (req, res) => {
    try {
        const deleted = await Maintenance.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        });

        if(!deleted) {
            return res.status("404").json({ message: "Maintenance record not found "});
        }
        res.json({ message: "Maintenance record deleted successfully" });
    }catch (error) {
        res.status(500).json({ message: "Error deleting maintenance record", error: error.message });
    }
}