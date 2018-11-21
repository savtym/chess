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

		const data = rows.reduce((pr, row) => {
			if (!pr[row.game_id]) {
				pr[row.game_id] = {
					first_player: row.username,
					steps: [],
				};
			} else if (!pr[row.game_id].second_player) {
				pr[row.game_id].second_player = row.username;
			}

			pr[row.game_id].steps.push({
				id : row.id,
				time: row.time,
				state: row.state,
				give_up: row.give_up,
				username: row.username,
			});
			return pr;
		}, {});

		console.log({data})
		return {
			data,
			status: 201,
		}
	}
}


module.exports = History;