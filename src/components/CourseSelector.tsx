import CourseCard from './CourseCard';

interface Course {
  id: string,
  term: string,
  number: string,
  meets: string,
  title: string
}

interface CourseSelectorProps {
  courses: Course[],
  menu: Course[],
  toggleMenu: (item: Course) => void
}

const CourseSelector = ({courses, menu, toggleMenu}: CourseSelectorProps) => {

  return (
    <div className="container mx-auto px-4">
      <div className="align-left mb-6">
        <h1 className="text-2xl mb-3">Your Courses</h1>
        <ul className="h-24 overflow-auto border border-gray-400 p-4 padding-10px">
          {
            menu.map(course => <li key={`menu-${course.id}`}>{course.title}</li>)
          }
        </ul>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-5 px-4">
        { 
          courses.map(course => (
            <div key={course.id} className="relative">
              <CourseCard term={course.term} number={course.number} meets={course.meets} title={course.title}/>
              <input type="checkbox" 
                checked={menu.some(m => m.id === course.id)}
                onChange={() => toggleMenu(course)}
                className="absolute bottom-5 right-5 z-10 border-2 border-white rounded-sm checked:bg-blue-500 checked:border-blue-500" />
            </div>
          ))
        }
      </div>
    </div>
  )
};

export default CourseSelector;