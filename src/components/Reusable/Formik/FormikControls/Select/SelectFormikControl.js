import {
	FormControl,
	FormHelperText,
	FormLabel,
	MenuItem,
	Select,
} from '@material-ui/core';
import { Field } from 'formik';
import React from 'react';

export const SelectFormikControl = (props) => {
	const { label, name, required, options, ...rest } = props;
	return (
		<Field name={name}>
			{({ field, form }) => {
				return (
					<FormControl
						error={form.errors[name] && form.touched[name]}
						required={required}>
						<FormLabel htmlFor={name}>{label}</FormLabel>
						<Select
							id={name}
							variant={'outlined'}
							{...rest}
							{...field}>
							{options.map((option, index) => {
								return (
									<MenuItem
										key={`${name}_option_${index}`}
										value={option.value}>
										{option.key}
									</MenuItem>
								);
							})}
						</Select>
						<FormHelperText>{form.errors[name]}</FormHelperText>
					</FormControl>
				);
			}}
		</Field>
	);
};
