export const base = "/api";

export function buildApiUrl(url) {
	return `${base}/${url}`;
}
