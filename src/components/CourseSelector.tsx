import CourseCard from './CourseCard';
import { useState } from 'react';
import Modal from './Modal';
import { hasConflict } from '../utilities/conflicts';

interface Course {
  id: string,
  term: string,
  number: string,
  meets: string,
  title: string
}

interface CoursePlanModalProps {
  menu: Course[];
  isOpen: boolean;
  onClose: () => void;
}

const CoursePlanModal = ({ menu, isOpen, onClose}: CoursePlanModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="align-left mb-6 text-gray-500">
        <h1 className="text-2xl mb-3">Your Courses</h1>
        <ul className="h-24 overflow-auto border border-gray-400 p-4 padding-10px text-base">
          {
            menu.length === 0 ? <li>No courses selected. Please click the checkbox next to the course you want to add to your plan.</li> :
            menu.map(course => <li key={`menu-${course.id}`}>{course.term} CS {course.number}: {course.title} ({course.meets})</li>)
          }
        </ul>
      </div>
  </Modal>
);

interface CourseSelectorProps {
  courses: Course[],
  menu: Course[],
  toggleMenu: (item: Course) => void
}

const CreateCourseCard = (course: Course, selected: Course[], setSelected: (item: Course) => void) => {
  const isSelected = selected.includes(course);
  const isDisabled = !isSelected && hasConflict(course, selected);
  let styles = "absolute bottom-5 right-5 z-10 border-2 border-white rounded-sm checked:bg-blue-500 checked:border-blue-500";

  if (isDisabled) {
    styles += " opacity-25"
  }

  return (
    <div key={course.id} className="relative">
      <CourseCard term={course.term} number={course.number} meets={course.meets} title={course.title}/>
      <input type="checkbox" 
        checked={selected.some(m => m.id === course.id)}
        onChange={isDisabled ? undefined : () => setSelected(course)}
        className={styles}/>
    </div>
  )
};

const CourseSelector = ({courses, menu, toggleMenu}: CourseSelectorProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mb-4">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setModalOpen(true)}
        >
          Course Plan
        </button>
      </div>
      <div className={`grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-5 px-4 ${modalOpen ? 'pointer-events-none opacity-50' : ''}`}>
        { 
          courses.map(course => CreateCourseCard(course, menu, toggleMenu))
        }
      </div>
      <CoursePlanModal menu={menu} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
};

export default CourseSelector;