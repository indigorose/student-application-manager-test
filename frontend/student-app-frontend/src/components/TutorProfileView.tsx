// Display a tutor's profile
import type { Tutor } from '../types/tutor';

interface TutorProfileViewProps {
	tutor: Tutor;
	onUpdated: () => void;
}

function TutorProfileView({ tutor, onUpdated }: TutorProfileViewProps) {
	return (
		<div>
			<p>
				{tutor.firstName} {tutor.lastName}
			</p>
			<p>Email: {tutor.user.email}</p>
			<p>Department: {tutor.department}</p>

			<button onClick={onUpdated}>Update data</button>
		</div>
	);
}

export default TutorProfileView;
