import config from '../config';

export const createSocket = async (token) => {
	try {
		await fetch(config.apiDomain + "/api/v1/socket", {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			})
		})

	} catch (error) {
		console.log("!ERROR", error)
	}
};
