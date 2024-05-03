/** @format */

const { generateSignature } = require("./utils/index");

require("dotenv").config();

const generateToken = (req, res, next) => {
	try {
		const { topic, password, userId, sessionKey, roleType } = req.body;

		const CLIENT_ID = process.env.CLIENT_ID;
		const CLIENT_SECRET = process.env.CLIENT_SECRET;

		const token = generateSignature(
			CLIENT_ID,
			CLIENT_SECRET,
			topic,
			roleType,
			sessionKey,
			userId
		);

		res.locals.token = token;

		next();
	} catch (error) {
		next({ error });
	}
};

module.exports = {
	generateToken,
};
