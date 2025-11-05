import mongoose from "mongoose";



const maintenanceSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        motorcycle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Motorcycle",
            required: true
        },
        part: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Part",
            required: false
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now
        },
        cost: {
            type: Number,
            default: 0,
        },
        nextMaintenance: {
            type: Date,
        },
        mechanic: {
            type: String,
            required: true,
        }

    },
    { timestamps: true }
);

export default mongoose.model('Maintenance', maintenanceSchema);