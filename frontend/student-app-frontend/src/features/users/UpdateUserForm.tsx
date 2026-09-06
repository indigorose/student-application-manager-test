import { useState } from 'react';
import type { User } from '../../types/user';
import { api } from '../../api/usersApi';
import { Input, Button, Stack } from '@chakra-ui/react';
interface UpdateUserFormProps {
	user: User;
	onUpdated: () => void;
}

function UpdateUserForm({ user, onUpdated }: UpdateUserFormProps) {
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
			<Stack gap={3}>
				<Input
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					placeholder="Email"
				/>
				<Input
					type="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					placeholder="New Password (leave blank to keep current password)"
				/>
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Saving…' : 'Save Changes'}
				</Button>
			</Stack>
		</form>
	);
}

export default UpdateUserForm;
