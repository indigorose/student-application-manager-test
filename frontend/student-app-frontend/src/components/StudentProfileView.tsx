import type { Student } from '../types/student';
import { IconButton, Card } from '@chakra-ui/react';
import { RefreshCw } from 'lucide-react';

interface StudentProfileViewProps {
	student: Student;
	onUpdated: () => void;
}

function StudentProfileView({ student, onUpdated }: StudentProfileViewProps) {
	return (
		<div>
			<Card.Root>
				<Card.Body>
					<Card.Title>
						{student.firstName} {student.lastName}
					</Card.Title>
					<p>Email: {student.user.email}</p>
					<p>DOB: {student.dob}</p>
					<p>Phone: {student.phone}</p>
					<p>Address: {student.address}</p>
				</Card.Body>
				<Card.Footer justifyContent="flex-end">
					<IconButton size="xs" onClick={onUpdated}>
						<RefreshCw />
					</IconButton>
				</Card.Footer>
			</Card.Root>
		</div>
	);
}

export default StudentProfileView;
