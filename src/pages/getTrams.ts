import type { APIRoute } from 'astro';

type Data = Array<{ [k: string]: string }>;

export const get: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const departingFrom = params.get('departingFrom');

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

  const { value } = await response.json();

  // Some stations have duplicated station data for some reason (e.g. St. Peter's Square)
  const getUniqueStations = (data: Data, key: string) => [
    ...new Map(data.map((item) => [item[key], item])).values(),
  ];

  // Filter out any destinations with empty values
  const getPopulatedData = (data: Data) =>
    data.map((tram) =>
      Object.fromEntries(
        Object.entries(tram).filter(([_key, value]) => !!value)
      )
    );

  const getNormalisedData = (data: Data) => {
    const uniqueStations = getUniqueStations(data, 'AtcoCode');
    const populatedData = getPopulatedData(uniqueStations);

    return JSON.stringify(populatedData);
  };

  return new Response(getNormalisedData(value), { status: 200 });
};
