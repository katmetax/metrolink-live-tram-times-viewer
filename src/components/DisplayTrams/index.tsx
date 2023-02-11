import { useEffect, useState } from 'react';
import TypeWriter from '../TypeWriter';

import './styles.css';

interface ITram {
	Id: number;
	MessageBoard: string;
	[key: string]: string | number;
}

export const DisplayTrams = () => {
	const [data, setData] = useState<ITram[] | null>(null);
	const [departureStation, setDepartureStation] = useState('');
	const [arrivalStation, setArrivalStation] = useState('');

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const departingFrom = params.get('departingFrom')?.toLowerCase();
		const arrivingTo = params.get('arrivingTo')?.toLowerCase();

		setDepartureStation(departingFrom || '');
		setArrivalStation(arrivingTo || '');
	}, []);

	useEffect(() => {
		const getTramData = async () => {
			const response = await fetch(
				`/getTrams?departingFrom=${departureStation}&arrivingTo=${arrivalStation}`
			);
			const tramData = await response.json();
			setData(tramData);
		};

		getTramData().catch(console.error);
	}, [departureStation, arrivalStation]);

	if (!data) {
		return (
			<div className='grid'>
				<TypeWriter
					departureStation={departureStation}
					arrivalStation={arrivalStation}
				/>
			</div>
		);
	}

	return (
		<>
			<h2>
				The next trams from{' '}
				<span className='station-name'>{departureStation}</span> are:
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
					{data.map((tram: ITram, index: number) => {
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
