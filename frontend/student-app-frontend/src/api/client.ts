// Main API URL
const BASE_URL = 'http://localhost:8080/api';

export function baseUrl(path: string): string {
	return `${BASE_URL}${path}`;
}

export async function ensureOk(
	response: Response,
	doing: string,
): Promise<void> {
	if (!response.ok) {
		throw new Error(
			`Failed to ${doing}: the server responded with ` +
				`${response.status} ${response.statusText}. ` +
				`Check the docker and Spring Boot connections.`,
		);
	}
}

export async function fetchJson<T>(
	url: string,
	doing: string,
	init?: RequestInit,
): Promise<T> {
	const response = await fetch(url, {
		headers: { 'Content-Type': 'application/json' },
		...init,
	});
	await ensureOk(response, doing);
	return response.json() as Promise<T>;
}
