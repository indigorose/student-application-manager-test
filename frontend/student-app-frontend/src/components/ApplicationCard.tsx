import type { StudentApplication } from '../types/studentApplication';

interface ApplicationCardProps {
	application: StudentApplication;
}

function ApplicationCard({ application }: ApplicationCardProps) {
	return (
		<div>
			<h3>{application.course.title}</h3>
			<p>Status: {application.status}</p>
			<p>Personal Statement: {application.personalStatement}</p>
		</div>
	);
}

export default ApplicationCard;
