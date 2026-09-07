// Add course by Tutor

import { useState } from 'react';
import { coursesApi } from '../../api/coursesApi';
import type { Course } from '../../types/course';

import { Fieldset, Stack, Field, Input, Button } from '@chakra-ui/react';

interface CourseFormProps {
	tutorUserId: number;
	existingCourse?: Course;
	onCreated: () => void;
}

function CourseForm({
	tutorUserId,
	existingCourse,
	onCreated,
}: CourseFormProps) {
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
	const [title, setTitle] = useState(existingCourse?.title ?? '');
	const [description, setDescription] = useState(
		existingCourse?.description ?? '',
	);
	const [category, setCategory] = useState(existingCourse?.category ?? '');
	const [capacity, setCapacity] = useState(
		existingCourse ? String(existingCourse.capacity) : '',
	);
	const [startDate, setStartDate] = useState(existingCourse?.startDate ?? '');
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
			const request = {
				tutorUserId,
				title,
				description,
				category,
				capacity: Number(capacity),
				startDate,
			};
			if (existingCourse) {
				await coursesApi.updateCourse(existingCourse.id, request);
			} else {
				await coursesApi.addCourse(request);
				setTitle('');
				setDescription('');
				setCategory('');
				setCapacity('');
				setStartDate('');
			}
			onCreated();
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<Fieldset.Root size="md" maxW="md">
				<Stack>
					<Fieldset.Legend>
						{existingCourse ? 'Update Course' : 'Add Course'}
					</Fieldset.Legend>
					<Fieldset.HelperText>
						{existingCourse
							? "Edit this course's details "
							: 'Add your course to the database'}
					</Fieldset.HelperText>
				</Stack>
				<Fieldset.Content>
					<Field.Root>
						<Field.Label>Course Title</Field.Label>
						<Input
							value={title}
							placeholder="Course Title"
							onChange={(event) => {
								setTitle(event.target.value);
								setErrors((prev) => ({
									...prev,
									title: undefined,
								}));
							}}
						/>
						{errors.title && (
							<Field.HelperText color="red" className="error">
								{errors.title}
							</Field.HelperText>
						)}
					</Field.Root>
					<Field.Root>
						<Field.Label>Course Description</Field.Label>
						<Input
							value={description}
							placeholder="Course Description"
							onChange={(event) => {
								setDescription(event.target.value);
								setErrors((prev) => ({
									...prev,
									description: undefined,
								}));
							}}
						/>
						{errors.description && (
							<Field.HelperText color="red" className="error">
								{errors.description}
							</Field.HelperText>
						)}
					</Field.Root>
					<Field.Root>
						<Field.Label>Category</Field.Label>
						<Input
							value={category}
							placeholder="Category"
							onChange={(event) => {
								setCategory(event.target.value);
								setErrors((prev) => ({
									...prev,
									category: undefined,
								}));
							}}
						/>
						{errors.category && (
							<Field.HelperText color="red" className="error">
								{errors.category}
							</Field.HelperText>
						)}
					</Field.Root>
					<Field.Root>
						<Field.Label>Course Capacity</Field.Label>
						<Input
							type="number"
							min={1}
							value={capacity}
							placeholder="Course Capacity"
							onChange={(event) => {
								setCapacity(event.target.value);
								setErrors((prev) => ({
									...prev,
									capacity: undefined,
								}));
							}}
						/>
						{errors.capacity && (
							<Field.HelperText color="red" className="error">
								{errors.capacity}
							</Field.HelperText>
						)}
						{existingCourse &&
							existingCourse.capacity !== Number(capacity) && (
								<Field.HelperText color="orange.500">
									This course has approved applications
									counted against its original capacity.
									Changing this number won't undo or reapply
									those approvals. It will provide a new
									total.
								</Field.HelperText>
							)}
					</Field.Root>
					<Field.Root>
						<Field.Label>Start Date</Field.Label>
						<Input
							type="date"
							value={startDate}
							placeholder="Start Date"
							onChange={(event) => {
								setStartDate(event.target.value);
								setErrors((prev) => ({
									...prev,
									startDate: undefined,
								}));
							}}
						/>
						{errors.startDate && (
							<Field.HelperText color="red" className="error">
								{errors.startDate}
							</Field.HelperText>
						)}
					</Field.Root>
				</Fieldset.Content>

				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting
						? existingCourse
							? 'Saving...'
							: 'Adding...'
						: existingCourse
							? 'Save changes'
							: 'Add Course'}
				</Button>
			</Fieldset.Root>
		</form>
	);
}

export default CourseForm;
