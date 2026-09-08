import { Box, Flex, Heading, Text } from '@chakra-ui/react';
type Role = 'STUDENT' | 'TUTOR' | 'ADMIN';

interface HeaderProps {
	activeRole?: Role | null;
}

function Header({ activeRole }: HeaderProps) {
	return (
		<Box as="header" borderBottomWidth={1} px={6} py={4} mb={6}>
			<Flex justify="space-between" align="center">
				<Heading size="lg">Student Application Manager</Heading>
				{activeRole && (
					<Text fontSize="sm" color="gray.500">
						Viewing as:{' '}
						<Text as="span" fontWeight="bold">
							{activeRole}
						</Text>
					</Text>
				)}
			</Flex>
		</Box>
	);
}

export default Header;
