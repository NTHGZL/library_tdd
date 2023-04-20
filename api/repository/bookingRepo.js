
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';

export default (Booking, User, Book) => {


    const books = [
        new Book("9782070416768", "Harry Potter et la coupe de feu", "J.K. Rowling", "Gallimard Jeunesse", "FR", 8.99),
        new Book("9782070416751", "Harry Potter et la chambre des secrets", "J.K. Rowling", "Gallimard Jeunesse", "FR", 8.99),
      ];
    
    const users = [
        new User({
            id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
            lastName: "Doe",
            firstName: "John",
            birthDate: "1990-01-01",
            address: "1 rue de la paix",
            phone: "0606060606",
            email: "johndoe@outlook.fr"
        }),
        new User({
            id: "adf0df14-3833-4e33-b665-6639a125d548",
            lastName: "Doe",
            firstName: "Jane",
            birthDate: "1990-01-01",
            address: "1 rue de la paix",
            phone: "0606060606",
            email: "janedoe@outlook.fr"
        })
    ]

    const bookings = [
        new Booking({
            id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
            rentDate: "2023-01-01",
            returnDate: "2023-01-07",
            item: {
                title: "Harry Potter et la coupe de feu",
                isbn13: "9782070416768",
                authors: "J.K. Rowling",
                editor: "Gallimard Jeunesse",
                langCode: "FR",
                price: 8.99
            },
            user: {
                id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
                lastName: "Doe",
                firstName: "John",
                birthDate: "1990-01-01",
                address: "1 rue de la paix",
                phone: "0606060606",
                email: "johndoe@outlook.fr",
            }
        }),
        new Booking({
            id: "adf0df14-3833-4e33-b665-6639a125d548",
            rentDate: "2023-04-18",
            returnDate: "2023-04-25",
            item: {
                title: "Harry Potter et la coupe de feu",
                isbn13: "9782070416768",
                authors: "J.K. Rowling",
                editor: "Gallimard Jeunesse",
                langCode: "FR",
                price: 8.99
            },
            user: {
                id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
                lastName: "Doe",
                firstName: "John",
                birthDate: "1990-01-01",
                address: "1 rue de la paix",
                phone: "0606060606",
                email: "johndoe@outlook.fr",
            }
        }),
        new Booking({
            id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
            rentDate: "2023-01-01",
            returnDate: "2023-01-07",
            item: {
                title: "Harry Potter et la chambre des secrets",
                isbn13: "9782070416751",
                authors: "J.K. Rowling",
                editor: "Gallimard Jeunesse",
                langCode: "FR",
                price: 8.99
            },
            user: {
                id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
                lastName: "Doe",
                firstName: "John",
                birthDate: "1990-01-01",
                address: "1 rue de la paix",
                phone: "0606060606",
                email: "johndoe@outlook.fr",
            }
        })
    ]

    const listBookings = () => {
        return bookings;
    }


    
    const createBooking = (booking) => {

        if (Math.abs(DateTime.fromISO(booking.rentDate).diffNow('days').values.days) > 1) {
            
            return {
                error: "The rent date must be after today"
            }
        }
       
        //check if the rent date is before the return date
        if (DateTime.fromISO(booking.rentDate).diff(DateTime.fromISO(booking.returnDate), 'days').days > 0) {
            return {
                error: "The rent date must be before the return date"
            }
        }

        // check if the user doesn't exist
        if(!users.find(user => user.id === booking.user.id)) {
            return {
                error: "The user doesn't exist"
            }
        }

        // check if the book doesn't exist
        if(!books.find(book => book.isbn13 === booking.item.isbn13)) {
            return {
                error: "The book doesn't exist"
            }
        }

        // check if the book is already booked
        if(bookings.find(b => b.item.isbn13 === booking.item.isbn13 && DateTime.fromISO(b.rentDate) <= DateTime.fromISO(booking.returnDate) && DateTime.fromISO(b.returnDate) >= DateTime.fromISO(booking.rentDate))) {
            return {
                error: "The book is already booked"
            }
        }

        const bookingWithUuid = {
            id: uuidv4(),
            rentDate: booking.rentDate,
            returnDate: booking.returnDate,
            item: {
                title: booking.item.title,
                isbn13: booking.item.isbn13,
                authors: booking.item.authors,
                editor: booking.item.editor,
                langCode: booking.item.langCode,
                price: booking.item.price
            },
            user: {
                id: booking.user.id,
                lastName: booking.user.lastName,
                firstName: booking.user.firstName,
                birthDate: booking.user.birthDate,
                address: booking.user.address,
                phone: booking.user.phone,
                email: booking.user.email,
            }
        }
        bookings.push(bookingWithUuid);
        return bookingWithUuid;
    }

    const findBookingByID = (id) => {
        
        return bookings.find(booking => booking.id === id);
    }

    const findBookingsByUser = (userID) => {
        return bookings.filter(booking => booking.user.id === userID);
     
    }


    return {
        listBookings,
        createBooking,
        findBookingByID,
        findBookingsByUser
    }

}