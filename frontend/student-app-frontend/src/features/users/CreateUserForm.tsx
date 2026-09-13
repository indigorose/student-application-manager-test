import { useState } from 'react';
import type { Role, User } from '../../types/user';
import { api } from '../../api/usersApi';
import {
	Input,
	NativeSelect,
	Button,
	Fieldset,
	Stack,
	Field,
} from '@chakra-ui/react';
import { PasswordInput } from '@/components/ui/password-input';
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
			errors.password = 'This password is not strong enough';
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
		<>
			<form onSubmit={handleSubmit} className="userForm">
				<Fieldset.Root size="md" maxW="md" mb="20px">
					<Stack>
						<Fieldset.Legend>Create a User</Fieldset.Legend>
						<Fieldset.HelperText>
							Add another Admin, Tutor or Student to the database.
						</Fieldset.HelperText>
					</Stack>
					<Fieldset.Content>
						<Field.Root>
							<Field.Label>User Email</Field.Label>
							<Input
								value={email}
								placeholder="example@example.com"
								onChange={(event) => {
									setEmail(event.target.value);
									setErrors((prev) => ({
										...prev,
										email: undefined,
									}));
								}}
							/>
							{errors.email && (
								<Field.HelperText color="red">
									{errors.email}
								</Field.HelperText>
							)}
						</Field.Root>
						<Field.Root>
							<Field.Label>User Password</Field.Label>
							<PasswordInput
								value={password}
								placeholder="************"
								onChange={(event) => {
									setPassword(event.target.value);
									setErrors((prev) => ({
										...prev,
										password: undefined,
									}));
								}}
							/>
							{errors.password && (
								<Field.HelperText color="red">
									{errors.password}
									<ul>
										<li>At least 8 characters</li>
										<li>At least one uppercase letter</li>
										<li>At least one lowercase letter</li>
										<li>At least one number</li>
										<li>
											At least one special character
											(#?!@$%^&*-)
										</li>
									</ul>
								</Field.HelperText>
							)}
						</Field.Root>
						<Field.Root>
							<Field.Label>Role</Field.Label>
							<NativeSelect.Root width="320px">
								<NativeSelect.Field
									placeholder="Select a role"
									value={role}
									onChange={(event) =>
										setRole(
											event.target.value as User['role'],
										)
									}
								>
									<option value="ADMIN">Admin</option>
									<option value="STUDENT">Student</option>
									<option value="TUTOR">Tutor</option>
								</NativeSelect.Field>
							</NativeSelect.Root>
						</Field.Root>
					</Fieldset.Content>
					<Button
						mt="20px"
						alignSelf="flex-start"
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Adding…' : 'Add user'}
					</Button>
				</Fieldset.Root>
			</form>
		</>
	);
}

export default CreateUserForm;
