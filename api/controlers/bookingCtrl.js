export default (bookingRepo) => {

    const listBookings = (_, res) => {
        res.status(200).send({
            data: bookingRepo.listBookings()
        });
    };

    const createBooking = (req, res) => {
        
        const booking = bookingRepo.createBooking(req.body);

        if(booking.error){
            return res.status(400).send({
                error: {
                    message: booking.error
                }
            })
        }
            return res.status(201).send({
                data: booking
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

        if(!bookings) {
            return res.status(400).send({
                error: {
                    message: "The user doesn't exist"
                }
            })
        }
        return res.status(200).send({
            data: bookings
        });
    }

    return {
        listBookings,
        createBooking,
        getBooking,
        getBookingsByUser
    }

}