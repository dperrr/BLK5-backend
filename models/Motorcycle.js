import mongoose from 'mongoose';


const motorcycleShema = new mongoose.Schema (
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
            min: 1900,
            max: new Date().getFullYear(),
        },
        plateNumber: {
            type:String,
            trim: true,
            uppercase: true,
        },
        color: {
            type:String,
            trim: true,
        },
        mileage: {
            type: Number, default: 0
        },
        datePurchased: {
            type: Date
        },
        imageUrl: {
            type: String,
        }
    },
        {
            timestamps: true
        }
);

export default mongoose.model('Motorcycle', motorcycleShema);