export function berlinUhr(date = new Date()) {
	const minutes = date.getMinutes()
	const hours = date.getHours()
	return [
		date.getSeconds() % 2,
		hours / 5 | 0,
		hours % 5,
		minutes / 5 | 0,
		minutes % 5,
	]
}