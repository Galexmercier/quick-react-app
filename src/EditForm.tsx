import { useNavigate, useLocation } from "react-router-dom";

const EditForm = () => {
  const navigate = useNavigate();
  const { state: course } = useLocation();

  return (
    <form>
      <input type="hidden" name="id" value={course.id} />
      <div className="mb-3">
        <label htmlFor="title" className="form-label block mb-2">Course Title</label>
        <input className="form-control border-2 border-gray-400 rounded-lg" id="title" defaultValue={course.title} />
      </div>
      <div className="mb-3">
        <label htmlFor="meets" className="form-label block mb-2">Meeting Time</label>
        <input className="form-control border-2 border-gray-400 rounded-lg" id="meets" defaultValue={course.meets}/>
      </div>
      <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/')}>Cancel</button>
    </form>
  )
};

export default EditForm;