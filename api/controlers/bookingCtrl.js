
import { DateTime } from 'luxon';

export default (bookingRepo) => {

    const listBookings = (_, res) => {
        res.status(200).send({
            data: bookingRepo.listBookings()
        });
    };

    const createBooking = (req, res) => {

        const booking = req.body

        if (Math.abs(DateTime.fromISO(booking.rentDate).diffNow('days').values.days) > 1) {
            return res.status(400).send({
                error: {
                    message: "The rent date must be after today"
                }
            })
        }

        if (DateTime.fromISO(booking.rentDate).diff(DateTime.fromISO(booking.returnDate), 'days').days > 0) {

            return res.status(400).send({
                error: {
                    message: "The rent date must be before the return date"
                }
            })
            
        }
        
        const newBooking = bookingRepo.createBooking(booking);

        if(newBooking.error) {
            return res.status(400).send({
                error: {
                    message: newBooking.error
                }
            })
        }

      
        return res.status(201).send({
            data: newBooking
        });
    }

    const getBooking = (req, res) => {
        const booking = bookingRepo.findBookingByID(req.params.id);
        if(!booking) {
            return res.status(400).send({
                error: {
                    message: "The booking doesn't exist"
                }
            })
        }
        return res.status(200).send({
            data: booking
        });
    }

   const getBookingsByUser = (req, res) => {

        const bookings = bookingRepo.findBookingsByUser(req.params.userID);

        if(bookings.error){
            return res.status(400).send({
                error: {
                    message: bookings.error
                }
            })
        }

        
        return res.status(200).send({
            data: bookings
        });
    }

    const getBookingsByItem = (req, res) => {

        const bookings = bookingRepo.findBookingsByItem(req.params.itemID);
        console.log(req.params.itemID)

        if(bookings.error){
            return res.status(400).send({
                error: {
                    message: bookings.error
                }
            })
        }

        return res.status(200).send({
            data: bookings
        });
    }

    const updateReturnDate = (req, res) => {
        const booking = bookingRepo.updateReturnDate(req.params.id, req.body);

        if(booking.error) {
            return res.status(400).send({
                error: {
                    message: booking.error
                }
            })
        }
        return res.status(200).send({
            data: booking
        });
    }

    return {
        listBookings,
        createBooking,
        getBooking,
        getBookingsByUser,
        getBookingsByItem,
        updateReturnDate
    }

}