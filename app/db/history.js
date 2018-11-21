module.exports = {

	GET_ALL_HISTORY: `
    SELECT 
    	h.id,
    	h.game_id,
    	h.player_id,
    	h.time,
    	h.state,
    	h.give_up,
    	u.username
    FROM
    	history AS h 
		JOIN 
			games AS g ON g.id = h.game_id
		JOIN 
			users AS u ON u.id = h.player_id
		WHERE 
			g.first_player_id = $1 OR g.second_player_id = $1;
	`,
};