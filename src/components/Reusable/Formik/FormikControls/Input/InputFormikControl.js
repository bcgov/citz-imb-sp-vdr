import {
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
} from '@material-ui/core';
import { Field } from 'formik';
import React from 'react';

export const InputFormikControl = (props) => {
	const { label, name, required, ...rest } = props;

	return (
		<Field name={name}>
			{({ field, form }) => {
				return (
					<FormControl
						variant={'outlined'}
						error={form.errors[name] && form.touched[name]}
						required={required}>
						<FormLabel htmlFor={name}>{label}</FormLabel>
						<Input id={name} {...rest} {...field} />
						<FormHelperText>{form.errors[name]}</FormHelperText>
					</FormControl>
				);
			}}
		</Field>
	);
};
