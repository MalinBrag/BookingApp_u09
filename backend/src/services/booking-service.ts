import Booking from "../models/booking-model";

export const saveBooking = async (userId: string, bookingData: object) => {
    try {
        const booking = new Booking({
            userId,
            bookingData
        });

        await booking.save();
        return booking;
    } catch (error) {
        console.error('Error saving booking:', error);
        throw new Error('Database save failed');
    }
};



