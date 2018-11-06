import {buildApiUrl} from '~root/api/config';

export default {
	fetchProductDetails: async (id) => {
		// await new Promise((resolve, reject) => {
		// 	setTimeout(resolve, 10000);
		// });
		const productResp = await fetch(buildApiUrl(`product/${id}`));
		const productJson = await productResp.json();

		return productJson;
	}
}