import React, { useState } from 'react';
import TextField from './TextField';
import SelectField from './SelectField';
import CheckboxField from './CheckboxField';
import RadioField from './RadioField';
import TextAreaField from './TextAreaField';
import AutocompleteField from './Autocomplete';
import Button from '@mui/material/Button';

const genderOptions = [
	{ value: 'male', label: 'Male' },
	{ value: 'female', label: 'Female' },
	{ value: 'other', label: 'Other' },
];

const countryOptions = [
	{ value: 'us', label: 'United States' },
	{ value: 'in', label: 'India' },
	{ value: 'uk', label: 'United Kingdom' },
	{ value: 'ca', label: 'Canada' },
];

const skillsOptions = [
	{ value: 'js', label: 'JavaScript' },
	{ value: 'ts', label: 'TypeScript' },
	{ value: 'react', label: 'React' },
	{ value: 'node', label: 'Node.js' },
];

const Form: React.FC = () => {
	const [formValues, setFormValues] = useState({
		name: '',
		email: '',
		age: '',
		gender: '',
		country: '',
		bio: '',
		agree: false,
		skill: '',
	});

	const [formErrors, setFormErrors] = useState({
		name: '',
		email: '',
		age: '',
		gender: '',
		country: '',
		bio: '',
		agree: '',
		skill: '',
	});

	const validate = (values: typeof formValues) => {
		const errors: typeof formErrors = {
			name: '',
			email: '',
			age: '',
			gender: '',
			country: '',
			bio: '',
			agree: '',
			skill: '',
		};
		if (!values.name) errors.name = 'Name is required';
		else if (values.name.length > 30) errors.name = 'Name must be at most 30 characters';
		if (!values.email) errors.email = 'Email is required';
		else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) errors.email = 'Invalid email';
		else if (values.email.length > 50) errors.email = 'Email must be at most 50 characters';
		if (!values.age) errors.age = 'Age is required';
		else if (isNaN(Number(values.age)) || Number(values.age) < 1) errors.age = 'Invalid age';
		if (!values.gender) errors.gender = 'Gender is required';
		if (!values.country) errors.country = 'Country is required';
		if (!values.bio) errors.bio = 'Bio is required';
		else if (values.bio.length > 5) errors.bio = 'Bio must be at most 200 characters';
		if (!values.agree) errors.agree = 'You must agree to the terms';
		if (!values.skill) errors.skill = 'Skill is required';
		return errors;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type, checked } = e.target;
		setFormValues((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
		setFormErrors((prev) => ({
			...prev,
			[name]: '',
		}));
	};

	const handleSelectChange = (e: any) => {
		setFormValues((prev) => ({ ...prev, country: e.target.value }));
		setFormErrors((prev) => ({ ...prev, country: '' }));
	};

	const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormValues((prev) => ({ ...prev, gender: e.target.value }));
		setFormErrors((prev) => ({ ...prev, gender: '' }));
	};

	const handleAutocompleteChange = (event: React.SyntheticEvent, value: string | null) => {
		setFormValues((prev) => ({ ...prev, skill: value || '' }));
		setFormErrors((prev) => ({ ...prev, skill: '' }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const errors = validate(formValues);
		setFormErrors(errors);
		const hasError = Object.values(errors).some((err) => err);
		if (!hasError) {
			alert('Form submitted successfully!');
		}
	};

	return (
		<div>
			<h2>User Form</h2>
			<form onSubmit={handleSubmit} noValidate>
				<TextField
					label="Name"
					name="name"
					variant="outlined"
					value={formValues.name}
					onChange={handleChange}
					error={!!formErrors.name}
					helperText={formErrors.name}
				/>
				<TextField
					label="Email"
					name="email"
					variant="outlined"
					value={formValues.email}
					onChange={handleChange}
					type="email"
					error={!!formErrors.email}
					helperText={formErrors.email}
				/>
				<TextField
					label="Age"
					name="age"
					variant="outlined"
					value={formValues.age}
					onChange={handleChange}
					type="number"
					error={!!formErrors.age}
					helperText={formErrors.age}
				/>
				<div style={{ marginBottom: 16 }}>
					Gender:
					{genderOptions.map((opt) => (
						<RadioField
							key={opt.value}
							label={opt.label}
							name="gender"
							value={opt.value}
							checked={formValues.gender === opt.value}
							onChange={handleRadioChange}
							disabled={false}
							color="error"
							size="small"
							// row={false}
							error={!!formErrors.gender}
							helperText={formErrors.gender && opt.value === genderOptions[genderOptions.length - 1].value ? formErrors.gender : ''}
						/>
					))}
				</div>
				<SelectField
					label="Country"
					name="country"
					value={formValues.country}
					onChange={handleSelectChange}
					options={countryOptions}
					error={!!formErrors.country}
					helperText={formErrors.country}
				/>
				<AutocompleteField
					label="Skill"
					options={skillsOptions}
					value={formValues.skill}
					onChange={handleAutocompleteChange}
					error={!!formErrors.skill}
					helperText={formErrors.skill}
				/>
				<TextAreaField
					label="Bio"
					name="bio"
					minRows={4}
					variant="outlined"
					value={formValues.bio}
					onChange={handleChange}
					error={!!formErrors.bio}
					helperText={formErrors.bio}
				/>
				<CheckboxField
					label="I agree to the terms and conditions"
					name="agree"
					checked={formValues.agree}
					onChange={handleChange}
					disabled={false}
					color="success"
					size="small"
					error={!!formErrors.agree}
					helperText={formErrors.agree}
				/>
				<Button variant="outlined" sx={{ mt: 2 }} type="submit">Submit</Button>
			</form>
			<pre>{JSON.stringify(formValues, null, 2)}</pre>
		</div>
	);
};

export default Form;
