import dayjs from "dayjs";

export function formatDate(date, format = "MMMM DD, YYYY") {
	const m = dayjs(date);
	return m.format(format);
}
