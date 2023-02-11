import { useState, useEffect } from 'react';
import './styles.css';

interface Props {
	departureStation: string;
	arrivalStation: string;
}

const TypeWriter = ({ departureStation, arrivalStation }: Props) => {
	const [text, setText] = useState('');
	const elipsis = ' is in...';

	const sleep = (ms: number) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setText(elipsis.slice(0, text.length + 1));
			if (text === elipsis) {
				sleep(1000).then(() => {
					setText('');
				});
			}
		}, 100);
		return () => clearTimeout(timeout);
	}, [text]);

	return (
		<h1>
			The next tram from{' '}
			<span className='text-gradient station-name'>{departureStation}</span>
			{arrivalStation && (
				<>
					<br /> to{' '}
					<span className='text-gradient station-name'>{arrivalStation}</span>
				</>
			)}
			{text}
		</h1>
	);
};

export default TypeWriter;
