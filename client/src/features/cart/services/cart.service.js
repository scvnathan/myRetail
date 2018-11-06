import {buildApiUrl} from '~root/api/config';

export default {
	addToCart: async (id, quantity) => {
		const resp = await fetch(buildApiUrl(`cart/save`), {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({id, quantity})
		})

		let data = resp.json();
		if (data.error) {
			throw new Error(data.error);
		}

	},

	fetchCurrentCart: async (id) => {
		return new Promise((resolve, reject) => {
			resolve({});
		})
	}
}