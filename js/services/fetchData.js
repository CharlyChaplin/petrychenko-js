export default async function getResource(url) {
	const req = await fetch(url);
	if (req.ok) {
		return await req.json();
	} else {
		throw new Error(`${req.status} + " " + ${req.statusText} + "(" + ${req.url} + ")"`);
	}
};