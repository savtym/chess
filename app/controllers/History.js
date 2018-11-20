const db = require('../db');
const User = require('./User');

const {
	GET_ALL_HISTORY,
} = require('../db/history');


/**
 * Manipulate game of state
 * */
class History {

	/**
	 *  Get all history by user
	 *  @param {string} token: token for authorization
	 * */
	static async getAllHistoryByUsers({ token }) {
		let per = await User.permissionsToken(token);
		if (per.status) return per;

		const { err, rows } = await db.query(GET_ALL_HISTORY, [per.id]);

		if (err) {
			return {
				err: err.message,
				status: 400,
			}
		}

		return {
			data: rows,
			status: 201,
		}
	}
}


module.exports = History;