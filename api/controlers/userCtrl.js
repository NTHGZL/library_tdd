
export default (userRepo) => {
    const listUsers = (_, res) => {
        res.send({
            data: userRepo.listUsers()
        });
    };

    
    
    return {
        listUsers,
    };
}