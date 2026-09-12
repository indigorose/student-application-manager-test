// Student application form
import { useState } from 'react';
import { studentApplicationsApi } from '../../api/studentApplicationApi';
import useApi from '@/hooks/useApi';
import { coursesApi } from '@/api/coursesApi';
import {
	NativeSelect,
	Fieldset,
	Stack,
	Field,
	Input,
	Button,
} from '@chakra-ui/react';

interface StudentApplicationFormProps {
	studentUserId: number;
	onCreated: () => void;
}

function StudentApplicationForm({
	studentUserId,
	onCreated,
}: StudentApplicationFormProps) {
	const { state: coursesState } = useApi(
		() => coursesApi.getAllCourses(),
		[],
	);
	interface FormErrors {
		personalStatement?: string;
		courseId?: string;
	}

	function validate(personalStatement: string): FormErrors {
		const errors: FormErrors = {};
		if (personalStatement.trim() === '') {
			errors.personalStatement = 'Please add a personal statement.';
		}
		if (courseId.trim() === '') {
			errors.courseId = 'Please select your course.';
		}
		return errors;
	}

	const [courseId, setCourseId] = useState('');
	const [personalStatement, setPersonalStatement] = useState('');
	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		const nextErrors = validate(personalStatement);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) {
			return;
		}
		setIsSubmitting(true);
		try {
			await studentApplicationsApi.submitApplication({
				studentUserId,
				courseId: Number(courseId),
				personalStatement,
			});
			setCourseId('');
			setPersonalStatement('');
			onCreated();
		} finally {
			setIsSubmitting(false);
		}
	}
	return (
		<form onSubmit={handleSubmit}>
			<Fieldset.Root size="md" maxW="md" mb="30px">
				<Stack>
					<Fieldset.Legend>Application Form</Fieldset.Legend>
					<Fieldset.HelperText>
						Apply for courses below
					</Fieldset.HelperText>
				</Stack>
				<Fieldset.Content>
					<Field.Root>
						<Field.Label>Select a course</Field.Label>
						{coursesState.status === 'success' && (
							<NativeSelect.Root width="350px">
								<NativeSelect.Field
									placeholder="Courses 2026-27"
									value={courseId}
									onChange={(event) =>
										setCourseId(event.target.value)
									}
								>
									{coursesState.data.map((course) => (
										<option
											key={course.id}
											value={course.id}
										>
											{course.title}
										</option>
									))}
								</NativeSelect.Field>
							</NativeSelect.Root>
						)}
						{errors.courseId && (
							<Field.HelperText color="red">
								{errors.courseId}
							</Field.HelperText>
						)}
					</Field.Root>
					<Field.Root>
						<Field.Label>Personal Statement</Field.Label>
						<Input
							value={personalStatement}
							placeholder="Personal Statement"
							onChange={(event) => {
								setPersonalStatement(event.target.value);
								setErrors((prev) => ({
									...prev,
									personalStatement: undefined,
								}));
							}}
						/>
						{errors.personalStatement && (
							<Field.HelperText color="red">
								{errors.personalStatement}
							</Field.HelperText>
						)}
					</Field.Root>
				</Fieldset.Content>
				<Button
					type="submit"
					mt="20px"
					alignSelf="flex-start"
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Adding…' : 'Save as draft'}
				</Button>
			</Fieldset.Root>
		</form>
	);
}

export default StudentApplicationForm;
