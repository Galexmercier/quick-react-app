import CourseCard from "./CourseCard";

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
    <ul className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-5 px-4">
    {
        Object.entries(courses).map(([id, courseInfo]) => (
            <li key={id}>
                <CourseCard term={courseInfo.term} number={courseInfo.number} meets={courseInfo.meets} title={courseInfo.title}/>
            </li>
        ))
    }
    </ul>
);

export default CourseList;