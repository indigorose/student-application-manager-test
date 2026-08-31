// Tutor profile creation
import { useState } from 'react';
import { api } from '../../api/tutorApi';

interface TutorProfileFormProps {
	userId: number;
	onCreated: () => void;
}

function TutorProfileForm({ userId, onCreated }: TutorProfileFormProps) {
	interface FormErrors {
		firstName?: string;
		lastName?: string;
		department?: string;
	}
	function validate(
		firstName: string,
		lastName: string,
		department: string,
	): FormErrors {
		const errors: FormErrors = {};
		if (firstName.trim() === '') {
			errors.firstName = 'Please provide a first name';
		}
		if (lastName.trim() === '') {
			errors.lastName = 'Please provide a last name';
		}
		if (department.trim() === '') {
			errors.department = 'Please provide a department';
		}
		return errors;
	}

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [department, setDepartment] = useState('');
	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		const nextErrors = validate(firstName, lastName, department);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) {
			return;
		}
		setIsSubmitting(true);
		try {
			await api.addTutor(userId, {
				firstName,
				lastName,
				department,
			});
			setFirstName('');
			setLastName('');
			setDepartment('');
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
				value={department}
				placeholder="Department"
				onChange={(event) => {
					setDepartment(event.target.value);
					setErrors((prev) => ({
						...prev,
						dob: undefined,
					}));
				}}
			/>
			{errors.department && <p className="error">{errors.department}</p>}
			<button type="submit" disabled={isSubmitting}>
				{isSubmitting ? 'Adding…' : 'Add tutor profile'}
			</button>
		</form>
	);
}

export default TutorProfileForm;
