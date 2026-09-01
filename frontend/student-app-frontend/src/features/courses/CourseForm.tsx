// Add course by Tutor

import { useState } from 'react';
import { api } from '../../api/coursesApi';

interface CourseFormProps {
	tutorUserId: number;
	onCreated: () => void;
}

function CourseForm({ tutorUserId, onCreated }: CourseFormProps) {
	interface FormErrors {
		title?: string;
		description?: string;
		category?: string;
		capacity?: string;
		startDate?: string;
	}

	function validate(
		title: string,
		description: string,
		category: string,
		capacity: string,
		startDate: string,
	): FormErrors {
		const errors: FormErrors = {};
		if (title.trim() === '') {
			errors.title = 'Please provide a course title';
		}
		if (description.trim() === '') {
			errors.description = 'Please provide a description';
		}
		if (category.trim() === '') {
			errors.category = 'Please provide a category';
		}
		if (startDate.trim() === '') {
			errors.startDate = 'Please provide a start date.';
		}
		if (capacity.trim() === '') {
			errors.capacity = 'Please provide a class size between 1 and 30';
		} else if (!/^\d+$/.test(capacity.trim())) {
			errors.capacity = 'Please provide a whole number';
		} else if (Number(capacity) < 1) {
			errors.capacity = 'Please provide a capacity greater than 1.';
		} else if (Number(capacity) > 250) {
			errors.capacity =
				'Capacity exceeded, please provide a capacity less than 250.';
		}

		return errors;
	}
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [capacity, setCapacity] = useState('');
	const [startDate, setStartDate] = useState('');
	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		const nextErrors = validate(
			title,
			description,
			category,
			capacity,
			startDate,
		);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) {
			return;
		}
		setIsSubmitting(true);
		try {
			await api.addCourse({
				tutorUserId,
				title,
				description,
				category,
				capacity: Number(capacity),
				startDate,
			});
			setTitle('');
			setDescription('');
			setCategory('');
			setCapacity('');
			setStartDate('');
			onCreated();
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				value={title}
				placeholder="First Name"
				onChange={(event) => {
					setTitle(event.target.value);
					setErrors((prev) => ({
						...prev,
						title: undefined,
					}));
				}}
			/>
			{errors.title && <p className="error">{errors.title}</p>}
			<input
				value={description}
				placeholder="Course Description"
				onChange={(event) => {
					setTitle(event.target.value);
					setErrors((prev) => ({
						...prev,
						description: undefined,
					}));
				}}
			/>
			{errors.description && (
				<p className="error">{errors.description}</p>
			)}
			<input
				value={category}
				placeholder="Category"
				onChange={(event) => {
					setTitle(event.target.value);
					setErrors((prev) => ({
						...prev,
						category: undefined,
					}));
				}}
			/>
			{errors.category && <p className="error">{errors.category}</p>}
			<input
				type="number"
				min={1}
				value={capacity}
				placeholder="Course Capacity"
				onChange={(event) => {
					setTitle(event.target.value);
					setErrors((prev) => ({
						...prev,
						capacity: undefined,
					}));
				}}
			/>
			{errors.capacity && <p className="error">{errors.capacity}</p>}
			<input
				type="date"
				value={startDate}
				placeholder="Start Date"
				onChange={(event) => {
					setTitle(event.target.value);
					setErrors((prev) => ({
						...prev,
						startDate: undefined,
					}));
				}}
			/>
			{errors.startDate && <p className="error">{errors.startDate}</p>}
			<button type="submit" disabled={isSubmitting}>
				{isSubmitting ? 'Adding…' : 'Add course'}
			</button>
		</form>
	);
}

export default CourseForm;
