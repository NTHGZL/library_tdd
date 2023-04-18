
export default (User) => {
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

    const listUsers = () => {
        return users;
    }

    return {
        listUsers
    }
}
