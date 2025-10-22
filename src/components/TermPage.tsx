import TermSelector from "./TermSelector";
import { useState, useEffect } from 'react';
import CourseSelector from "./CourseSelector";

const toggleList = <T extends {id: string}>(x: T, lst: T[]): T[] => (
  lst.some(y => y.id === x.id) ? lst.filter(y => y.id !== x.id) : [...lst, x]
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
    selectedCourses: CourseEntry[];
    setSelectedCourses: React.Dispatch<React.SetStateAction<CourseEntry[]>>;
}

const TermPage = ({courses, selectedCourses, setSelectedCourses}: TermPageProps) => {
    const [term, setTerm] = useState('Fall');
    
    useEffect(() => {
        const hasMismatch = selectedCourses.some(sc => {
            const current = courses[sc.id];
            if (!current) return true; // course removed
            return sc.term !== current.term || sc.number !== current.number || sc.meets !== current.meets || sc.title !== current.title;
        });
        if (hasMismatch) setSelectedCourses([]);
    }, [courses, selectedCourses, setSelectedCourses]);
    
    const termCourses = Object.entries(courses).map(([key, course]) => [
        key,
        course.term,
        course.number,
        course.meets,
        course.title
      ]).filter(course => term === course[1]);

    const toggleMenu = (item: CourseEntry) => {
        setSelectedCourses(menu => toggleList(item, menu));
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
                menu={selectedCourses}
                toggleMenu={toggleMenu}
            />
        </>
    );    
};

export default TermPage;