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

    return {
        listBookings,
        createBooking
    }

}