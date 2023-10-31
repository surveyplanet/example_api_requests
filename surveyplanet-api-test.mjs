import https from 'https';
import querystring from 'querystring';

const API_HOST = 'api.surveyplanet.com';

const CLIENT_ID = process.argv[2];
const CLIENT_SECRET = process.argv[3];

if (!CLIENT_ID || !CLIENT_SECRET) {
	console.log('Usage: node script.js <client_id> <client_secret>');
	process.exit(1);
}

const getAuthToken = async () => {

	const AUTH = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`)
		.toString( 'base64' );

	const options = {
		hostname: API_HOST,
		path: '/oauth/token',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Accept: 'application/json',
			Authorization: `Basic ${AUTH}`,
		},
	};

	return new Promise((resolve, reject) => {
		const req = https.request(options, (res) => {
			let data = '';

			res.on('data', (chunk) => {
				data += chunk;
			});

			res.on('end', () => {
				const AUTH_RES_JSON = JSON.parse(data);

				if (
					!AUTH_RES_JSON ||
					!AUTH_RES_JSON.data ||
					!AUTH_RES_JSON.data.access_token ||
					!AUTH_RES_JSON.data.access_token.length
				) {
					return reject(new Error('Cannot get auth token'));
				}

				return resolve(AUTH_RES_JSON.data.access_token);
			});
		});

		req.on('error', (error) => {
			return reject(error);
		});

		req.write(querystring.stringify({ grant_type: 'client_credentials' }));
		req.end();
	});
}

const getUserData = async (token) => {

	const options = {
		hostname: API_HOST,
		path: '/v1/user',
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	return new Promise((resolve, reject) => {
		const req = https.request(options, (res) => {
			let data = '';

			res.on('data', (chunk) => {
				data += chunk;
			});

			res.on('end', () => {
				return resolve(JSON.parse(data));
			});
		});

		req.on('error', (error) => {
			return reject(error);
		});

		req.end();
	});
}


( async () => {
	const token = await getAuthToken();
	const userData = await getUserData(token);
	return userData;
})()
.then( (result) => {
	console.log(result);
	process.exit(0);
})
.catch( (e) => {
	console.error(e);
	process.exit(1);
})
