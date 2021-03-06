import Maybe from 'maybe-baby';

const initialImagesState = {initial: 0, all: []};
/**
 * Gets the images for the current product. Combines primary image and alternate images
 *
 * @param {Object} state redux state
 * @return {Object} Object containing an array of all the images `all` and the initial image as an index into the array
 */
export function getImages(state) {
	let imageData = initialImagesState;
	const images = Maybe.of(() => state.product.data.Images[0]).orElse(false).join();
	if (!images) {
		return imageData;
	}
	let raw = state.product.data.Images[0];

	imageData.all = [raw.PrimaryImage[0].image].concat(raw.AlternateImages.map(o => o.image));
	imageData.initial = 0;
	return imageData;
}

const initialPriceState = {price: '', qualifier: ''}
/**
 * Gets pricing data for the current product
 *
 * @param {Object} state redux state
 * @return {Object} Pricing data object containing the pre-formatted price and potential qualifier
 */
export function getPrice(state) {
	const priceData = initialPriceState;
	priceData.price = Maybe.of(() => state.product.data.Offers[0].OfferPrice[0].formattedPriceValue).orElse(initialPriceState.price).join();
	priceData.qualifier = Maybe.of(() => state.product.data.Offers[0].OfferPrice[0].priceQualifier).orElse(initialPriceState.qualifier).join();
	return priceData;
}

const initialReviewsState = {all: [], topPro: {}, topCon: {}, total: 0, pages: 0, overallRating: 0};
/**
 * Gets customer review data for the current product
 *
 * @param {Object} state redux state
 * @return {Object} Object containing the list of reviews, top pro review, top con review, and meta data
 */
export function getReviews(state) {
	const allRreviewData = Maybe.of(() => state.product.data.CustomerReview[0]).orElse(false).join(); //"CustomerReview":{}
	if (!allRreviewData) {
		return initialReviewsState;
	}

	const reviewData = initialReviewsState;
	reviewData.topCon = Maybe.of(() => allRreviewData.Con[0]).orElse(initialReviewsState.topCon).join();
	reviewData.topPro = Maybe.of(() => allRreviewData.Pro[0]).orElse(initialReviewsState.topPro).join();
	reviewData.all = Maybe.of(() => allRreviewData.Reviews).orElse(initialReviewsState.all).join();
	reviewData.total = allRreviewData.totalReviews;
	reviewData.pages = allRreviewData.totalPages;
	reviewData.overallRating = parseInt(allRreviewData.consolidatedOverallRating, 10);
	return reviewData;
}

const initialDesc = {short: '', full: []};
/**
 * Gets descriptions for the current product
 *
 * @param {Object} state redux state
 * @return {Object} Object containg full and short descriptions
 */
export function getDescriptions(state) {
	const descriptions = initialDesc;
	descriptions.full = Maybe.of(() => state.product.data.ItemDescription[0].features).orElse([]).join();
	//strip out tags
	descriptions.full = descriptions.full.map(desc => desc.replace('<strong>', '').replace('<\/strong>', ''));

	descriptions.short = Maybe.of(() => state.product.data.shortDescription).orElse('').join();
	return descriptions;
}
/**
 * Gets promotions for the current product
 *
 * @param {Object} state redux state
 * @return {Array} Returns array of promotional data objects: descriptions, endDate, and startDate
 */
export function getPromotions(state) {
	const promos = Maybe.of(() => state.product.data.Promotions).orElse([]).join();
	if (promos.length === 0) {
		return promos;
	}
	return promos.map(p => {
		return {
			...p.Description[0],
			endDate: p.endDate,
			startDate: p.startDate
		}
	})

}

const returnPolicyState = {details: {}, copy: ''}
/**
 * Gets return policy data for current product
 *
 * @param {Object} state redux state
 * @return {Object} Object with legal copy and the fine print
 */
export function getReturnPolicy(state) {
	const policy = returnPolicyState;
	const rawReturnPolicy = state.product.data.ReturnPolicy;
	returnPolicyState.details = Maybe.of(() => rawReturnPolicy[0].ReturnPolicyDetails[0]).orElse(returnPolicyState.details).join();
	returnPolicyState.copy = Maybe.of(() => rawReturnPolicy[0].legalCopy).orElse(returnPolicyState.copy).join();

	return policy;
}

/**
 * Gets the purchasing channel code for the current product
 *
 * @param {Object} state redux state
 * @return {Number|null}
 */
export function getChannel(state) {
	return Maybe.of(() => parseInt(state.product.data.purchasingChannelCode, 10)).orElse(null).join();
}

/**
 * Gets the title for the current product
 *
 * @param {Object} state redux state
 * @return {String}
 */
export function getTitle(state) {
	return Maybe.of(() => state.product.data.title).orElse('').join();
}

/**
 * Gets the catalog entry id for the current product
 *
 * @param {Object} state redux state
 * @return {Number|null}
 */
export function getId(state) {
	return Maybe.of(() => parseInt(state.product.data.catEntryId, 10)).orElse(null).join();
}