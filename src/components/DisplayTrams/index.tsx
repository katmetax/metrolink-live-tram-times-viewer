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
					{data.map((tram: ITram) => (
						<>
							{tram[`Dest${0}`] && (
								<tr key={`${tram.Id + 0}`}>
									<th scope='row'>{tram[`Dest${0}`]}</th>
									<td>{tram[`Wait${0}`]} minutes</td>
									<td>{tram[`Status${0}`]}</td>
									<td>{tram[`Carriages${0}`]}</td>
								</tr>
							)}

							{tram[`Dest${1}`] && (
								<tr key={`${tram.Id + 1}`}>
									<th scope='row'>{tram[`Dest${1}`]}</th>
									<td>{tram[`Wait${1}`]} minutes</td>
									<td>{tram[`Status${1}`]}</td>
									<td>{tram[`Carriages${1}`]}</td>
								</tr>
							)}

							{tram[`Dest${2}`] && (
								<tr key={`${tram.Id + 2}`}>
									<th scope='row'>{tram[`Dest${2}`]}</th>
									<td>{tram[`Wait${2}`]} minutes</td>
									<td>{tram[`Status${2}`]}</td>
									<td>{tram[`Carriages${2}`]}</td>
								</tr>
							)}

							{tram[`Dest${3}`] && (
								<tr key={`${tram.Id + 3}`}>
									<th scope='row'>{tram[`Dest${3}`]}</th>
									<td>{tram[`Wait${3}`]} minutes</td>
									<td>{tram[`Status${3}`]}</td>
									<td>{tram[`Carriages${3}`]}</td>
								</tr>
							)}
						</>
					))}
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
