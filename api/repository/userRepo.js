
import { v4 as uuidv4 } from "uuid";

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

    const createUser = (user) => {

       
        const userWithUuid = {
            id: uuidv4(),
            lastName: user.lastName,
            firstName: user.firstName,
            birthDate: user.birthDate,
            address: user.address,
            phone: user.phone,
            email: user.email
        }

        const userWithoutUuid = {
            lastName: user.lastName,
            firstName: user.firstName,
            birthDate: user.birthDate,
            address: user.address,
            phone: user.phone,
            email: user.email
        }
        users.push(userWithUuid);
        return userWithoutUuid;
    }

    const findUser = (id) => {
        return users.find(user => user.id === id);
    }

    const updateUser = (id, user) => {
        const userIndex = users.findIndex(user => user.id === id);
        if(userIndex >= 0) {

            const userToUpdate = users[userIndex];
            userToUpdate.lastName = user.lastName;
            userToUpdate.firstName = user.firstName;
            userToUpdate.birthDate = user.birthDate;
            userToUpdate.address = user.address;
            userToUpdate.phone = user.phone;
            userToUpdate.email = user.email;

            return userToUpdate;
        }

        return null;
    }

    const deleteUser = (id) => {
        const userIndex = users.findIndex(user => user.id === id);
        if(userIndex >= 0) {
            const userToDelete = users.splice(userIndex, 1)[0];

            return userToDelete
        }

        return null;
    }



    return {
        listUsers,
        createUser,
        findUser,
        updateUser,
        deleteUser
    }
}
