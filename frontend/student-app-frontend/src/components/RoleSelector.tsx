import { Button, VStack, Heading } from '@chakra-ui/react';

export type Role = 'STUDENT' | 'TUTOR' | 'ADMIN';

interface RoleSelectorProps {
	onSelect: (role: Role) => void;
}

function RoleSelector({ onSelect }: RoleSelectorProps) {
	return (
		<VStack gap={5}>
			<Heading size="md">Choose a role to view the app as</Heading>
			<Button onClick={() => onSelect('STUDENT')}>Student</Button>
			<Button onClick={() => onSelect('TUTOR')}>Tutor</Button>
			<Button onClick={() => onSelect('ADMIN')}>Admin</Button>
		</VStack>
	);
}

export default RoleSelector;
