import TermSelector from "./TermSelector";
import { useState } from 'react';
import CourseSelector from "./CourseSelector";

const toggleList = <T,>(x: T, lst: T[]): T[] => (
  lst.includes(x) ? lst.filter(y => y !== x) : [...lst, x]
);


type CourseEntry = {
    id: string,
    term: string,
    number: string,
    meets: string,
    title: string
};

interface TermPageProps {
    courses: Record<string, CourseEntry>;
}

const TermPage = ({courses}: TermPageProps) => {
    const [term, setTerm] = useState('Fall');
    const [menu, setMenu] = useState<CourseEntry[]>([]);
    
    
    const termCourses = Object.entries(courses).map(([key, course]) => [
        key,
        course.term,
        course.number,
        course.meets,
        course.title
      ]).filter(course => term === course[1]);

    const toggleMenu = (item: CourseEntry) => {
        setMenu(menu => toggleList(item, menu));
    };

    return (
        <>
            <TermSelector term={term} setTerm={setTerm}/>
            <CourseSelector 
                courses={termCourses.map(([id, term, number, meets, title]) => ({
                    id,
                    term,
                    number,
                    meets,
                    title
                }))}
                menu={menu}
                toggleMenu={toggleMenu}
            />
        </>
    );    
};

export default TermPage;