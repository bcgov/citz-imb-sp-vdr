import {
    FormControl, FormHelperText,
    FormLabel, Switch
} from '@material-ui/core';
import { Field } from 'formik';
import React from 'react';

export const SwitchFormikControl = (props) => {
    const { label, name, required, options, initialvalue, ...rest } = props;

    return (
        <Field name={name}>
            {({ field, form }) => {
                return (
                    <FormControl
                        error={form.errors[name] && form.touched[name]}
                        required={required}>
                        <FormLabel htmlFor={name}>{label}</FormLabel>
                        <Switch id={name} {...rest}  {...field} defaultChecked={form.initialValues[name]} />
                        <FormHelperText>{form.errors[name]}</FormHelperText>
                    </FormControl>
                );
            }}
        </Field>
    );
};
