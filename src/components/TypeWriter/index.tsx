import { useState, useEffect } from 'react';
import './styles.css';

const TypeWriter = () => {
	const elipsis = 'is in...';

	const [text, setText] = useState('');

	useEffect(() => {
		const timeout = setTimeout(() => {
			setText(elipsis.slice(0, text.length + 1));
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
