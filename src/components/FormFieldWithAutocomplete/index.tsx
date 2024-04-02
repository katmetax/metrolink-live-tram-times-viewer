import { useState } from 'react';
import { Autocomplete } from '../Autocomplete';
import { FormField } from '../FormField';
import json from '../../data/tramStops.json';

export interface Props {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
}

const tramStops = json;

export const FormFieldWithAutocomplete = ({
  label,
  name,
  placeholder,
  required,
}: Props) => {
  const [autocompleteResults, setAutocompleteResults] = useState<
    [string, string][] | []
  >([]);

  const changeHandler = (inputVal: string) => {
    const results = Object.entries(tramStops).filter(([_, value]) =>
      value.toLowerCase().match(inputVal.toLowerCase())
    );

    if (inputVal.length > 1) {
      setAutocompleteResults(results);
    } else {
      setAutocompleteResults([]);
    }
  };

  return (
    <>
      <FormField
        label={label}
        id={`${name}-copy`}
        placeholder={placeholder}
        required={required}
        changeHandler={changeHandler}
      />
      <FormField name={name} id={name} hidden />
      <Autocomplete options={autocompleteResults} />
    </>
  );
};
