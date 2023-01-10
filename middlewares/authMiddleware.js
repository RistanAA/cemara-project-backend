const jwt = require('jsonwebtoken');
const User  = require('../schemas/user');
const JWT_SECRET_KEY = 'cemara';

module.exports = async (req, res, next) => {
	try {
		const { authorization } = req.headers
		const [authType, authToken] = (authorization || '').split(' ')
		
		if (!authToken || authType !== 'Bearer') {
			return res.status(400).send({ errorMessage: 'You are not logged in' })
		}

		try {
			const dataUser = jwt.verify(authToken, JWT_SECRET_KEY)
			// return res.send(dataUser.user._id)
			const user = await User.findOne({userId:dataUser.userId})
			// console.log(user)
			if (!user) {
				return res.status(401).send({ errorMessage: 'User not found' })
			}
			res.locals.user = {
				email: user.email,
				namaLembaga: user.namaLembaga
			}
			next()
		}
		catch (e) {
			res.status(401).send({ errorMessage: 'Login Please!' })
		}
	} catch (error) {
		return res.status(400).send({
			errorMessage: error.message
		});
	}
}