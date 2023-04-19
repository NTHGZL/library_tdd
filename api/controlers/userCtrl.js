
export default (userRepo) => {
    const listUsers = (_, res) => {
        res.send({
            data: userRepo.listUsers()
        });
    };

    const createUser = (req, res) => {
        const user = userRepo.createUser(req.body);

        res.status(201).send({
            data: user
        });
    }

    const getUser = (req, res) => {
        const id = req.params.id;
        const user = userRepo.findUser(id);

        if (user) {
            return res.send({
                data: user
            });
        }

        res.status(404).send({
            error: `User ${id} not found`
        });
    }

    const updateUser = (req, res) => {
        const id = req.params.id;
        const user = userRepo.updateUser(id, req.body);

        if (user) {
            return res.status(200).send({
                data: user
            });
        }

        res.status(404).send({
            error: `User ${id} not found`
        });
    }


    const deleteUser = (req, res) => {
        const id = req.params.id;
        const user = userRepo.deleteUser(id);

        if (user) {
            return res.status(200).send({
                meta: {
                    _deleted: user
                }
            });
        }

        res.status(404).send({
            error: `User ${id} not found`
        });
    }

    
    
    return {
        listUsers,
        createUser,
        getUser,
        updateUser,
        deleteUser
    };
}