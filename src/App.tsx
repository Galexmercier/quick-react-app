// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

const schedule = {
  title: "CS Courses for 2018-2019"
};

const App = () => {
  return (
    <div className="text-center">
      <h1 className="bg-[#282c34] min-h-screen flex flex-col items-center justify-center text-[calc(10px_+_2vmin)] text-white">
        {schedule.title}
      </h1>
    </div>
  )
}

export default App
