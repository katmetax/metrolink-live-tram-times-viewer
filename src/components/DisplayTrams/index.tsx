import { useEffect, useState } from 'react';
import TypeWriter from '../TypeWriter';

import './styles.css';

interface Props {
	departureStation: string;
	arrivalStation: string;
}

interface ITram {
	Id: number;
	MessageBoard: string;
	[key: string]: string | number;
}

export const DisplayTrams = ({ departureStation, arrivalStation }: Props) => {
	const [data, setData] = useState<ITram[] | null>(null);

	useEffect(() => {
		const getTramData = async () => {
			const response = await fetch(
				`/getTrams?departingFrom=${departureStation}&arrivingTo=${arrivalStation}`
			);
			const tramData = await response.json();
			setData(tramData);
		};

		getTramData().catch(console.error);
	}, []);

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
					{data.map((tram: ITram) => {
						let n = 0;

						// There are always a maximum of 3 trams returned per tram station
						while (n < 3) {
							if (!!tram[`Dest${n}`]) {
								return (
									<tr key={`${tram.Id + n}`}>
										<th scope='row'>{tram[`Dest${n}`]}</th>
										<td>{tram[`Wait${n}`]} minutes</td>
										<td>{tram[`Status${n}`]}</td>
										<td>{tram[`Carriages${n}`]}</td>
									</tr>
								);
							}
							n++;
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
