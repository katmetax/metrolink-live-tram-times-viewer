import { useEffect, useState } from 'react';
import TypeWriter from '../TypeWriter';

import './styles.css';

export const DisplayTrams = () => {
	const [data, setData] = useState(null);
	const [stationName, setStationName] = useState('');

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const stationName = params.get('departingFrom')?.toLowerCase();

		setStationName(stationName || '');
	}, []);

	useEffect(() => {
		const getTramData = async () => {
			const response = await fetch(`/getTrams?stationName=${stationName}`);
			const tramData = await response.json();
			setData(tramData);
		};

		getTramData().catch(console.error);
	}, [stationName]);

	if (!data) {
		return (
			<div className='grid'>
				<TypeWriter stationName={stationName} />
			</div>
		);
	}

	return (
		<>
			<h2>
				Next tram times from <span className='station-name'>{stationName}</span>{' '}
				are:
			</h2>
			<table role='grid'>
				<thead>
					<tr>
						<th scope='col'>Destination</th>
						<th scope='col'>Wait</th>
						<th scope='col'>Status</th>
						<th scope='col'>Carriage</th>
					</tr>
				</thead>
				<tbody>
					{data.map((tram, index) => {
						if (tram[`Dest${index}`] !== '') {
							return (
								<tr key={`${tram.Id + index}`}>
									<th scope='row'>{tram[`Dest${index}`]}</th>
									<td>{tram[`Wait${index}`]} minutes</td>
									<td>{tram[`Status${index}`]}</td>
									<td>{tram[`Carriages${index}`]}</td>
								</tr>
							);
						}
					})}
				</tbody>
			</table>

			<div className='change-search-container'>
				<a href='/'>Want to search for a different tram stop?</a>
			</div>

			<h2>Message Board</h2>
			<span>{data[0]?.MessageBoard}</span>
		</>
	);
};
