// Student profile creation
import { useState } from 'react';
import { studentsApi } from '../../api/studentApi';
import type { Student } from '../../types/student';
import { Input, Button, Fieldset, Stack, Field } from '@chakra-ui/react';

interface StudentProfileFormProps {
	userId: number;
	existingStudent?: Student;
	onCreated: () => void;
}

function StudentProfileForm({
	userId,
	existingStudent,
	onCreated,
}: StudentProfileFormProps) {
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

	const [firstName, setFirstName] = useState(
		existingStudent?.firstName ?? '',
	);
	const [lastName, setLastName] = useState(existingStudent?.lastName ?? '');
	const [dob, setDob] = useState(existingStudent?.dob ?? '');
	const [phone, setPhone] = useState(existingStudent?.phone ?? '');
	const [address, setAddress] = useState(existingStudent?.address ?? '');
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
			if (existingStudent) {
				await studentsApi.updateStudent(userId, {
					firstName,
					lastName,
					dob,
					phone,
					address,
				});
			} else {
				await studentsApi.addStudent(userId, {
					firstName,
					lastName,
					dob,
					phone,
					address,
				});
			}
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
			<Fieldset.Root size="md" maxW="md" mb="20px">
				<Stack>
					<Fieldset.Legend>
						{!existingStudent ? 'Create a Student Profile' : ''}
					</Fieldset.Legend>
					<Fieldset.HelperText>
						{!existingStudent
							? 'Add your details to gain access to the student dashboard.'
							: 'Update your details below'}
					</Fieldset.HelperText>
				</Stack>
				<Fieldset.Content>
					<Field.Root>
						<Field.Label>First Name</Field.Label>
						<Input
							value={firstName}
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
						<Field.Label>Date of Birth</Field.Label>
						<Input
							value={dob}
							onChange={(event) => {
								setDob(event.target.value);
								setErrors((prev) => ({
									...prev,
									dob: undefined,
								}));
							}}
						/>
						{errors.dob && (
							<Field.HelperText color="red">
								{errors.dob}
							</Field.HelperText>
						)}
					</Field.Root>
					<Field.Root>
						<Field.Label>Phone</Field.Label>
						<Input
							value={phone}
							onChange={(event) => {
								setPhone(event.target.value);
								setErrors((prev) => ({
									...prev,
									phone: undefined,
								}));
							}}
						/>
						{errors.phone && (
							<Field.HelperText color="red">
								{errors.phone}
							</Field.HelperText>
						)}
					</Field.Root>
					<Field.Root>
						<Field.Label>Address</Field.Label>
						<Input
							value={address}
							onChange={(event) => {
								setAddress(event.target.value);
								setErrors((prev) => ({
									...prev,
									address: undefined,
								}));
							}}
						/>
						{errors.address && (
							<Field.HelperText className="error">
								{errors.address}
							</Field.HelperText>
						)}
					</Field.Root>
				</Fieldset.Content>
				<Button
					mt="20px"
					alignSelf="flex-start"
					type="submit"
					disabled={isSubmitting}
				>
					{isSubmitting || existingStudent
						? 'Save Changes'
						: 'Add Student Profile'}
				</Button>
			</Fieldset.Root>
		</form>
	);
}

export default StudentProfileForm;
