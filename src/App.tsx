import { useState } from 'react'
import { useJsonQuery } from './utilities/fetch';
import Banner from "./components/Banner";
import TermPage from "./components/TermPage";

// A reasonable place for the course plan button on the same line as the term selector but on the right side of the screen.

interface course {
  id: string,
  term: string,
  number: string,
  meets: string,
  title: string
}

interface courseList {
  title: String,
  courses: Record<string, course>
}

const App = () => {
  const [json, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  const [selectedCourses, setSelectedCourses] = useState<course[]>([]);

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!json) return <h1>No user data found</h1>;

  const schedule = json as courseList;

  return (
    <div className="bg-[#282c34] min-h-screen flex flex-col text-[calc(10px_+_2vmin)] text-white p-4">
      <Banner title={schedule.title}/>
      <TermPage courses={schedule.courses} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses}/>
    </div>
  )
};

export default App;