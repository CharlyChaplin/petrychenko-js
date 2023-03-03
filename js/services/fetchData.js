import { port } from './index';

export default async function fetchData(api, method, bodyData) {
	const url = `http://localhost:${port}/${api}`;
	let resp;
	if (method && method.toLowerCase() === "post") {
		resp = await fetch(url, {
			method: "POST",
			headers: { "Content-type": "application/json; charset=utf-8" },
			body: bodyData
		})
	} else {
		resp = await fetch(url);
	}

	if (resp.ok) {
		return await resp.json();
	} else {
		throw new Error(`${resp.status} + " " + ${resp.statusText} + "(" + ${resp.url} + ")"`);
	}
};