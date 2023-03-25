import './styles.css';

export interface Props {
	label?: string;
	name?: string;
	id?: string;
	placeholder?: string;
	changeHandler?: (value: string) => void;
	required?: boolean;
	hidden?: boolean;
}

export const FormField = ({
	label,
	name,
	id,
	placeholder,
	required,
	changeHandler = () => {},
	hidden = false,
}: Props) => {
	return (
		<div className={`input-field ${hidden ? 'hidden' : ''}`}>
			<label htmlFor={name}>
				{label}
				<input
					type='text'
					id={id}
					name={name}
					placeholder={placeholder}
					required={required}
					onChange={(e) => changeHandler(e.target.value)}
				/>
			</label>
		</div>
	);
};
