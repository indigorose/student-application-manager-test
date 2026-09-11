import { useState } from 'react';
import type { User } from '../../types/user';
import { api } from '../../api/usersApi';
import { Input, Button, Stack, Fieldset, Field } from '@chakra-ui/react';
interface UpdateUserFormProps {
	user: User;
	onUpdated: () => void;
}

function UpdateUserForm({ user, onUpdated }: UpdateUserFormProps) {
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsSubmitting(true);
		try {
			await api.updateUser(user.id, {
				email,
				...(password.trim() !== '' ? { password } : {}),
			});
			setPassword('');
			onUpdated();
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<Fieldset.Root size="md" maxW="md" mb="20px">
				<Stack gap={3}>
					<Fieldset.Legend fontSize="16px">
						Reset user details
					</Fieldset.Legend>
					<Fieldset.HelperText>
						Update your email or reset your password
					</Fieldset.HelperText>
				</Stack>
				<Field.Root>
					<Field.Label>Reset Email Address</Field.Label>
					<Input
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						placeholder="Email"
					/>
				</Field.Root>
				<Field.Root>
					<Field.Label>Reset Password</Field.Label>{' '}
					<Input
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						placeholder="New Password (leave blank to keep current password)"
					/>
				</Field.Root>
				<Button
					mt="20px"
					alignSelf="flex-start"
					type="submit"
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Saving…' : 'Save Changes'}
				</Button>
			</Fieldset.Root>
		</form>
	);
}

export default UpdateUserForm;
