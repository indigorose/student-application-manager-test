interface CardProps {
	email: string;
	role: string;
}

function Card({ email, role }: CardProps) {
	return (
		<div>
			<p>Role: {role}</p>
			<p>Email: {email}</p>
		</div>
	);
}

export default Card;
