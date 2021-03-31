import {
	FormControl,
	FormHelperText,
	FormLabel,
	TextareaAutosize,
} from '@material-ui/core';
import { Field } from 'formik';
import React from 'react';

export const TextAreaFormikControl = (props) => {
	const { label, name, required, ...rest } = props;
	return (
		<Field name={name}>
			{({ field, form }) => {
				return (
					<FormControl
						error={form.errors[name] && form.touched[name]}
						required={required}>
						<FormLabel htmlFor={name}>{label}</FormLabel>
						<TextareaAutosize
							id={name}
							rowsMin={3}
							cols={22}
							{...rest}
							{...field}
						/>
						<FormHelperText>{form.errors[name]}</FormHelperText>
					</FormControl>
				);
			}}
		</Field>
	);
};
