import type { APIRoute } from 'astro';

export const get: APIRoute = async ({ request }) => {
	const url = new URL(request.url);
	const params = new URLSearchParams(url.search);
	const departingFrom = params.get('departingFrom');
	const arrivingTo = params.get('arrivingTo');

	const recaptchaURL = `https://api.tfgm.com/odata/Metrolinks?$filter=StationLocation%20eq%20'${departingFrom}'`;

	const response = await fetch(recaptchaURL, {
		method: 'GET',
		headers: {
			'Ocp-Apim-Subscription-Key': import.meta.env.TFGM_SUBSCRIPTION_KEY,
		},
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const responseData = await response.json();

	return new Response(JSON.stringify(responseData.value), { status: 200 });
};
