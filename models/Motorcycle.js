import mongoose from 'mongoose';


const motorCycleShema = new mongoose.Schema (
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        model: {
            type:String,
            required: true
        },
        year: {
            type: Number,
        },
        plateNumber: {
            type:String
        },
        color: {
            type:String
        },
        mileage: {
            type: Number, default: 0
        },
        datePurchased: {
            type: Date
        },
    },
        {
            timestamps: true
        }
);

export default mongoose.model('Motorcycle', motorCycleShema);