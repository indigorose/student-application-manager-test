import { Badge } from '@chakra-ui/react';
import type { Status } from '../types/studentApplication';

const STATUS_COLORS: Record<Status, string> = {
	DRAFT: 'gray',
	SUBMITTED: 'blue',
	UNDER_REVIEW: 'yellow',
	APPROVED: 'green',
	REJECTED: 'red',
};

interface statusBadgeProps {
	status: Status;
}

function StatusBadge({ status }: statusBadgeProps) {
	return <Badge colorPalette={STATUS_COLORS[status]}>{status}</Badge>;
}

export default StatusBadge;
