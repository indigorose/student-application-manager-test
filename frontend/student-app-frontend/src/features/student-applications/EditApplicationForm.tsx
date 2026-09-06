import { studentApplicationsApi } from '@/api/studentApplicationApi';
import type { StudentApplication } from '@/types/studentApplication';
import { Input, Button } from '@chakra-ui/react';
import { useState } from 'react';

interface EditApplicationFormProps {
	application: StudentApplication;
	onUpdated: () => void;
}

function EditApplicationForm({
	application,
	onUpdated,
}: EditApplicationFormProps) {
	const [personalStatement, setPersonalStatement] = useState(
		application.personalStatement,
	);
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsSubmitting(true);
		try {
			await studentApplicationsApi.updateApplication(application.id, {
				studentUserId: application.student.user.id,
				courseId: application.course.id,
				personalStatement,
			});
			onUpdated();
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<Input
				value={personalStatement}
				onChange={(event) => setPersonalStatement(event.target.value)}
				placeholder="Personal Statement"
			/>
			<Button type="submit" disabled={isSubmitting}>
				{isSubmitting ? 'Saving' : 'Save Changes'}
			</Button>
		</form>
	);
}

export default EditApplicationForm;
