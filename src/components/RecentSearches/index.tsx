import { useEffect, useState } from 'react';
import json from '../../data/tramStops.json';

import './styles.css';

const tramStops = json;

export const RecentSearches = () => {
	const [tramSearches, setTramSearches] = useState([]);

	useEffect(() => {
		const storedTramSearches = localStorage.getItem('recentTramSearches');

		if (storedTramSearches) setTramSearches(JSON.parse(storedTramSearches));
	}, []);

	if (tramSearches.length === 0) return null;

	return (
		<div className='recent-searches'>
			Your recent searches: <br />
			{tramSearches.map((tramStop, i) => {
				const prettyDepartureStation =
					tramStops[tramStop as keyof typeof tramStops];

				return (
					<a
						key={`${tramStop}-${i}`}
						className='recent-tram-stop'
						href={`/trams?departingFrom=${tramStop}`}
					>
						{prettyDepartureStation}
					</a>
				);
			})}
		</div>
	);
};
