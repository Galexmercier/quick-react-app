import { useState } from 'react'
import Banner from "./components/Banner";
import TermPage from "./components/TermPage";
import { addScheduleTimes } from "./utilities/conflicts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditForm from './EditForm';
import { useData } from './utilities/firebase.js';

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
  const [json, isLoading, error] = useData('/');
  const [selectedCourses, setSelectedCourses] = useState<course[]>([]);

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!json) return <h1>No user data found</h1>;

  const schedule = json as courseList;
  const scheduleReformatted = addScheduleTimes(schedule);

  return (
    <div className="bg-[#282c34] min-h-screen flex flex-col text-[calc(10px_+_2vmin)] text-white p-4">
      <Banner title={scheduleReformatted.title}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TermPage courses={scheduleReformatted.courses} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses}/>} />
          <Route path="/edit" element={ <EditForm /> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;