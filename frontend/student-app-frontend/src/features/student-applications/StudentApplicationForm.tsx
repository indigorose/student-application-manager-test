// Student application form
import { useState } from 'react';
import { studentApplicationsApi } from '../../api/studentApplicationApi';
import useApi from '@/hooks/useApi';
import { coursesApi } from '@/api/coursesApi';
import { NativeSelect } from '@chakra-ui/react';

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
			{coursesState.status === 'success' && (
				<NativeSelect.Root width="350px">
					<NativeSelect.Field
						placeholder="Select a course"
						value={courseId}
						onChange={(event) => setCourseId(event.target.value)}
					>
						{coursesState.data.map((course) => (
							<option key={course.id} value={course.id}>
								{course.title}
							</option>
						))}
					</NativeSelect.Field>
				</NativeSelect.Root>
			)}
			{errors.courseId && <p className="error">{errors.courseId}</p>}

			<input
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
				<p className="error">{errors.personalStatement}</p>
			)}
			<button type="submit" disabled={isSubmitting}>
				{isSubmitting ? 'Adding…' : 'Save as draft'}
			</button>
		</form>
	);
}

export default StudentApplicationForm;
