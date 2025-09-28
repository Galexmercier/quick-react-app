type CourseEntry = {
    term: string,
    number: string,
    meets: string
    title: string
};

interface CourseListProps {
    courses: Record<string, CourseEntry>;
}

const CourseList = ({courses}: CourseListProps) => (
    <ul>
    {
        Object.entries(courses).map(([id, courseInfo]) => (
            <li key={id}>{courseInfo.term} CS {courseInfo.number}: {courseInfo.title}</li>
        ))
    }
    </ul>
);

export default CourseList;