import User from "../model/User";

export default (User) => {
    const users = [
        new User({
            id: "1",
            lastName: "Doe",
            firstName: "John",
            birthDate: "1990-01-01",
            address: "1 rue de la paix",
            phone: "0606060606",
            email: "johndoe@outlook.fr"
        }),
        new User({
            id: "2",
            lastName: "Doe",
            firstName: "Jane",
            birthDate: "1990-01-01",
            address: "1 rue de la paix",
            phone: "0606060606",
            email: "janedoe@outlook.fr"
        })
    ]

    listUsers = () => {
        return users;
    }
}
