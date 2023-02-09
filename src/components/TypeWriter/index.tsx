import { useState, useEffect } from 'react';
import './styles.css';

const TypeWriter = ({ stationName }) => {
	const [text, setText] = useState('');
	const elipsis = 'is in...';

	const sleep = (ms) => {
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
			The next tram from <span className='text-gradient'>Bury</span> <br /> to{' '}
			<span className='text-gradient'>St. Peter's Square</span> {text}
		</h1>
	);
};

export default TypeWriter;
