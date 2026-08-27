import { useState } from 'react';
import type { Role, User } from '../../types/user';
import { api } from '../../api/usersApi';

interface CreateUserFormProps {
	onSubmitForm: () => void;
}

function CreateUserForm({ onSubmitForm }: CreateUserFormProps) {
	interface FormErrors {
		email?: string;
		password?: string;
		role?: Role;
	}

	function validate(email: string, password: string): FormErrors {
		const errors: FormErrors = {};
		const emailExpression: RegExp =
			/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		const passwordExpression: RegExp =
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
		if (email.trim() === '' || !emailExpression.test(email)) {
			errors.email = 'Email is required.';
		}
		if (!passwordExpression.test(password)) {
			errors.password = 'This password is not strong enough.';
		}
		return errors;
	}

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState<User['role']>('STUDENT');
	const [isActive, setIsActive] = useState(true);
	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		const nextErrors = validate(email, password);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) {
			return;
		}
		setIsSubmitting(true);
		try {
			await api.addUser({ email, password, role, isActive });
			setEmail('');
			setPassword('');
			setRole('STUDENT');
			setIsActive(true);
			onSubmitForm();
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				value={email}
				placeholder="example@example.com"
				onChange={(event) => {
					setEmail(event.target.value);
					setErrors((prev) => ({ ...prev, email: undefined }));
				}}
			/>
			{errors.email && <p className="error">{errors.email}</p>}
			<input
				value={password}
				placeholder="************"
				onChange={(event) => {
					setPassword(event.target.value);
					setErrors((prev) => ({ ...prev, password: undefined }));
				}}
			/>
			{errors.password && <p className="error">{errors.password}</p>}
			<select
				value={role}
				onChange={(event) =>
					setRole(event.target.value as User['role'])
				}
			>
				<option value="ADMIN">Admin</option>
				<option value="SPONSOR">Sponsor</option>
				<option value="STUDENT">Student</option>
				<option value="TUTOR">Tutor</option>
			</select>
			<button type="submit" disabled={isSubmitting}>
				{isSubmitting ? 'Adding…' : 'Add user'}
			</button>
		</form>
	);
}

export default CreateUserForm;
