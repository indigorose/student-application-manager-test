// Student application form
import { useState } from 'react';
import { api } from '../../api/studentApplicationApi';

interface StudentApplicationFormProps {
	studentUserId: number;
	onSubmitted: () => void;
}

function StudentApplicationForm({
	studentUserId,
	onSubmitted,
}: StudentApplicationFormProps) {
	interface FormErrors {
		personalStatement?: string;
	}

	function validate(personalStatement: string): FormErrors {
		const errors: FormErrors = {};
		if (personalStatement.trim() === '') {
			errors.personalStatement = 'Please add a personal statement.';
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
			await api.submitApplication({
				studentUserId,
				courseId: Number(courseId),
				personalStatement,
			});
			setCourseId('');
			setPersonalStatement('');
			onSubmitted();
		} finally {
			setIsSubmitting(false);
		}
	}
	return (
		<form onSubmit={handleSubmit}>
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
				{isSubmitting ? 'Adding…' : 'Submit Application'}
			</button>
		</form>
	);
}

export default StudentApplicationForm;
