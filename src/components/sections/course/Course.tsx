'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import axios from 'axios';
import SingleCourse from './SingleCourse'
import { CourseItemData, ISingleCourseProps } from './types'
import SkeletonLoader from './SkeletonLoader'

/**
 * Represents the properties of a courses component.
 * @interface CoursesProps
 * @property {CoursesItemData} content - The data of the courses item.
 */
interface CourseProps {
	content: {
		content: CourseItemData;
	}
}
/**
 * A functional component that renders a courses section with multiple courses articles.
 * @param {CoursesProps} content - The props containing the courses content to display.
 * @returns The rendered courses section component.
 */


const Course: React.FC<CourseProps> = ({ content }) => {
	const searchParams = useSearchParams();
	const coID = searchParams.get('coID') ?? '';
	const [course, setCourse] = useState<ISingleCourseProps | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const getCourse = async () => {

		const url = content?.content.data.attributes.url.replace('objId', coID);
		const res = await axios.get(url);
		setIsLoading(false);
		if (res.data) {
			setCourse(res.data.data)
		} else {
			return;
		}
	}

	useEffect(() => {
		getCourse()
	}, [coID])

	return (
		<>
			{isLoading ? (
				<SkeletonLoader/>
			) : (
				course !== null ? <SingleCourse {...course} /> : null
			)}
		</>
	)
}

export default Course;