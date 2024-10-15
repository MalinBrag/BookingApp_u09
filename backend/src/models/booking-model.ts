import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    userId: { type: String, required: true },
    bookingData: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', bookingSchema);


