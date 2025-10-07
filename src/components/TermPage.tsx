import CourseCard from "./CourseCard";
import TermSelector from "./TermSelector";
import { useState } from 'react';


type CourseEntry = {
    term: string,
    number: string,
    meets: string
    title: string
};

interface TermPageProps {
    courses: Record<string, CourseEntry>;
}

const getCourseTerm = ({term}: CourseEntry) => {
    return term;
};

const TermPage = ({courses}: TermPageProps) => {
    const [term, setTerm] = useState('Fall');
    const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));

    return (
        <>
            <TermSelector term={term} setTerm={setTerm}/>
            <ul className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-5 px-4">
                {
                    Object.entries(termCourses).map(([id, courseInfo]) => (
                        <li key={id}>
                            <CourseCard 
                            term={courseInfo.term} 
                            number={courseInfo.number} 
                            meets={courseInfo.meets} 
                            title={courseInfo.title}/>
                        </li>
                    ))
                }
            </ul>
        </>
    );    
};

export default TermPage;