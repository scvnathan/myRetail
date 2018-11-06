import moment from "moment";

export function format(date) {
	const m = moment(date);
	return m.format("MMMM, dd, YYYY");
}
