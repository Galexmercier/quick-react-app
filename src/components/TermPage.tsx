import TermSelector from "./TermSelector";
import { useState } from 'react';
import CourseSelector from "./CourseSelector";


type CourseEntry = {
    term: string,
    number: string,
    meets: string
    title: string
};

interface TermPageProps {
    courses: Record<string, CourseEntry>;
}

const TermPage = ({courses}: TermPageProps) => {
    const [term, setTerm] = useState('Fall');
    const termCourses = Object.entries(courses).map(([key, course]) => [
        key,
        course.term,
        course.number,
        course.meets,
        course.title
      ]).filter(course => term === course[1]);
    
    return (
        <>
            <TermSelector term={term} setTerm={setTerm}/>
            <CourseSelector courses={termCourses.map(([id, term, number, meets, title]) => ({
                id,
                term,
                number,
                meets,
                title
            }))}/>
        </>
    );    
};

export default TermPage;