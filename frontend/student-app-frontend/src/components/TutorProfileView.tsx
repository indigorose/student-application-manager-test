// Display a tutor's profile
import type { Tutor } from '../types/tutor';
import { IconButton, Card } from '@chakra-ui/react';
import { RefreshCw } from 'lucide-react';

interface TutorProfileViewProps {
	tutor: Tutor;
	onUpdated: () => void;
}

function TutorProfileView({ tutor, onUpdated }: TutorProfileViewProps) {
	return (
		<div>
			<Card.Root>
				<Card.Body>
					{' '}
					<Card.Title>
						{tutor.firstName} {tutor.lastName}
					</Card.Title>
					<p>Email: {tutor.user.email}</p>
					<p>Department: {tutor.department}</p>
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

export default TutorProfileView;
