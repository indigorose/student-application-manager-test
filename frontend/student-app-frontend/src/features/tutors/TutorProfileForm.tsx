// Tutor profile creation
import { useState } from 'react';
import { tutorsApi } from '../../api/tutorApi';

import { Input, Button, Fieldset, Stack, Field } from '@chakra-ui/react';

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
			await tutorsApi.addTutor(userId, {
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
			<Fieldset.Root
				size="md"
				maxW="md"
				mb="20px"
				borderColor="red.400"
				borderWidth="1px"
			>
				<Stack>
					<Fieldset.Legend>Create a Tutor Profile</Fieldset.Legend>
					<Fieldset.HelperText>
						Add your name and department to gain Tutor Dashboard
						access.
					</Fieldset.HelperText>
				</Stack>
				<Fieldset.Content>
					<Field.Root>
						<Field.Label>First Name</Field.Label>
						<Input
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
						{errors.firstName && (
							<Field.HelperText color="red">
								{' '}
								{errors.firstName}
							</Field.HelperText>
						)}
					</Field.Root>
					<Field.Root>
						<Field.Label>Last Name</Field.Label>
						<Input
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
						{errors.lastName && (
							<Field.HelperText color="red">
								{errors.lastName}
							</Field.HelperText>
						)}
					</Field.Root>
					<Field.Root>
						<Field.Label>Department</Field.Label>
						<Input
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
						{errors.department && (
							<Field.HelperText color="red">
								{errors.department}
							</Field.HelperText>
						)}
					</Field.Root>
				</Fieldset.Content>{' '}
				<Button
					mt="20px"
					alignSelf="flex-start"
					type="submit"
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Adding…' : 'Add Tutor Profile'}
				</Button>
			</Fieldset.Root>
		</form>
	);
}

export default TutorProfileForm;
