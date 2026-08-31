import type { Student } from '../types/student';

interface StudentProfileViewProps {
	student: Student;
	onUpdated: () => void;
}

function StudentProfileView({ student, onUpdated }: StudentProfileViewProps) {
	return (
		<div>
			<p>
				{student.firstName} {student.lastName}
			</p>
			<p>Email: {student.user.email}</p>
			<p>DOB: {student.dob}</p>
			<p>Phone: {student.phone}</p>
			<p>Address: {student.address}</p>
			<button onClick={onUpdated}>Update data</button>
		</div>
	);
}

export default StudentProfileView;
