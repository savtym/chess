import config from '../config';


// export const authorize = async (user, password) => {
// 	try {
// 		const body = JSON.stringify({
// 			"email": "savtym@gmail.com",
// 			"password": "qwerty123"
// 		});
// 		console.log(config)
//
// 		const response = await fetch(config.apiDomain + "/api/v1/user/signin", {
// 			method: 'POST',
// 			body: JSON.stringify({
// 				"email": "savtym@gmail.com",
// 				"password": "qwerty123"
// 			}),
// 			headers: new Headers({
// 				'Content-Type': 'application/json'
// 			})
// 		});
//
// 		return await response.json()
//
// 	} catch (error) {
// 		console.log("!ERROR", error)
// 	}
// };

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