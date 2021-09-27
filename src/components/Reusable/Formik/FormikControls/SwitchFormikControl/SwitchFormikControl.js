import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    Switch
} from '@material-ui/core';
import { Field } from 'formik';
import React from 'react';

export const SwitchFormikControl = (props) => {
    const { label, name, required, options, ...rest } = props;
    console.log(`props`, props)
    return (
        <Field name={name}>
            {({ field, form }) => {
                return (
                    <FormControl
                        error={form.errors[name] && form.touched[name]}
                        required={required}>
                        <FormLabel htmlFor={name}>{label}</FormLabel>
                        <Switch id={name} {...rest} />
                        <FormHelperText>{form.errors[name]}</FormHelperText>
                    </FormControl>
                );
            }}
        </Field>
    );
};
