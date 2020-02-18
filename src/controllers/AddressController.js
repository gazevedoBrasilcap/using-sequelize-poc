const { User, Address } = require('sequelize-poc');

module.exports = {
    async store(req, res, next) {

        const { user_id } = req.params
        const { zipcode, street, number } = req.body

        const user = await User.findByPk(user_id);

        if (!user){
            return res.status(400).json({ error : 'user not found' })
        }

        const address = await Address.create({zipcode, street, number, user_id})

        return res.json(address)
    },

    async list(req, res, next) {

        const { user_id } = req.params

        const user = await User.findByPk(user_id, {
            include : { association : 'addresses'}
        });

        if (!user){
            return res.status(400).json({ error : 'user not found' })
        }

        return res.json(user.addresses)
    }
}