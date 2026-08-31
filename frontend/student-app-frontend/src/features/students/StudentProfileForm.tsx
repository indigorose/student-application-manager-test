// Student profile creation
import { useState } from 'react';
import { api } from '../../api/studentApi';

interface StudentProfileFormProps {
	userId: number;
	onCreated: () => void;
}

function StudentProfileForm({ userId, onCreated }: StudentProfileFormProps) {
	interface FormErrors {
		firstName?: string;
		lastName?: string;
		dob?: string;
		phone?: string;
		address?: string;
	}
	function validate(
		firstName: string,
		lastName: string,
		dob: string,
		phone: string,
		address: string,
	): FormErrors {
		const errors: FormErrors = {};

		if (firstName.trim() === '') {
			errors.firstName = 'Please provide a first name';
		}
		if (lastName.trim() === '') {
			errors.lastName = 'Please provide a last name';
		}
		if (dob.trim() === '') {
			errors.dob = 'Please provide a dob';
		}
		if (phone.trim() === '' || phone.length > 11) {
			errors.phone = 'Please provide a phone number';
		}
		if (address.trim() === '') {
			errors.address = 'Please provide an address';
		}
		return errors;
	}

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [dob, setDob] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		const nextErrors = validate(firstName, lastName, dob, phone, address);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) {
			return;
		}
		setIsSubmitting(true);
		try {
			await api.addStudent(userId, {
				firstName,
				lastName,
				dob,
				phone,
				address,
			});
			setFirstName('');
			setLastName('');
			setDob('');
			setPhone('');
			setAddress('');
			onCreated();
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				value={firstName}
				placeholder="First Name"
				onChange={(event) => {
					setFirstName(event.target.value);
					setErrors((prev) => ({
						...prev,
						firstName: undefined,
					}));
				}}
			/>
			{errors.firstName && <p className="error">{errors.firstName}</p>}
			<input
				value={lastName}
				placeholder="Last Name"
				onChange={(event) => {
					setLastName(event.target.value);
					setErrors((prev) => ({
						...prev,
						lastName: undefined,
					}));
				}}
			/>
			{errors.lastName && <p className="error">{errors.lastName}</p>}
			<input
				value={dob}
				placeholder="Date of Birth"
				onChange={(event) => {
					setDob(event.target.value);
					setErrors((prev) => ({
						...prev,
						dob: undefined,
					}));
				}}
			/>
			{errors.dob && <p className="error">{errors.dob}</p>}
			<input
				value={phone}
				placeholder="xxx-xxxx-xxxx"
				onChange={(event) => {
					setPhone(event.target.value);
					setErrors((prev) => ({
						...prev,
						phone: undefined,
					}));
				}}
			/>
			{errors.phone && <p className="error">{errors.phone}</p>}
			<input
				value={address}
				placeholder="Address..."
				onChange={(event) => {
					setAddress(event.target.value);
					setErrors((prev) => ({
						...prev,
						address: undefined,
					}));
				}}
			/>
			{errors.address && <p className="error">{errors.address}</p>}
			<button type="submit" disabled={isSubmitting}>
				{isSubmitting ? 'Adding…' : 'Add student profile'}
			</button>
		</form>
	);
}

export default StudentProfileForm;
